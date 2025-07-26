import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import TableList from './components/TableList'
import ModalForm from './components/ModalForm'
import axios from 'axios';

function App() {
  const[isOpen, setIsOpen] = useState(false);
  const[modalMode, setModalMode] = useState('add');
  const [searchQuery, setSearchQuery] = useState('');
  const [clientData, setClientData] = useState(null);

  const handleOpen = (mode, client) => {
    setIsOpen(true);
    setModalMode(mode);
    setClientData(client);
  }

  const handleSubmit = async (formData) => {
    if(modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:8000/api/clients', formData);
        console.log('Client added:', response.data);
      } catch (error) {
        console.error('Error adding client:', error);
      }
    } else {
      try {
        const response = await axios.put(`http://localhost:8000/api/clients/${clientData.id}`, formData);
        console.log('Client updated:', response.data);
      } catch (error) {
        console.error('Error updating client:', error);
      }
    }
  }

  return (
    <>
      <Navbar onOpen={() => handleOpen('add')} onSearch={setSearchQuery} />
      <TableList handleOpen={handleOpen} searchQuery={searchQuery} />
      <ModalForm isOpen={isOpen} onClose={() => setIsOpen(false)} mode={modalMode} onSubmit={handleSubmit} clientData={clientData} />
    </>
  )
}

export default App
