import React, { useState } from 'react'
import styled from 'styled-components'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddEventMutation } from '../slices/eventsApiSlice'
import { useUpdateUserMutation } from '../slices/usersSlice'

import BackButton from '../components/BackButton'


import { toast } from 'react-toastify'

import { useUserDetailQuery } from '../slices/usersSlice';

const Title = styled.h2`
  text-align: center;
  margin-top: 1rem;
  font-size: 1.3rem;
  color: #538341;
`



const FormContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: flex-start;
`

const linkStyle = {
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
};


const Input = styled.input`
  width: 80%;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center
`

const EditUser = () => {


  // const [complaint, setComplaint] = useState('')
  // const [description, setDescription] = useState('')
  // const [date_occurrence, setDateOccurrence] = useState('')
  // const [time_occurrence, setTimeOccurrence] = useState('')
  // const [coordinates, setCoordinates] = useState('')
  // const [image1, setImage1] = useState('')

  const [name, setName] = useState('')
  const [village, setVillage] = useState('')
  const [indigenous_territory, setIndigenous_territory] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [profile_pic, setProfile_pic] = useState('')



  const [addEvent, { isLoading }] = useAddEventMutation()
  const navigate = useNavigate()

  const { data, isLoading: isLoadingUser, error, refetch} = useUserDetailQuery();
  const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation();

  useEffect(() => {
    if(data) {
      setName(data.name);
      setVillage(data.village)
      setIndigenous_territory(data.indigenous_territory)
      setEmail(data.email);
      setPhone(data.phone);
      // setProfile_pic(data.profile_pic)
    }
  }, data)


  const submitHandler = async (e) => {
    e.preventDefault()

    let userData = new FormData()

    userData.append("id", data.id)
    userData.append("name", name)
    userData.append("village", village)
    userData.append("email", email)
    userData.append("indigenous_territory", indigenous_territory)
    userData.append("phone", phone)
    if(profile_pic) {
      userData.append("profile_pic", profile_pic)
    }

    // for (const value of eventData.values()) {
    //   console.log("AQUi")
    //   console.log(value);
    // }

    try {
      const res = await updateUser(userData).unwrap();
      // dispatch(setCredentials({...res, }))
      toast.success('Usuário atualizado com sucesso')
      refetch();
      navigate('/profile')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleImage = (e) => {
    setProfile_pic(e.target.files[0])
  }

  return (
    <>
      <BackButton page="/profile" />
      <Title>Editar perfil</Title>
      <FormContainer>
        <Form onSubmit={submitHandler}>

        <Form.Group controlId='profile_pic' className='mt-3'>
            <Form.Label>Selecione uma imagem</Form.Label>
            <Form.Control
              type='file'
              // value={image1}
              // required
              onChange={handleImage}>
            </Form.Control>
          </Form.Group>
          
          <Form.Group controlId='name' className=''>
            <Form.Label className='mt-1'>Nome</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ex: Lucas'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}>
              </Form.Control>
          </Form.Group>


          <Form.Group controlId='village' className=''>
            <Form.Label className='mt-1'>Aldeia</Form.Label>
            <Form.Control
              type='text'
              value={village}
              required
              onChange={(e) => setVillage(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='indigenous_territory' className=''>
            <Form.Label className='mt-1'>Território</Form.Label>
            <Form.Control
              type='text'
              value={indigenous_territory}
              required
              onChange={(e) => setIndigenous_territory(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className=''>
            <Form.Label className='mt-1'>Email</Form.Label>
            <Form.Control
              type='email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='phone' className=''>
            <Form.Label className='mt-1'>Telefone</Form.Label>
            <Form.Control
              type='number'
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}>
            </Form.Control>
          </Form.Group>



          <Wrapper>
            <Button type='submit' variant='success' className='mt-2' >Alterar</Button>
            {/* { isLoading && <Loader />} */}
          </Wrapper>
        </Form>
      </FormContainer>
    </>
  )
}

export default EditUser
