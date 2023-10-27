import { useState, useEffect } from 'react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/images/llogo.png'
import Logo2 from '../assets/images/logo2.png'
import BGImage from '../assets/images/tribal.png'
import Tribal from '../assets/images/tribal2.png'
import Conafer from '../assets/images/conafer-logo.webp'
import Terra from '../assets/images/terra_bank.webp'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'


import { Form, Button, Row, Col } from 'react-bootstrap'
import { setCacheNameDetails } from 'workbox-core'

import { useLoginMutation } from '../slices/usersSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const LogoWrapper = styled.img`
  height: 45vh;
  width: 100%;
  // background-image: url(${Logo2}); 
  // background-repeat: no-repeat;
  // background-size: cover
  object-fit: cover;
`

// const InfoWrapper = styled.section`
//   width: 100%;   
//   height: 5vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: #444;
//   font-size: 1.6rem;
//   font-weight: bold;
//   font-family: 'Patrick Hand', cursive;
//   background-color: #f2f2f2;

//   // border-top-left-radius: 20px;
//   // border-top-right-radius: 20px;

//   position: absolute;
//   top: 17rem;


// `

const Image = styled.section`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  // margin-top: -.9rem;

  background-image: url(${BGImage}); 
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.9;
`

const FormContainer = styled.section`
  height: 27vh;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  justify-content: flex-end;
  margin-top: 2rem;
  color: #fff;
  /* background-color: red; */
`


const Input = styled.input`
  width: 80%;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: .3rem;
`

const Img = styled.img`
  width: 4rem;
  margin-right: 1rem;
  margin-left: 1rem;
`

const LogosWrapper = styled.section`
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: end;
  /* margin-top: rem; */
`

const Link2 = styled.a`
  text-decoration: none;
  color: #fff;
  /* color: #b0850e; */
  font-weight: bold;

`

const TribalBG = styled.section`
  width: 100%;
  height: 5vh;
  display: flex;
  margin-top: 1.4rem;



  background-image: url(${Tribal}); 
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.9;
`

const OrangeButton = styled.button`
  border: none;
  border-radius: .5rem;
  background-color: #FF7009;
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
      <LogoWrapper src={Logo} />
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
            <Form.Label className="mt-2">Senha</Form.Label>
            <Form.Control
              type='password'
              placeholder='Informe sua senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Wrapper>
            <Button type='submit' variant='success' className='mt-3 w-50' disable={isLoading}>Entrar</Button>
            <OrangeButton variant='warning' className='mt-3 w-50' disable={isLoading}><Link2 target="_blank" href="https://conafer.org.br/plataforma-hamugay-cadastro/">Cadastre-se</Link2></OrangeButton>
            {/* { isLoading && <Loader />} */}
          </Wrapper>
        </Form>
      </FormContainer>
      <LogosWrapper>
        <Img src={Conafer} />
        <Img src={Terra} />
      </LogosWrapper>
      <TribalBG />
    </>
  )
}

export default Login
