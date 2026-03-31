/**
 * A dynamic block for the Gutenberg editor. The edit.js file is used to
 * define the editor interface of the block. The rendering of the
 * frontend component happens in PHP.
 */

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * The block metadata.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/
 */
import metadata from './block.json';

/**
 * The block edit function.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */
import edit from './edit';
import save from './save';

const settings = {
	edit,
	save
};

/**
 * Actually register the block.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/
 */
registerBlockType(metadata, settings);