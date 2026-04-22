import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/de';

import AppContext from './AppContext';
import { useContext, useEffect, useMemo, useRef } from "react";

export default function CalendarFilter({ showDaysOutsideCurrentMonth = true, eventData }) {
	const { getFilter, setFilter, pageLang } = useContext(AppContext);
	const calendarRef = useRef(null);

	const today = dayjs().startOf('day');
	const rawFilterDate = getFilter('date_from');
	const date = rawFilterDate ? dayjs(rawFilterDate) : today;

	const setDate = (newDate) => {
		if (!newDate) return;
		const safeDate = newDate.isAfter(today, 'day') ? newDate : today;
		setFilter('date_from', safeDate.format('YYYY-MM-DD'));
	};

	const eventDates = useMemo(() => {
		return new Set(
			(eventData?.body || [])
				.map((event) => event?.ksm?.date_start || event?.acf?.date?.start)
				.filter(Boolean)
				.map((rawDate) => dayjs(rawDate).format('YYYY-MM-DD'))
		);
	}, [eventData]);

	useEffect(() => {
		const root = calendarRef.current;
		if (!root) return;

		const dayButtons = root.querySelectorAll('button');

		dayButtons.forEach((button) => {
			button.style.backgroundColor = '';
			button.style.backgroundImage = '';
			button.style.fontWeight = '';
			button.style.borderRadius = '';

			const ts = button.getAttribute('data-timestamp');
			if (!ts) return;

			const dayKey = dayjs(Number(ts)).format('YYYY-MM-DD');

			if (eventDates.has(dayKey)) {
				button.style.backgroundColor = 'transparent';
				button.style.backgroundImage =
					'radial-gradient(circle, rgba(217, 45, 32, 0.2) 0%, rgba(217, 45, 32, 0.2) 68%, transparent 70%)';
				button.style.fontWeight = '700';
				button.style.borderRadius = '999px';
			}
		});
	}, [eventDates, date]);

	return (
		<div ref={calendarRef}>
			<LocalizationProvider
				dateAdapter={AdapterDayjs}
				adapterLocale={pageLang}
			>
				<DateCalendar
					showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
					disablePast
					views={['day']}
					value={date.isValid() ? date : today}
					onChange={setDate}
					onMonthChange={(month) => {
						setDate(dayjs().year(month.year()).month(month.month()).date(1));
					}}
					onYearChange={(year) => {
						setDate(dayjs().year(year.year()).month(0).date(1));
					}}
					dayOfWeekFormatter={(weekday) => weekday.format('dd')}
				/>
			</LocalizationProvider>
		</div>
	);
}