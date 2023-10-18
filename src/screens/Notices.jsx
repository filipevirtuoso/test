import React, { useState } from 'react'
import styled from 'styled-components'

import { useGetNoticesQuery} from '../slices/eventsApiSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';

import { FaEdit } from 'react-icons/fa'

import { Link } from 'react-router-dom'

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';

import BackButton from '../components/BackButton';

import { useLocation } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';

const Title = styled.h2`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  // text-decoration: underline;
  color: #538341;
  font-family: "Arboria-Bold";
`

// const Table = styled.table`
//   border: 2px solid black;
//   border-collapse: collapse;
//   width: 75%
// `

const Th = styled.th`
  border: 2px solid black;
  border-collapse: collapse;
  padding: 5px;
text-align: left;
`

const Td = styled.td`
  border: 2px solid black;
  border-collapse: collapse;
  padding: 5px;
text-align: left;
`

const linkStyle = {
  textDecoration: "none",
  // display: "flex",
  // alignItems: "center",
  color: '#444'
};

const Notices = (props) => {

  const { data: events, isLoading, error } = useGetNoticesQuery();
  const location = useLocation()
  const {pathname} = location
  const [show, setShow] = useState(false);

  const [info, setInfo] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };  


  console.log(pathname)

  return (
    <>
    <BackButton page={pathname === '/notices' ? "/" : "/"} />
    <Title>Avisos</Title>

    { isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Detalhes"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        


        { !info ? <Loader /> :  (


<>
{/* <Carousel activeIndex={index} onSelect={handleSelect} className="mb-4">

        
<Carousel.Item>
  <img
    className="d-block w-100"
    src={info.image1}
    alt="First slide"
  />
</Carousel.Item>

{!info.image2 ? '' : (

  <Carousel.Item>
  <img
    className="d-block w-100"
    src={info.image2}
    alt="Second slide"
  />
  </Carousel.Item>

)}


{!info.image3 ? '' : (

<Carousel.Item>
<img
  className="d-block w-100"
  src={info.image3}
  alt="Third slide"
/>
</Carousel.Item>

)}





</Carousel> */}






        <Table >
            <tr>
            <Th>Título:</Th>
            <Td>{info.title}</Td>
            </tr>
            <tr>
            <Th>Descrição:</Th>
            <Td>{info.description}</Td>
            </tr>
          </Table>

          </>
        )}


            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
        </Modal>

      <Table striped borered hover responsive className='table-sm'>

        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Data</th>

          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event.id} onClick={() => (handleShow(), setInfo(event))}>
              <td>{event.title}</td>
              {/* <td>{event.date_occurrence.split('-').reverse().join('/')}</td> */}
              <td>{event.description.slice(0, 15) + '...'}</td>
              <td>{new Date(event.created_at).toLocaleDateString('pt-br')}</td>
              {/* <td><Link to='/editevent' style={linkStyle} state={{id: event.id}}><FaEdit /></Link></td> */}
            </tr>
          ) )}
        </tbody>

      </Table>
      </>
    )}
    </>
  )
}

export default Notices