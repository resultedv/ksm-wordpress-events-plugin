/**
 * WordPress dependencies.
 */
import { InspectorControls, InspectorAdvancedControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Card, CardBody, Icon, Flex, FlexItem, CardHeader } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { appId, showDaysOutsideCurrentMonth } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings')}>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Show days outside current month'
						) }
						checked={ showDaysOutsideCurrentMonth }
						onChange={ () => setAttributes( { showDaysOutsideCurrentMonth: ! showDaysOutsideCurrentMonth } )
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
			<div {...useBlockProps()}>
				<Card>
					<CardHeader>
						<Flex align="center" justify="center" wrap={true} gap="1em">
							<FlexItem>
								<Icon icon="calendar-alt" />
							</FlexItem>
							<FlexItem>
								<p style={{
									marginBottom: 0,
								}}>Calendar</p>
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
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __(
								'Show days outside current month'
							) }
							checked={ showDaysOutsideCurrentMonth }
							onChange={ () => setAttributes( { showDaysOutsideCurrentMonth: ! showDaysOutsideCurrentMonth } )
							}
						/>
					</CardBody>
				</Card>
			</div>
		</>
	);
}