/**
 * WordPress dependencies.
 */
import { InspectorControls, InspectorAdvancedControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, Card, CardBody, Icon, Flex, FlexItem, CardHeader } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { appId, metaKey, label } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Label'
						) }
						value={ label || '' }
						onChange={ ( value ) => setAttributes( { label: value } )
						}
					/>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Meta-Key'
						) }
						value={ metaKey || '' }
						onChange={ ( value ) => setAttributes( { metaKey: value } )
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
								<Icon icon="filter" />
							</FlexItem>
							<FlexItem>
								<p style={{
									marginBottom: 0,
								}}>Filter</p>
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
							__next40pxDefaultSize
							label={ __(
								'Label'
							) }
							value={ label || '' }
							onChange={ ( value ) => setAttributes( { label: value } )
							}
						/>
						<TextControl
							__next40pxDefaultSize
							label={ __(
								'Meta-Key'
							) }
							value={ metaKey || '' }
							onChange={ ( value ) => setAttributes( { metaKey: value } )
							}
						/>
					</CardBody>
				</Card>
			</div>
		</>
	);
}