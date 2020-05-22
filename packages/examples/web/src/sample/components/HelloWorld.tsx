import React from 'react';
import debug from 'debug';
import {Calendar, DateLocalizer} from 'react-big-calendar';
import {format, startOfWeek, getDay} from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import Links from '../../core/Links';
// import './helloworld.scss';
import './calendar.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const d = debug('imperium.examples.web.HelloWorld');

const dateRangeFormat = ({start, end}, culture, local) => `${local.format(start, 'P', culture)} – ${local.format(end, 'P', culture)}`;

const timeRangeFormat = ({start, end}, culture, local) => `${local.format(start, 'p', culture)} – ${local.format(end, 'p', culture)}`;

const timeRangeStartFormat = ({start}, culture, local) => `${local.format(start, 'h:mma', culture)} – `;

const timeRangeEndFormat = ({end}, culture, local) => ` – ${local.format(end, 'h:mma', culture)}`;

const weekRangeFormat = ({start, end}, culture, local) => `${local.format(start, 'MMMM dd', culture)} – MMMM dd`;
// ${local.format(end, dates.eq(start, end, 'month') ? 'dd' : 'MMMM dd', culture)}

const locales = {
	'en-US': enUS,
};

const h = new DateLocalizer({
	formats: {
		dateFormat: 'dd',
		dayFormat: 'dd eee',
		weekdayFormat: 'cccc',

		selectRangeFormat: timeRangeFormat,
		eventTimeRangeFormat: timeRangeFormat,
		eventTimeRangeStartFormat: timeRangeStartFormat,
		eventTimeRangeEndFormat: timeRangeEndFormat,

		timeGutterFormat: 'p',

		monthHeaderFormat: 'MMMM yyyy',
		dayHeaderFormat: 'cccc MMM dd',
		dayRangeHeaderFormat: weekRangeFormat,
		agendaHeaderFormat: dateRangeFormat,

		agendaDateFormat: 'ccc MMM dd',
		agendaTimeFormat: 'p',
		agendaTimeRangeFormat: timeRangeFormat,
	},
	firstOfWeek(culture) {
		return getDay(startOfWeek(new Date(), {locale: locales[culture]}));
	},
	format(value, formatString, culture) {
		return format(new Date(value), formatString, {
			locale: locales[culture],
		});
	},
});

export default function HelloWorld() {
	return (
		<>
			<h1>Hello world</h1>
			<Links />
			<Calendar localizer={h} events={[]} startAccessor="start" endAccessor="end" />
		</>
	);
}
