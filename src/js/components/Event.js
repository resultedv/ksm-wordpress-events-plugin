import { Fragment } from "react";
import DOMPurify from "dompurify";

export default function Event({event}) {
	const escapeHTML = ( html ) => {
		return {
			dangerouslySetInnerHTML : { __html : DOMPurify.sanitize( html ) }
		};
	};

	return (
		<li key={event.id} className="ksm-event">
			<div className="content-container">
				{event.ksm?.date && <div className="datetime" {...escapeHTML( event.ksm?.date )} />}
				<h2 {...escapeHTML( event.title.rendered )} />
				<div className="type-institute" {...escapeHTML( [event.acf?.type, event.acf?.institute].filter(Boolean).join(event.ksm?.sep) )} />
				<blockquote {...escapeHTML( event.content.rendered )} />
				<div className="featured-image" {...escapeHTML( event.ksm?.featured_image )} />
				{event.ksm?.registration_link && (
					<button>
						<a href={event.ksm?.registration_link} target="_blank">
							Zur Anmeldung
						</a>
					</button>
				)}
			</div>
			<ul className="info-container">
				{event.ksm?.info && ( Object.entries(event.ksm?.info).map(([type, value]) => (
					<li key={type}>
						<strong>{type}</strong>
						<br />
						<span {... escapeHTML( value )} />
					</li>
				) ) )}
			</ul>
		</li>
	);
}