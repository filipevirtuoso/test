import React from 'react'

// Style
import styled from 'styled-components'

// Router
import { Link } from 'react-router-dom' 

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
const Image = styled.img`
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

const linkStyle = {
  textDecoration: "none",
};

const EventCard = ({image, complaint, date_occurrence, id }) => {
  return (
    <Link to={`/eventdetails/${id}`} style={linkStyle}> 
      <Wrapper>
        <Image src={image} alt="Small image" />
        <Type>{complaint}</Type>
        <Date>{date_occurrence.split('-').reverse().join('/')}</Date>
      </Wrapper>
    </Link>
  )
}

export default EventCard
