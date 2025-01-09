
import { useState, useEffect  } from 'react'
import './App.css'
import Modal from './components/Modal'
import NavBar from './components/Navbar'
import Table from './components/Table'
import Pagination from './components/Pagination';

import clients from "./api/clients";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);

  const [data, setData] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const fetchClients = async () => {
    try {
      const response  = await clients.get(`/`)
      setData(response.data); 

    } catch (err) {
        console.log(err)
    }
  };

  useEffect(() => {
    fetchClients();
  }, [])

  const handleOpen = (mode, client) => {
    setClientData(client);
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await clients.post('/', newClientData);
        console.log('Client added:', response.data);
        setData((prevData) => [...prevData, response.data]);
        } catch (error) {
            console.error('Error adding client:', error);
        }
        console.log('modal mode Add');

    } else {
      console.log('Updating client with ID:', clientData.id); 
      try {
          const response = await clients.put(`/${clientData.id}`, newClientData);
          console.log('Client updated:', response.data);
          setData((prevData) =>
            prevData.map((client) => (client.id === clientData.id ? response.data : client))
          );
          } catch (error) {
          console.error('Error updating client:', error); 
      }
    }
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const tableData = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage)

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const exportToCsv = e => {
    e.preventDefault()
    let headers = ['Id, Name, Email, Job, Rate']
    let usersCsv = data.reduce((acc, user) => {
      const { id, name, email, job, rate } = user
      acc.push([id, name, email, job, rate].join(','))
      return acc
    }, [])
    downloadFile({
      data: [...headers, ...usersCsv].join('\n'),
      fileName: 'users.csv',
      fileType: 'text/csv',
    })
  }
  return (
    <>
      <NavBar 
        onOpen={() => handleOpen('add')} 
        onSearch={setSearchTerm} 
        data={tableData}
        exportToCsv={exportToCsv}
      />
      <Table 
        setData={setData} 
        data={tableData}
        handleOpen={handleOpen} 
        searchTerm={searchTerm}
        clients={clients}
      />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Modal 
        isOpen={isOpen} 
        OnSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode} 
        clientData={clientData}
      />
    </>
  )
}

export default App