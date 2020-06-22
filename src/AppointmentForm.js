import React, { useState } from 'react';

export const AppointmentForm = ({ selectableServices, service, onSubmit }) => {
  const [selectedService, setSelectedService] = useState({ service });

  const changeServiceHandler = ({ target }) => {
    setSelectedService((selectedService) => ({ ...selectedService, [target.name]: target.value }));
  };

  return (
    <form id='appointment' onSubmit={() => onSubmit(selectedService)}>
      <label htmlFor='service'>Services</label>
      <select
        name='service'
        value={service}
        id='service'
        onChange={changeServiceHandler}
      >
        <option />
        {selectableServices.map(s => <option key={s}>{s}</option>)}
      </select>
    </form>
  );
};

AppointmentForm.defaultProps = {
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ]
};