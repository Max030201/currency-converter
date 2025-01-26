import React from 'react';
import { InputSwitch } from 'primereact/inputswitch';

const ThemeToggle = ({ checked, onChange }) => (
  <div className="flex items-center ml-4">
    <span className="mr-2">{checked ? '🌙' : '☀️'}</span>
    <InputSwitch checked={checked} onChange={onChange} />
  </div>
);

export default ThemeToggle;