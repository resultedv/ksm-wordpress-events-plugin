import { createPortal } from "react-dom";

import AppContext from "./AppContext";

import CheckboxFilter from "./CheckboxFilter";
import CalendarFilter from "./CalendarFilter";
import Events from "./Events";
import Pagination from "@mui/material/Pagination";

import { useQuery } from "../hooks/useQuery";
import { useRest } from "../hooks/useRest";
import { createTheme, ThemeProvider } from "@mui/material";

function getNodeComponentData( node ) {
	return {
		componentName: node.dataset?.componentName,
		initProps: JSON.parse( node.dataset?.initProps || '{}' )
	};
}

export default function App( { appNode, restUrl, portals } ) {
	console.log( 'render App' );
	const { initProps } = getNodeComponentData( appNode );

	const [ getFilter, setFilter, filter, paramsChanged ] = useQuery( 'filter-', {
		page: 1,
		date_from: new Date().toISOString().split('T')[0]
	} );

	const pageLang = document.documentElement.lang.split( '-' )[0];

	const postsPerPage = initProps.postsPerPage || 10;

	const query = {
		per_page: postsPerPage,
		page: getFilter('page'),
		date_from: getFilter('date_from'),
		target_group: getFilter('meta_target_group'),
		type: getFilter('meta_type'),
		organiser: getFilter('meta_organiser')
	};
	Object.keys(query).forEach(key => {
		if (!query[key]) {
			delete query[key];
		}
	});
	console.log('BEFORE useRest');
	const eventData = useRest( restUrl + 'wp/v2/events?' + new URLSearchParams( query ).toString(), {}, null );
	console.log('AFTER useRest', eventData);

	const theme = createTheme({
		cssVariables: true,
		palette: {
			primary: {
				main: '#000',
			},
			secondary: {
				main: '#d72519',
			},
		},
	});
console.log('CALENDAR body:', eventData?.body);
console.log('CALENDAR first event:', eventData?.body?.[0]);
	return (
		<ThemeProvider theme={theme}>
			<AppContext.Provider value={{ setFilter, getFilter, paramsChanged, eventData, restUrl, pageLang }}>
				<Events />
				<form>
					<Pagination
						count={eventData?.headers?.get( 'X-WP-TotalPages' ) || 1}
						page={getFilter( 'page' )}
						shape="rounded"
						showFirstButton
						showLastButton
						siblingCount={1}
						boundaryCount={3}
						onChange={( e, p ) => setFilter( 'page', p )}
					/>
					{
						portals.map( portalNode => {
							const { componentName, initProps } = getNodeComponentData( portalNode );

							switch ( componentName ) {
								case 'checkbox-filter':
									return createPortal( <CheckboxFilter {...initProps} />, portalNode );
								case 'calendar-filter':
									return createPortal( <CalendarFilter {...initProps} eventData={eventData} />, portalNode );
								default:
									console.error( `Unknown component name: ${componentName}` );
							}
						} )
					}
				</form>
			</AppContext.Provider>
		</ThemeProvider>
	);
}