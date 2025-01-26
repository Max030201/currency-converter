import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const items = [
    { label: 'Конвертер', icon: 'pi pi-refresh', command: () => navigate('/') },
    { label: 'Курсы', icon: 'pi pi-table', command: () => navigate('/rates') },
    { label: 'График', icon: 'pi pi-chart-line', command: () => navigate('/chart') },
    { label: 'История', icon: 'pi pi-clock', command: () => navigate('/history') },
  ];

  // Удаляем itemTemplate, используем только model и стили
  return (
    <Menubar
      model={items}
      className="bg-transparent border-none shadow-none"
    />
  );
};

export default Navigation;
