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

const Title = styled.h2`
  text-align: center;
  margin-top: 1rem;
  font-size: 1.3rem;
  color: #538341;
  font-family: "Arboria-Bold";
`

const FormContainer = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.3rem;
  justify-content: flex-start;
`

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
      <Title>Busca</Title>
      <FormContainer>
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