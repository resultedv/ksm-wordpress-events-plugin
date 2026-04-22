import { Fragment } from "react";
import DOMPurify from "dompurify";
import dayjs from "dayjs";
import 'dayjs/locale/de';
dayjs.locale('de');

export default function Event({event}) {
	const escapeHTML = ( html ) => {
		return {
			dangerouslySetInnerHTML : { __html : DOMPurify.sanitize( html ) }
		};
	};
console.log("EVENT IMAGE:", event.ksm?.featured_image, event.featured_media, event._embedded);
	return (
		<li key={event.id} className="ksm-event">
			<div className="content-container">

  {event.acf?.date?.start && (
  <div className="datetime">
    {dayjs(event.acf.date.start).format('dddd, DD.MM.YYYY')} |{" "}
    {dayjs(event.acf.date.start).format('HH:mm')} –{" "}
    {event.acf?.date?.end ? dayjs(event.acf.date.end).format('HH:mm') : ""}
    {event.acf?.date?.end ? " Uhr" : ""}
  </div>
)}

  <h2 {...escapeHTML(event.title.rendered)} />

  <div className="type-institute"
    {...escapeHTML(
      [event.acf?.type, event.acf?.institute]
        .filter(Boolean)
        .join(event.ksm?.sep)
    )}
  />

  <blockquote {...escapeHTML(event.content.rendered)} />

  <div className="featured-image"
    {...escapeHTML(event.ksm?.featured_image)}
  />

  {/* 🔥 MOVE INFO INSIDE */}
  <div className="info-container">
  {event.acf?.target_group && (
    <div><strong>Für</strong><br />{event.acf.target_group}</div>
  )}

  {event.acf?.organiser && (
    <div><strong>Von</strong><br />{event.acf.organiser}</div>
  )}

  {event.acf?.speaker && (
    <div><strong>Mit</strong><br />{event.acf.speaker}</div>
  )}

  {event.acf?.meeting_point && (
    <div><strong>Treffpunkt</strong><br />{event.acf.meeting_point}</div>
  )}

  {event.acf?.costs && (
    <div>
      <strong>Teilnahme</strong><br />
      {event.acf.costs.free_entry ? "kostenlos" : event.acf.costs.charge}
    </div>
  )}
</div>

  {event.ksm?.registration_link && (
    <button>
      <a href={event.ksm.registration_link} target="_blank">
        Zur Anmeldung
      </a>
    </button>
  )}

</div>
		</li>
	);
}