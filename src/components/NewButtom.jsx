import React from 'react'
import styled from 'styled-components'
import { FaExclamationTriangle, FaPlus, FaQuestion, FaListUl, FaHandsHelping, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Message from '../components/Message'

// RTK
import { useGetEventsQuery } from '../slices/eventsApiSlice'

const SectionWrapper = styled.section`
  height: 12vh;

  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: .1rem;
  margin-top: .1rem;
`

// const Button = styled.button`
//   border: none;
//   color: #f2f2f2;
//   cursor: pointer;
//   background: rgb(20,117,28);
//   background: linear-gradient(132deg, rgba(20,117,28,1) 0%, rgba(34,187,83,1) 90%);
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   width: 45%;
//   height: 2rem;
//   border-radius: 30px;

//   &:hover {
//     background-color: #9a9c9a;
//     color: #fff;
//   }
// `

const ButtonWrapper = styled.section`
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 10vh;
`

const Text = styled.span`
  margin-left: .3rem;
  color: #f2f2f2;
  font-size: .7rem;
  color: #444;
`

const Test = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Div = styled.div`
  height: 9vh;
  width: 9vh;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;


  background: rgb(20,117,28);
  background: linear-gradient(132deg, rgba(20,117,28,1) 0%, rgba(34,187,83,1) 90%);

  &:active  {
    background-color: purple;
  }


`

const linkStyle = {
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
};

const NewButtom = () => {
  const { data: response, isLoading, error } = useGetEventsQuery();
  return (
    
    <SectionWrapper>
      {isLoading ? null : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (

        <>
        <ButtonWrapper>
        <Link to='/addevent' style={linkStyle}>
          <Test>
          <Div><FaPlus color='#f2f2f2' /></Div>
          <Text>
            Adicionar
          </Text>
          </Test>
        </Link>
      </ButtonWrapper>

      <ButtonWrapper>
        <Link to='/myevents' style={linkStyle}>
          <Test>

          <Div><FaListUl color='#f2f2f2' /></Div>
          <Text>
            Ocorrências
          </Text>
          </Test>
        </Link>
      </ButtonWrapper>

      <ButtonWrapper>
        <Link to='/' style={linkStyle}>
          <Test>

          <Div><FaExclamationTriangle color='#f2f2f2' /></Div>
          <Text>
            Avisos
          </Text>
          </Test>
        </Link>
      </ButtonWrapper>

      {/* <ButtonWrapper>
        <Link to='/' style={linkStyle}>
          <Test>

          <Div><FaMapMarkerAlt color='#f2f2f2' /></Div>
          <Text>
            Mapa
          </Text>
          </Test>
        </Link>
      </ButtonWrapper> */}

      <ButtonWrapper>
        <Link to='/call' style={linkStyle}>
          <Test>

          <Div><FaHandsHelping color='#f2f2f2' /></Div>
          <Text>
            Ajuda
          </Text>
          </Test>
        </Link>
      </ButtonWrapper>

      <ButtonWrapper>
        <Link to='/faq' style={linkStyle}>
          <Test>
            <Div>
              <FaQuestion color='#f2f2f2' />
            </Div>
            <Text>
              FAQ
            </Text>
          </Test>
        </Link>
      </ButtonWrapper>
      </>
      )}
    </SectionWrapper>
  )
}

export default NewButtom





