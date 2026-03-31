/**
 * WordPress dependencies.
 */
import { InspectorControls, InspectorAdvancedControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, Card, CardBody, Icon, Flex, FlexItem, CardHeader } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { appId, postsPerPage } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<TextControl
						type="number"
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Posts per page'
						) }
						value={ postsPerPage ? Math.max( -1, postsPerPage ) : 10 }
						onChange={ ( value ) => setAttributes( { postsPerPage: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorAdvancedControls>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __(
						'App-ID'
					) }
					value={ appId || '' }
					onChange={ ( value ) => setAttributes( { appId: value } )
					}
				/>
			</InspectorAdvancedControls>
			<div {... useBlockProps()}>
				<Card>
					<CardHeader>
						<Flex align="center" justify="center" wrap={true} gap="1em">
							<FlexItem>
								<Icon icon="tickets-alt" />
							</FlexItem>
							<FlexItem>
								<p style={{
									marginBottom: 0,
								}}>Events</p>
							</FlexItem>
						</Flex>
					</CardHeader>
					<CardBody>
						{appId && ( <TextControl
							__next40pxDefaultSize
							label={ __(
								'App-ID'
							) }
							value={ appId || '' }
							onChange={ ( value ) => setAttributes( { appId: value } )
							}
						/> )}
						<TextControl
							type="number"
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={ __(
								'Posts per page'
							) }
							value={ postsPerPage ? Math.max( -1, postsPerPage ) : 10 }
							onChange={ ( value ) => setAttributes( { postsPerPage: Math.max( -1, value ) } )
							}
						/>
					</CardBody>
				</Card>
			</div>
		</>
	);
}