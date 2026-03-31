import { useEffect, useState } from "react";

const parseQuery = prefix => {
	const queryParams = {};
	const otherParams = {};
	new URLSearchParams( window.location.search ).forEach( (v, k) => {
		if ( k.startsWith( prefix ) ) {
			queryParams[k.replace(prefix,'')] = v.includes(',') ? v.split(',') : v;
		} else {
			otherParams[k] = v;
		}
	} );
	return { queryParams, otherParams };
}

const getQueryParams = prefix => {
	return parseQuery( prefix ).queryParams;
}

const setQueryParams = ( prefix, params ) => {
	const newParams = { ...parseQuery( prefix ).otherParams };
	Object.keys( params ).sort().forEach( k => {
		newParams[`${prefix}${k}`] = Array.isArray( params[k] ) ? params[k].join(',') : params[k];
	} );

	window.history.pushState( {}, '', '?' + new URLSearchParams( newParams ).toString() );
}

export const useQuery = ( prefix, defaults ) => {
	const [params, setParams] = useState(() => getQueryParams( prefix ));
	const [paramsChanged, setParamsChanged] = useState(false);

	const getParam = ( p, multiple = false ) => {
		let value = p in params ? params[p] : p in defaults ? defaults[p] : null;
		if ( multiple && ! Array.isArray( value ) ) {
			value = value ? value.split(',') : [];
		}
		return value;
	}

	const setParam = ( p, v ) => {
		let newParams = {...params};

		const isEmptyOrDefault =
			! v ||
			Array.isArray( v ) && v.length === 0 ||
			typeof v === 'object' && Object.keys( v ).length === 0 ||
			p in defaults && v === defaults[p];

		if ( p in params ) {
			if ( v === params[p] ) return;

			if ( isEmptyOrDefault ) {
				delete newParams[p];
			} else {
				newParams[p] = v;
			}
		} else {
			if ( isEmptyOrDefault ) return;
			newParams[p] = v;
		}

		if ( p !== 'page' ) {
			delete newParams['page'];
		}

		paramsChanged || setParamsChanged(true);
		setParams(newParams);
		setQueryParams( prefix, newParams );
	}

	useEffect(() => {
		const handler = () => setParams(getQueryParams( prefix ));
		window.addEventListener('popstate', handler);
		return () => window.removeEventListener('popstate', handler);
	}, []);

	return [ getParam, setParam, { ...defaults, ...params }, paramsChanged ];
}