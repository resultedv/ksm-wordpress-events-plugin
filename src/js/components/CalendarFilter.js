import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/de';

import AppContext from './AppContext';
import { useContext } from "react";
export default function CalendarFilter( { showDaysOutsideCurrentMonth = true, eventData } ) {
	console.log('CalendarFilter eventData:', eventData);

	const { getFilter, setFilter, pageLang } = useContext( AppContext );
	const today = dayjs();
	const date = dayjs( getFilter( 'date_from' ) );
	const setDate = date => setFilter( 'date_from', ( date > today ? date : today ).format( 'YYYY-MM-DD' ) );

	if ( date < today ) {
		setDate( today );
	}

	return (
		<>
			<LocalizationProvider
				dateAdapter={AdapterDayjs}
				adapterLocale={pageLang}
			>
				<DateCalendar
					showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
					disablePast
					views={['day']}
					value={date}
					onChange={setDate}
					onMonthChange={month => {
						setDate(dayjs().year(month.year()).month(month.month()).date(1));
					}}
					onYearChange={year => {
						setDate(dayjs().year(year.year()).month(0).date(1));
					}}
					dayOfWeekFormatter={weekday => weekday.format('dd')}
				/>
			</LocalizationProvider>
		</>
	);
}