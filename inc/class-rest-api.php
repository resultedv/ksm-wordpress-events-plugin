<?php

namespace WEB\ReactFrontendFilter;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

Rest_Api::init();

/**
 * REST API functionality.
 */
class Rest_Api {
	const KEY = 'ksm';
	const POST_TYPE = 'event';
	const META_FIELDS = array(
		'target_group',
		'type',
		'organiser',
	);

	/**
	 * Initialize the class.
	 */
	public static function init(): void {
		if ( did_action( Plugin::hook_name( 'init' ) ) ) {
			return;
		}

		add_action( 'rest_api_init', array( __CLASS__, 'rest_api_init' ) );
		add_filter( 'rest_event_query', array( __CLASS__, 'filter_rest_response' ), 10, 2 );
		add_filter( 'query_vars', array( __CLASS__, 'register_public_query_vars' ) );
	}

	/**
	 * Initialize the REST API functionality.
	 */
	public static function rest_api_init(): void {
		register_rest_route( static::KEY . '/v1', '/meta/(?P<meta_key>\w+)', array(
			'methods' => 'GET',
			'callback' => array( __CLASS__, 'meta_route' ),
			'args' => array(
				'meta_key' => array(
					'validate_callback' => function( $param ) {
						return is_string( $param ) && in_array( $param, static::META_FIELDS );
					},
				),
			),
		) );

		register_rest_field( static::POST_TYPE, static::KEY, array(
			'get_callback' => array( __CLASS__, 'get_custom_rest_field' ),
		) );
	}

	/**
	 * Register query vars.
	 *
	 * @param array $vars Query vars.
	 * @return array
	 */
	public static function register_public_query_vars( array $vars ): array {
		foreach ( static::META_FIELDS as $field ) {
			$vars[] = 'meta_' . $field;
		}
		$vars[] = 'date_from';
		return $vars;
	}

	/**
	 * Filter the REST response.
	 *
	 * @param array            $args
	 * @param \WP_REST_Request $request
	 *
	 * @return array
	 */
	public static function filter_rest_response( array $args, \WP_REST_Request $request ): array {
		$meta_query = ( $args[ 'meta_query' ] ?? false ) ?: array();

		$meta_query['date_from'] = array(
			'key' => 'date_start',
			'value' => date( 'Y-m-d H:i:s', strtotime( ! empty( $request->get_param( 'date_from' ) )
				? $request->get_param( 'date_from' )
				: 'today'
			) ),
			'compare' => '>=',
			'type' => 'DATETIME',
		);

		foreach ( static::META_FIELDS as $field ) {
			$value = $request->get_param( $field );
			if ( ! empty( $value ) ) {
				$meta_query[] = array(
					'key' => $field,
					'compare' => 'IN',
					'value' => explode( ',', $value ),
				);
			}
		}

		$args['meta_query'] = $meta_query;
		$args['orderby'] = 'date_start';
		$args['order'] = 'ASC';

		return $args;
	}

	/**
	 * Get meta route.
	 *
	 * @param \WP_REST_Request $request Request.
	 * @return array
	 */
	public static function meta_route( \WP_REST_Request $request ): array {
		$meta_key = $request->get_param( 'meta_key' );
		$meta_values = get_posts( array(
			'post_type' => 'event',
			'posts_per_page' => -1,
			'fields' => 'ids',
			'meta_key' => $meta_key,
			'meta_compare' => 'EXISTS',
		) );

		$meta_values = array_unique( array_map( function( $post_id ) use ( $meta_key ) {
			return get_post_meta( $post_id, $meta_key, true );
		}, $meta_values ) );

		sort( $meta_values );

		return array_filter( $meta_values );
	}

	/**
	 * Get custom REST field.
	 *
	 * @param array $object Post object.
	 * @return array|null
	 */
	public static function get_custom_rest_field( array $object ): ?array {
		return apply_filters( Plugin::hook_name( 'get_custom_rest_field' ), null, $object );
	}
}