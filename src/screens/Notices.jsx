import React, { useState, useEffect } from 'react'
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

const Wrapper = styled.section`
  background-color: #000;
  height: 100vh;
`

const Title = styled.h2`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  // text-decoration: underline;
  color: #C95A00;
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
  const [lang, setLang] = useState('')


  useEffect(() => {
    const lastSelected = JSON.parse(
      localStorage.getItem("lang") ?? "[]"
    );
    setLang(lastSelected);
  }, [])

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };  

  return (
    <Wrapper>
    <BackButton page={pathname === '/notices' ? "/" : "/"} />
    <Title>{lang === "Português" ? "Avisos" : "Wãno Këpë"}</Title>

    { isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{lang === "Português" ? "Detalhes" : "Wahimikë"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        


        { !info ? <Loader /> :  (


<>

{info.image ? (
  <Carousel activeIndex={index} onSelect={handleSelect} className="mb-4">

  <Carousel.Item>
    <img
      className="d-block w-100"
      src={info.image}
      alt="First slide"
    />
  </Carousel.Item>
  
  </Carousel>
) : null}







        <Table >
            <tr>
            <Th>{lang === "Português" ? "Título:" : "Título:"}</Th>
            <Td>{info.title}</Td>
            </tr>
            <tr>
            <Th>{lang === "Português" ? "Descrição:" : "Wahimiai"}</Th>
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
            <th>{lang === "Português" ? "Descrição:" : "Wahimiai"}</th>
            <th>{lang === "Português" ? "Data:" : "Thë Wakara"}</th>

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
    </Wrapper>
  )
}

export default Notices