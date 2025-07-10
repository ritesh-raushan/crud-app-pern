import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import TableList from './components/TableList'
import ModalForm from './components/ModalForm'

function App() {
  const[isOpen, setIsOpen] = useState(false);
  const[modalMode, setModalMode] = useState('add');

  const handleOpen = (mode) => {
    setIsOpen(true);
    setModalMode(mode);
  }

  const handleSubmit = () => {
    if(modalMode === 'add') {
      // Logic to add a new client
    } else {
      // Logic to update an existing client
    }
  }

  return (
    <>
      <Navbar onOpen={() => handleOpen('add')} />
      <TableList handleOpen={handleOpen} />
      <ModalForm isOpen={isOpen} onClose={() => setIsOpen(false)} mode={modalMode} onSubmit={handleSubmit} />
    </>
  )
}

export default App
