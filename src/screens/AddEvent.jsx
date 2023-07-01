import React, { useState } from 'react'
import styled from 'styled-components'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAddEventMutation } from '../slices/eventsApiSlice'

import { toast } from 'react-toastify'

import { useUserDetailQuery } from '../slices/usersSlice';

const Title = styled.h2`
  text-align: center;
  margin-top: 1rem;
  font-size: 1.3rem;
`

const FormContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: flex-start;
`


const Input = styled.input`
  width: 80%;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center
`

const AddEvent = () => {


  const [complaint, setComplaint] = useState('')
  const [description, setDescription] = useState('')
  const [date_occurrence, setDateOccurrence] = useState('')
  const [time_occurrence, setTimeOccurrence] = useState('')
  const [coordinates, setCoordinates] = useState('')
  const [image1, setImage1] = useState('')


  const [addEvent, { isLoading }] = useAddEventMutation()
  const navigate = useNavigate()

  const { data, isLoading: isLoadingUser, error } = useUserDetailQuery();


  const submitHandler = async (e) => {
    e.preventDefault()


    let eventData = new FormData()

    eventData.append("complaint", complaint)
    eventData.append("description", description)
    eventData.append("date_occurrence", date_occurrence)
    eventData.append("time_occurrence", time_occurrence)
    eventData.append("image1", image1)
    eventData.append("teste", "teste")
    eventData.append("user", data.id)
    eventData.append("coordinates", coordinates)

    for (const value of eventData.values()) {
      console.log("AQUi")
      console.log(value);
    }

    try {
      const res = await addEvent(eventData).unwrap();
      // dispatch(setCredentials({...res, }))
      navigate('/')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleImage = (e) => {
    setImage1(e.target.files[0])
  }

  return (
    <>
      <Title>Abrir ocorrência</Title>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='complaint'>
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              type='select'
              value={complaint}
              required
              onChange={(e) => setComplaint(e.target.value)}>
              <option>Desmate</option>
              <option>Grilagem</option>
              <option>Invasão</option>
              <option>Garimpo</option>
              <option>Queimadas</option>
              <option>Outros</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId='description' className='mt-3'>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Informações sobre a ocorrência'
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='image1' className='mt-3'>
            <Form.Label>Selecione uma imagem</Form.Label>
            <Form.Control
              type='file'
              // value={image1}
              // required
              onChange={handleImage}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='date_occurrence' className='mt-3'>
            <Form.Label>Informe a data</Form.Label>
            <Form.Control
              type='date'
              value={date_occurrence}
              required
              onChange={(e) => setDateOccurrence(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='time_occurrence' className=''>
            <Form.Label>Informe o horário</Form.Label>
            <Form.Control
              type='time'
              value={time_occurrence}
              required
              onChange={(e) => setTimeOccurrence(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='coordinates' className=''>
            <Form.Label>Coordenadas</Form.Label>
            <Form.Control
              type='text'
              value={coordinates}
              required
              onChange={(e) => setCoordinates(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Wrapper>
            <Button type='submit' variant='success' className='mt-2' >Enviar</Button>
            {/* { isLoading && <Loader />} */}
          </Wrapper>
        </Form>
      </FormContainer>
    </>
  )
}

export default AddEvent
