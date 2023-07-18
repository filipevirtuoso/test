import { useState, useEffect } from 'react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/images/logo.png'
import BGImage from '../assets/images/login.png'
import Tribal from '../assets/images/bg-home.png'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'

import { Form, Button, Row, Col } from 'react-bootstrap'
import { setCacheNameDetails } from 'workbox-core'

import { useLoginMutation } from '../slices/usersSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const LogoWrapper = styled.section`
  height: 45vh;
  width: 100%;
  // background-color: red;
  background-image: url(${Logo}); 
  background-repeat: no-repeat;
  background-size: contain;
  border-bottom-radius: 20px;

  // border-bottom-left-radius: 20px;
  // border-bottom-right-radius: 20px;
  // border-top-right-radius: 50px;
`

const InfoWrapper = styled.section`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444;
  font-size: 1.6rem;
  font-weight: bold;
  font-family: 'Patrick Hand', cursive;
  background-color: #f2f2f2;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  position: absolute;
  top: 17rem;


`

const Image = styled.section`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;

  background-image: url(${BGImage}); 
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.5;
`

const FormContainer = styled.section`
  height: 35vh;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  justify-content: center;
`


const Input = styled.input`
  width: 80%;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center
`

const TribalBG = styled.section`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: center;

  background-image: url(${Tribal}); 
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.3;
`

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)


  // const { search } = useLocation() 
  // const sp = new URLSearchParams(search)
  // const redirect = sp.get('redirect') || '/'
  // sp.get('redirect')

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/')
  //   } else {
  //     navigate('/login')
  //   }
  // }, [userInfo,  navigate])


  const submitHandler = async (e) => {
    e.preventDefault()

    const userData = {
      grant_type: "password",
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      username,
      password,
    }



    try {
      const res = await login(userData).unwrap();
      dispatch(setCredentials({ ...res, }))
      navigate('/')
    } catch (error) {
      // console.log(error)
      toast.error(error?.data?.error_description || error.data.error)
    }
  }

  return (
    <>
      <LogoWrapper />
      {/* <InfoWrapper> 
        Monitoramento Territorial HÃMUGÃY
      </InfoWrapper> */}
      <Image />
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='username'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Digite seu email'
              value={username}
              onChange={(e) => setUsername(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type='password'
              placeholder='Informe sua senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Wrapper>
            <Button type='submit' variant='success' className='mt-2' disable={isLoading}>Entrar</Button>
            {/* { isLoading && <Loader />} */}
          </Wrapper>
        </Form>
      </FormContainer>
      <TribalBG />
    </>
  )
}

export default Login
