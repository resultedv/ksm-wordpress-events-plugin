import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/de";

dayjs.locale("de");

export default function Event({ event }) {
const [imageData, setImageData] = useState(null);
useEffect(() => {
  const mediaUrl = event?._links?.["wp:featuredmedia"]?.[0]?.href;

  if (!mediaUrl) {
    setImageData(null);
    return;
  }

  fetch(mediaUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log("MEDIA DATA:", data);
      setImageData(data || null);
    })
    .catch(() => {
      setImageData(null);
    });
}, [event]);

  const escapeHTML = (html) => {
    return {
      dangerouslySetInnerHTML: {
        __html: DOMPurify.sanitize(html || ""),
      },
    };
  };
const getImageCredit = () => {
  const html = event.content?.rendered || "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  const paragraphs = Array.from(doc.querySelectorAll("p"));

  const credit = paragraphs.find((p) => {
    const text = p.textContent || "";
    return (
      text.includes("Abb.") ||
      text.includes("Abbildung") ||
      text.includes("Foto") ||
      text.includes("©")
    );
  });

  return credit ? credit.innerHTML : "";
};

const imageCredit = getImageCredit();
  return (
    <li key={event.id} className="ksm-event">
      <div className="event-date-block">
        <div className="event-date-day">
          {dayjs(event.acf?.date?.start).format("DD.")}
        </div>
        <div className="event-date-month">
          {dayjs(event.acf?.date?.start).format("MMMM")}
        </div>
      </div>

 {imageData?.source_url && (
  <div className="featured-image">
    <img src={imageData.source_url} alt={event.title?.rendered || ""} />

    {imageCredit && (
      <div
        className="image-credit"
        {...escapeHTML(imageCredit)}
      />
    )}
  </div>
)}

      <div className="content-container">
        {event.acf?.date?.start && (
          <div className="datetime">
            {dayjs(event.acf.date.start).format("dddd, DD.MM.YYYY")} |{" "}
            {dayjs(event.acf.date.start).format("HH:mm")}
            {event.acf?.date?.end && (
              <>
                {" "}
                – {dayjs(event.acf.date.end).format("HH:mm")} Uhr
              </>
            )}
          </div>
        )}
        <div
  className="type-institute"
  {...escapeHTML(
    [event.acf?.type, event.acf?.institute]
      .filter(Boolean)
      .join(event.ksm?.sep || ", ")
  )}
/>

        <h2 {...escapeHTML(event.title?.rendered)} />

       

        <blockquote {...escapeHTML(event.content?.rendered)} />

        <div className="info-container">
  {[
    event.acf?.target_group && (
      <>
        <strong>Für:</strong> {event.acf.target_group}
      </>
    ),

    event.acf?.organiser && (
      <>
        <strong>Von:</strong> {event.acf.organiser}
      </>
    ),

    event.acf?.speaker && (
      <>
        <strong>Mit:</strong> {event.acf.speaker}
      </>
    ),

    event.acf?.meeting_point && (
      <>
        <strong>Treffpunkt:</strong> {event.acf.meeting_point}
      </>
    ),

    event.acf?.costs && (
      <>
        <strong>Teilnahme:</strong>{" "}
        {event.acf.costs.free_entry ? "kostenlos" : event.acf.costs.charge}
      </>
    ),
  ]
    .filter(Boolean)
    .map((item, index, array) => (
      <span key={index}>
        {item}
        {index < array.length - 1 && <span className="info-separator"> | </span>}
      </span>
    ))}
</div>

<a href={event.link} className="details-button">
  Veranstaltungsdetails
</a>

        {event.ksm?.registration_link && (
          <button className="registration-button">
            <a href={event.ksm.registration_link} target="_blank" rel="noreferrer">
              Zur Anmeldung
            </a>
          </button>
        )}
      </div>
    </li>
  );
}