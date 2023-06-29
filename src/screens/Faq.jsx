import React from 'react'
import styled from 'styled-components'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import BGImage from '../assets/images/login.png'
import Accordion from 'react-bootstrap/Accordion';

const Image = styled.section`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;

  background-image: url(${BGImage}); 
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.2;
`

const Title = styled.h2`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`

const Faq = () => {
  return (
    <>
      <Image />
      <Title>FAQ - Perguntas frequentes</Title>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Como funciona o aplicativo?</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Como abrir uma ocorrência?</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Como entrar em contato conosco?</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {/* <Image /> */}
    </>
  )
}

export default Faq
