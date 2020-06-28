import React, { useEffect, useState } from 'react';
import { AppointmentsDayView } from './AppointmentsDayView';

export const AppointmentsDayViewLoader = ({ today }) => {
  const from = today.setHours(0, 0, 0, 0);
  const to = today.setHours(23, 59, 59, 999);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const result = window.fetch(`/appointments/${from}-${to}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      });
      setAppointments(await (await result).json());
    };
    fetchAppointments();
  }, [from, to, today]);

  return <AppointmentsDayView appointments={appointments} />;
};

AppointmentsDayViewLoader.defaultProps = {
  today: new Date()
};