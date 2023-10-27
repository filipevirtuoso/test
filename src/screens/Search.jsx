import React, {useState, useEffect} from 'react'


// Styled components
import styled from 'styled-components'

// Components
import BackButton from '../components/BackButton'
import EventCard from '../components/EventCard'
import { Form }from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import PageSelector from '../components/PageSelector'

// RTK
import { useGetEventsQuery } from '../slices/eventsApiSlice'

import paginate from '../utils/paginate'

import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import BGImage from '../assets/images/bg-home.png'

const Wrapper = styled.section`
  margin-left: .3rem;
  margin-top: 1rem;
  height: 130px;
  width: 110px;
  // background-color: #58AE3A;
  background-color: #EB6900;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h2`
  text-align: center;
  margin-top: 1rem;
  font-size: 1.3rem;
  color: #C95A00 ;
  font-family: "Arboria-Bold";
`

const FormContainer = styled.section`
  // height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.3rem;
  justify-content: flex-start;
  background-color: #000;
  color: #fff;
`

const EventsWrapper = styled.section`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: red;
  background-color: #000;
`

const Events = styled.section`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  // background-color: red;
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


function Search() {
  const [filter, setFilter] = useState('')


  const { data: response, isLoading, error } = useGetEventsQuery();

  const [filteredEvents, setFilteredEvents] = useState([])
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
      if(filter) {
        let filtered = response.filter((event) => event.complaint === filter)
        console.log(filtered)
        setEvents(paginate(filtered))
      } else {
        setEvents(paginate(response))
      }

    }
  }, [isLoading, filter, response])

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


  return (
    <>
      <BackButton page="/" />
      
      <FormContainer>
      <Title>Busca</Title>
        <Form>
          <Form.Group controlId='complaint'>
            <Form.Label className="mt-3">Filtrar ocorrências pelo tipo:</Form.Label>
            <Form.Select
              type='select'
              required
              value={filter}
              onChange={(e) => setFilter(e.target.value)}>
              <option>Selecione uma opção</option>
              <option>Desmate</option>
              <option>Grilagem</option>
              <option>Invasão</option>
              <option>Garimpo</option>
              <option>Queimadas</option>
              <option>Outros</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </FormContainer>
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
                events.length > 0 ?                 items.map((item, index) => (
                  <Wrapper onClick={() => (handleShow(), setInfo(item))}>
                  <CardImage src={item.image1} alt="Indisponível" />
                  <Type>{item.complaint}</Type>
                  <Date>{item.date_occurrence.split('-').reverse().join('/')}</Date>
                  </Wrapper>
                )) : "Não foram encontradas ocorrências com esse tipo."
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
          </>
        )}
      </EventsWrapper>
    </>
  )
}

export default Search