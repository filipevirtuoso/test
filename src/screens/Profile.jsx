import React from 'react'

// Style
import styled from 'styled-components'

// Icons
import { FaArrowCircleLeft, FaUser } from 'react-icons/fa'
import { FaUserCircle } from 'react-icons/fa'

// Router
import { Link } from 'react-router-dom'

// Components
import Message from '../components/Message'
// Bootstrap
// import Button from 'react-bootstrap/Button';

// RTK
import { useUserDetailQuery } from '../slices/usersSlice';
import { useLogoutMutation } from '../slices/usersSlice'
import { logout } from '../slices/authSlice' 
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// Others
import BGImage from '../assets/images/profilebg.jpg'
import Tribal from '../assets/images/bg-home.png'


const HeaderWrapper = styled.section`
  height: 25vh;
  background-color: #f2f2f2;
  display: flex;
  // flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 1rem;
  border-bottom: 2px solid grey;
  color: #f2f2f2;
  

  background-image: url(${BGImage}); 
  background-repeat: no-repeat;
  background-size: cover;
  // opacity: 0.6;
`

const LeftWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100%;
  
  
  // background-color: red;
`

const Name = styled.section`
  font-weight: bold;
  font-size: .8rem;
`

const RightWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
  
  // background-color: blue;
`


const Item = styled.p`
  padding: 0;
  margin: 0;
  // font-weight: bold;
  line-height: .8rem;
  color: #444;
`

const Strong = styled.span`
  font-weight: bold;
`

const InfoBG = styled.section`
  background-color: #f2f2f2;
  height: 55%;
  width: 90%;
  border-radius: 10px;
  padding: .3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: .rem;
  font-size: .7rem;
`


const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 3rem;

  // height: 65vh;
  height: 45vh;
  // background-color: red;
  width: 100%;
`

const Button = styled.button`
  width: 80%;
  height: 8vh;
  margin-top: .5rem;

  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`
const Button2 = styled.button`
  width: 80%;
  height: 8vh;
  margin-top: .5rem;

  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`
const Button3 = styled.button`
  width: 80%;
  height: 8vh;
  margin-top: .5rem;

  background-color: #f44336;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`

const Image = styled.section`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: center;

  background-image: url(${Tribal}); 
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.3;
`

const ProfilePic = styled.img`
  border-radius: 50%;
  width: 50%;
  height: 100%:
` 

const linkStyle = {
  textDecoration: "none",
  // display: "flex",
  // alignItems: "center",
  color: '#f2f2f2'
};

const Status = styled.span`
  background-color: #008CBA;
`

const Profile = () => {

  const { data: user, isLoading, error} = useUserDetailQuery();
  console.log("USUÁRIO")
  console.log(user)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {

      const body = {
        token: sessionStorage.getItem('access_token'),
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET
      }

      await logoutApiCall(body).unwrap();
      dispatch(logout());
      navigate('/login')
      
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
    { isLoading  ? '' : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
      <>
        <HeaderWrapper>
          <LeftWrapper>
            {/* <FaUserCircle  size={60} /> */}
            {user.profile_pic ? <ProfilePic src={user.profile_pic} /> : <FaUserCircle  size={60} /> }
            <Name>{user.name}</Name>
          </LeftWrapper>
          <RightWrapper>
            <InfoBG>
              <Item><Strong>Responsável:</Strong></Item>
              <Item><Strong>Email:</Strong> {user.email}</Item>
              <Item><Strong>Aldeia:</Strong> {user.village}</Item>
              <Item><Strong>Território:</Strong> {user.indigenous_territory}</Item>
            </InfoBG>
          </RightWrapper>
        </HeaderWrapper>
        <ContentWrapper>
          <Button>Minhas ocorrências</Button>
          <Button2><Link to='/edituser' style={linkStyle}>Editar perfil</Link></Button2>
          <Button3 onClick={logoutHandler}>Sair</Button3>
        </ContentWrapper>
        <Image />
      </>
    )}
  </>
  )
}

export default Profile
