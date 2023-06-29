import React, {useEffect} from 'react'

// Style
import styled from 'styled-components'

// Router
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'

// Components
import { FaArrowCircleLeft } from 'react-icons/fa'
import Message from '../components/Message'
import Loader from '../components/Loader'

// RTK
import { useLazyGetUserNameQuery } from '../slices/usersSlice';
import { useGetEventDetailsQuery } from '../slices/eventsApiSlice.js'

const ImageWrapper  = styled.section`
  height: 30vh;
  background-image: url(${props => props.image ? props.image : 'none'}); 
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.8;
`

const TextInfoWrapper = styled.section`
  height: 60vh;
  border-top: 10px solid #444;
  text-align: center;
`

const Type = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 2rem;
`

const Date = styled.p`
  font-size: .9rem;
  margin: 0;
`

const Author = styled.p`
  font-size: .8;
`

const EventDetails = ( ) => {

  const {id: eventId} = useParams();
  const { data: event, isLoading, error } = useGetEventDetailsQuery(eventId)
  const { trigger,  } = useLazyGetUserNameQuery();

  useEffect(() => {
    if(event) {
    }
  }, [event, isLoading])

  return (
    <>
      { isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
        <>
          <ImageWrapper image={event.image1} />
          <TextInfoWrapper>
            <Type>{event.complaint}</Type>
            <Date>{event.date_occurrence.split('-').reverse().join('/')} | 18:00</Date>
            {/* <Author>{userDetail ? userDetail.name : ''}</Author> */}
            {event.description}
      </TextInfoWrapper>
        </>)} 
    </>
  )
}

export default EventDetails