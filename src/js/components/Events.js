import AppContext from './AppContext';
import { useContext, useEffect } from "react";

import EventsSkeleton from "./EventsSkeleton";
import EventError from "./EventError";
import NoEvents from "./NoEvents";
import Event from "./Event";
import EventSeparator from "./EventSeparator";
import dayjs from "dayjs";
import 'dayjs/locale/de';

export default function Events() {
	const { eventData, paramsChanged } = useContext( AppContext );

	useEffect( () => {
		if ( paramsChanged ) {
			const eventContainer = document.querySelector( '.ksm-event-list' );
			if( eventContainer ) {
				const rect = eventContainer.getBoundingClientRect();
				if( rect.top < 0 || rect.top >= window.innerHeight ) {
					window.scrollTo( {
						top : rect.top + window.scrollY - 90, // 50px Puffer
						behavior : 'smooth'
					} );
				}
			}
		}
	}, [ eventData ] );

	let lastDate = null;
	return (
		<div className="ksm-events">
			{
				eventData === null ? (
					<EventsSkeleton />
				) : eventData instanceof Error ? (
					<EventError message={eventData.message} />
				) : eventData.body.length === 0 ? (
					<NoEvents />
				) : (
					<ul className="ksm-event-list">
						{eventData.body.map(event => {
							const newDate = dayjs(event.acf?.date?.start).format( 'YYYY-MM-DD' );

							const dateSep = lastDate !== newDate && <EventSeparator date={dayjs( newDate )} />;
							lastDate = newDate;

							return (
								<>
									{dateSep}
									<Event event={event} />
								</>
							);
						})}
					</ul>
				)
			}
		</div>
	)
}