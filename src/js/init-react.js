/**
 * External dependencies.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Internal dependencies.
 */
import App from './components/App';

const { restUrl } = window?.webReactFrontendFilter || {};

console.log( 'Initialize React Frontend', restUrl );

document.addEventListener( 'DOMContentLoaded', function () {
	const appNodes = document.querySelectorAll( '.web-react--app' );
	appNodes.forEach( appNode => {
		const root = createRoot( appNode ),
			  appId = appNode.dataset?.appId,
			  portals = appId
				  ? document.querySelectorAll( `.web-react--portal[data-app-id="${appId}"]` )
				  : document.querySelectorAll( '.web-react--portal:not([data-app-id]), .web-react--portal[data-app-id=""]' ),
			  props = { appNode, restUrl, portals: [...portals] };

		root.render( <App {...props} /> );
	} );
} );