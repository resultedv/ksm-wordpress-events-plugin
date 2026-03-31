import { useEffect, useState } from "react";

export const useRest = ( url, options ) => {
	const requestKey = JSON.stringify( { url, options } );

	const [ data, setData ] = useState( null );

	useEffect( () => {
		const controller = new AbortController();

		( async () => {
			try {
				setData( null );

				const response = await fetch( url, {
					signal : controller.signal,
					... options
				} );

				if( !response.ok ) {
					throw new Error( response.statusText );
				}

				const result = await response.json();

				setData( {
					headers : response.headers,
					body : result
				} );
			} catch( e ) {
				if( e.name === 'AbortError' ) {
					console.log( 'Fetch Aborted' );
				} else {
					console.error( e );
					setData( e );
				}
			}
		} )();

		return () => controller.abort();
	}, [ requestKey ] );
	return data;
};