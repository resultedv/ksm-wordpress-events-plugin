import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { appId, ...componentProps } = attributes;

	return (
		<section
			{ ...useBlockProps.save( {
				className : 'web-react--app',
				... ( appId ? { 'data-app-id' : appId } : {} ),
				'data-init-props' : JSON.stringify( componentProps )
			} ) }
		/>
	);
}