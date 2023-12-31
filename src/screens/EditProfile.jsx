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
  color: #C95A00;
  font-family: "Arboria-Bold";
`



const FormContainer = styled.section`
  height: 80vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: flex-start;
  color: #fff;
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

  const [lang, setLang] = useState('')


useEffect(() => {
  const lastSelected = JSON.parse(
    localStorage.getItem("lang") ?? "[]"
  );
  setLang(lastSelected);
}, [])

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
      <Title>{lang === "Português" ? "Editar perfil" : "No uhutipī tutoprarī"}</Title>
      <FormContainer>
        <Form onSubmit={submitHandler}>

        <Form.Group controlId='profile_pic' className='mt-3'>
            <Form.Label>{lang === "Português" ? "Selecione uma imagem" : "No Uhutipë Yaiai"}</Form.Label>
            <Form.Control
              type='file'
              // value={image1}
              // required
              onChange={handleImage}>
            </Form.Control>
          </Form.Group>
          
          <Form.Group controlId='name' className=''>
            <Form.Label className='mt-1'>{lang === "Português" ? "Nome" : "Pei wãha"}</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ex: Lucas'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}>
              </Form.Control>
          </Form.Group>


          <Form.Group controlId='village' className=''>
            <Form.Label className='mt-1'>{lang === "Português" ? "Aldeia" : "Xapöno"}</Form.Label>
            <Form.Control
              type='text'
              value={village}
              required
              onChange={(e) => setVillage(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='indigenous_territory' className=''>
            <Form.Label className='mt-1'>{lang === "Português" ? "Território" : "Urihi"}</Form.Label>
            <Form.Control
              type='text'
              value={indigenous_territory}
              required
              onChange={(e) => setIndigenous_territory(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className=''>
            <Form.Label className='mt-1'>{lang === "Português" ? "Email:" : "Wãno hika:"}</Form.Label>
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
            <Button type='submit' variant='warning' className='mt-2' >{lang === "Português" ? "Alterar" : "Yai Taprai"}</Button>
            {/* { isLoading && <Loader />} */}
          </Wrapper>
        </Form>
      </FormContainer>
    </>
  )
}

export default EditUser
