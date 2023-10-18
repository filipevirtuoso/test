import React, { useState, useEffect } from 'react'

// Style
import styled from 'styled-components'

// Components
import PageSelector from '../components/PageSelector'
import EventCard from '../components/EventCard'
import Loader from '../components/Loader'
import Message from '../components/Message'

// RTK
import { useGetEventsQuery } from '../slices/eventsApiSlice'

// Other
import paginate from '../utils/paginate'
import BGImage from '../assets/images/bg-home.png'

import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EventsWrapper = styled.section`
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // background-color: red;
`

const Events = styled.section`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  // background-color: red;
`

const Image = styled.section`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: center;
  margin-top: .5rem;

  background-image: url(${BGImage}); 
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.3;
`

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

const Wrapper = styled.section`
  margin-left: .3rem;
  margin-top: 1rem;
  height: 130px;
  width: 110px;
  background-color: #58AE3A;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const CardImage = styled.img`
  width: 100%;
  height: 80px;
  border-radius: 10px;
  border: 3px solid #fff;
  object-fit: cover;
`

const Type = styled.h2`
  font-size: 1rem;
  color: #f4f4f4;
  margin: 0;
  margin-top: .5rem;
`

const Date = styled.p`
  color: #f4f4f4;
  font-size: .8rem;
  margin: 0;
  padding: 0;
`

const Home = () => {

  const { data: response, isLoading, error } = useGetEventsQuery();

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0)
  const [items, setItems] = useState([])

  // Modal
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };  


  function handlePage(index) {
    setPage(index)
  }

  useEffect(() => {
    if (isLoading === false) {
      setEvents(paginate(response))
    }
  }, [isLoading, response])

  useEffect(() => {
    if (events.length) {
      setItems(events[page])
    }
  }, [events, page])

  useEffect(() => {
    handlePage(0)
  }, [events.length])

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > events.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = events.length - 1
      }
      return prevPage
    })
  }


  console.log(show)
  return (

    <EventsWrapper>
      {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
        <>


<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{"Detalhes"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        { !info ? <Loader /> :  (


<>
<Carousel activeIndex={index} onSelect={handleSelect} className="mb-4">

        
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





</Carousel>






        <Table >
            <tr>
            <Th>Tipo:</Th>
            <Td>{info.complaint}</Td>
            </tr>
            <tr>
            <Th>Data:</Th>
            <Td>{info.date_occurrence.split('-').reverse().join('/')}</Td>
            </tr>
            <tr>
            <Th>Horário:</Th>
            <Td>{info.time_occurrence}</Td>
            </tr>
            <tr>
            <Th>Status:</Th>
            <Td>{info.status}</Td>
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






          <Events>
            {
              items.map((item, index) => (
                <Wrapper onClick={() => (handleShow(), setInfo(item))}>
                <CardImage src={item.image1} alt="Indisponível" />
                <Type>{item.complaint}</Type>
                <Date>{item.date_occurrence.split('-').reverse().join('/')}</Date>
                </Wrapper>
              ))
            }

          </Events>
          {!!events.length && (

            <PageSelector
              pageCount={events}
              items={events[page]}
              prevPage={prevPage}
              nextPage={nextPage}
              setPage={setPage}
              pages={events}
              page={page}
            />
          )}
          <Image />
        </>)}
    </EventsWrapper>
  )
}

export default Home
