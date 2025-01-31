import React from 'react';
import { Dialog } from 'primereact/dialog';

const Modal = ({ visible, onHide, header, children }) => (
  <Dialog
    header={header}
    visible={visible}
    style={{ width: '30vw' }}
    onHide={onHide}
    className="rounded-lg"
    draggable={false}
    resizable={false}
  >
    {children}
  </Dialog>
);

export default Modal;