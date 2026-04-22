<?php
/**
 * Plugin Name: WEB React Frontend Filter
 * Version: 1.0
 */

namespace WEB\ReactFrontendFilter;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

Plugin::init();
/**
 * Plugin functionality.
 */
class Plugin {
	const VERSION = '1.0';
	const __FILE__ = __FILE__;
	const __DIR__ = __DIR__;
	const HOOK_NAMESPACE = 'web/react_frontend_filter/';

	/**
	 * Add Hook namespace to hook name.
	 */
	public static function hook_name( string $name ): string {
		return static::HOOK_NAMESPACE . $name;
	}

	/**
	 * Initialize the plugin.
	 * @return void
	 */
	public static function init(): void {
		if ( did_action( static::hook_name( 'init' ) ) ) {
			return;
		}

		add_filter( 'block_categories_all', static::register_block_category(...) );
		add_action( 'init', static::register_blocks(...) );
		add_action( 'wp_enqueue_scripts', static::wp_enqueue_scripts(...) );
		add_action( 'enqueue_block_editor_assets', static::enqueue_block_editor_assets(...) );

		include_once __DIR__ . '/inc/class-rest-api.php';

		do_action( static::hook_name( 'init' ) );
	}

	/**
	 * Register block category.
	 * @param array $categories
	 * @return array
	 */
	public static function register_block_category( array $categories ): array {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'web-react-frontend-filter',
					'title' => __( 'WEB React Frontend Filter', 'web-react-frontend-filter' ),
				),
			)
		);
	}

	/**
	 * Register blocks.
	 * @return void
	 */
	public static function register_blocks(): void {
		$block_dir = static::__DIR__ . '/dist/blocks';

		register_block_type( "{$block_dir}/events" );
		register_block_type( "{$block_dir}/filter" );
		register_block_type( "{$block_dir}/calendar" );
	}

	/**
	 * Enqueue scripts.
	 * @return void
	 */

	public static function wp_enqueue_scripts(): void {
		if ( ! (
			has_block( 'web-event-filter/events' ) ||
			has_block( 'web-event-filter/filter' ) ||
			has_block( 'web-event-filter/calendar' )
		) ) {
			return;
		}
		wp_enqueue_script(
			'web-react-frontend-filter--init-react',
			plugins_url( 'dist/js/init-react.js', __FILE__ ),
			array(),
			static::VERSION,
			true
		);

		wp_localize_script( 'web-react-frontend-filter--init-react', 'webReactFrontendFilter', array(
			'restUrl' => get_rest_url(),
		) );
	}

	/**
	 * Enqueue block editor assets.
	 * @return void
	 */
	public static function enqueue_block_editor_assets(): void {
		$assets = wp_json_file_decode(
			plugin_dir_path( __FILE__ ) . '/admin/dist/assets.json',
			array( 'associative' => true )
		);

		$block_assets = $assets['js/register-blocks.min.js'] ?? array();

		wp_enqueue_script(
			'web-react-frontend-filter--register-blocks',
			plugins_url( 'admin/dist/js/register-blocks.min.js', __FILE__ ),
			array_merge( array(), $block_assets['dependencies'] ?? array() ),
			static::VERSION,
			true
		);
	}
}
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'webwprpp-style',
        plugin_dir_url(__FILE__) . 'style.css',
        [],
        '1.0'
    );
});