import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { appId, ...componentProps } = attributes;

	return (
		<div
			{ ...useBlockProps.save( {
				className : 'web-react--portal',
				... ( appId ? { 'data-app-id' : appId } : {} ),
				'data-component-name' : 'checkbox-filter',
				'data-init-props' : JSON.stringify( componentProps )
			} ) }
		/>
	);
}