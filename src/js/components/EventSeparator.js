import 'dayjs/locale/de';
import { useContext } from "react";
import AppContext from "./AppContext";

export default function EventSeparator( { date } ) {
	const { pageLang } = useContext( AppContext );
	return (
		<li key={date.unix()} className="ksm-event date-sep">
			<time
				dateTime={date.format( 'YYYY-MM-DD' )}
			>
				{date.locale( pageLang ).format( 'dddd, DD.MM.YYYY' )}
			</time>
		</li>
	);
}