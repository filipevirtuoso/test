import React, {useEffect, useState} from 'react'

// Style
import styled from 'styled-components'

// Router
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'

// Components
import { FaArrowCircleLeft } from 'react-icons/fa'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Carousel from 'react-bootstrap/Carousel';

// RTK
import { useLazyGetUserNameQuery } from '../slices/usersSlice';
import { useGetEventDetailsQuery } from '../slices/eventsApiSlice.js'



const ImageWrapper  = styled.section`
  height: 20vh;
`

const TextInfoWrapper = styled.section`
  height: 60vh;
  border-top: 10px solid #444;
  // text-align: center;
  background-color: #deffe0;

  display: flex;
  justify-content: center;
  align-items: flex-start;
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

const Status = styled.span`
  background-color: #008CBA;
  padding: 0.3rem;
  margin:rem;
`

const Wrapper = styled.section`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 80%;
  height: 65%;
  background-color: #529e56;
  margin-top: 2rem;
`

const Table = styled.table`
  border: 2px solid black;
  border-collapse: collapse;
  width: 75%
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

const EventDetails = ( ) => {


  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const {id: eventId} = useParams();
  const { data: event, isLoading, error } = useGetEventDetailsQuery(eventId)
  const { trigger,  } = useLazyGetUserNameQuery();

  console.log(event)

  useEffect(() => {
    if(event) {
    }
  }, [event, isLoading])

  return (
    <>
      { isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
        <>
          {/* <ImageWrapper image={event.image1} /> */}





      <Carousel activeIndex={index} onSelect={handleSelect}>

        
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={event.image1}
          alt="First slide"
        />
      </Carousel.Item>

      {!event.image2 ? '' : (

        <Carousel.Item>
        <img
          className="d-block w-100"
          src={event.image2}
          alt="Second slide"
        />
        </Carousel.Item>

      )}


      {!event.image3 ? '' : (
      
      <Carousel.Item>
      <img
        className="d-block w-100"
        src={event.image3}
        alt="Third slide"
      />
      </Carousel.Item>

      )}





      </Carousel>













      <TextInfoWrapper>
        <Wrapper>

        <Table >
          <tr>
          <Th>Tipo:</Th>
          <Td>{event.complaint}</Td>
          </tr>
          <tr>
          <Th>Data:</Th>
          <Td>{event.date_occurrence.split('-').reverse().join('/')}</Td>
          </tr>
          <tr>
          <Th>Horário:</Th>
          <Td>{event.time_occurrence}</Td>
          </tr>
          <tr>
          <Th>Status:</Th>
          <Td>{event.status}</Td>
          </tr>
          <tr>
          <Th>Descrição:</Th>
          <Td>{event.description}</Td>
          </tr>
        </Table>
        </Wrapper>
      </TextInfoWrapper>
        </>)} 
    </>
  )
}

export default EventDetails