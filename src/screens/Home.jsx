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

  background-image: url(${BGImage}); 
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.3;
`

const Home = () => {

  const { data: response, isLoading, error } = useGetEventsQuery();

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0)
  const [items, setItems] = useState([])

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

  console.log(events)
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

    <EventsWrapper>
      {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
        <>
          <Events>
            {
              items.map((item, index) => (

                <EventCard
                  image={item.image1}
                  complaint={item.complaint}
                  date_occurrence={item.date_occurrence}
                  id={item.id}
                  key={Math.random()}
                  index={index}
                />
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
