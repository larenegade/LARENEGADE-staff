import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

export default function BookingCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    onValue(ref(db, 'bookings'), (snap) => {
      const data = snap.val() || {};
      const list = Object.entries(data).map(([id, b]) => ({
        id,
        title: `${b.clientName} – ${b.service}`,
        start: b.dateTime,
        extendedProps: b
      }));
      setEvents(list);
    });
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={events}
      editable={true}
      height="auto"
    />
  );
}
