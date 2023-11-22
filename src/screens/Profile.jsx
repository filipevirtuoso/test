import React, { useState, useEffect } from 'react';

// Style
import styled from 'styled-components';

// Icons
import { FaArrowCircleLeft, FaCentercode, FaUser } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';

// Router
import { Link, useLocation } from 'react-router-dom';

// Components
import Message from '../components/Message';
import BackButton from '../components/BackButton';
// Bootstrap
// import Button from 'react-bootstrap/Button';

// RTK
import { useUserDetailQuery } from '../slices/usersSlice';
import { useLogoutMutation } from '../slices/usersSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Others
import BGImage from '../assets/images/profile-bg-22.png';
import Tribal from '../assets/images/tribal2.png';

const HeaderWrapper = styled.section`
  height: 25vh;
  // background-color: #f2f2f2;
  display: flex;
  // flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 1rem;
  border-bottom: 5px solid #444;
  color: #f2f2f2;

  // background-color: #276939;
  background-color: #000;

  background-image: url(${BGImage});
  background-repeat: no-repeat;
  background-size: cover;
  /* opacity: 0.9; */
`;

const LeftWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100%;

  // background-color: red;
`;

const Name = styled.section`
  font-weight: bold;
  font-size: 0.8rem;
`;

const RightWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;

  // background-color: blue;
`;

const Item = styled.p`
  padding: 0;
  margin-bottom: 0.3rem;
  // font-weight: bold;
  line-height: 0.8rem;
  color: #444;
`;

const Strong = styled.span`
  font-weight: bold;
`;

const InfoBG = styled.section`
  background-color: #f2f2f2;
  height: 55%;
  width: 90%;
  border-radius: 10px;
  padding: 0.3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: .rem;
  font-size: 0.7rem;
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 3rem;
  background-color: #000;

  // height: 65vh;
  height: 42vh;
  // background-color: red;
  width: 100%;
`;

const Button = styled.button`
  width: 80%;
  height: 8vh;
  margin-top: 0.5rem;
  border-radius: 0.8rem;

  background-color: #eb6900; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;
const Button2 = styled.button`
  width: 80%;
  height: 8vh;
  margin-top: 0.5rem;
  border-radius: 0.8rem;

  background-color: #eb6900; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;
const Button3 = styled.button`
  width: 80%;
  height: 8vh;
  margin-top: 0.5rem;
  border-radius: 0.8rem;

  background-color: #f44336;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;

const Image = styled.section`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: center;

  background-image: url(${Tribal});
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.8;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;

const FooterText = styled.p`
  padding: 0;
  margin: 0;
  color: #fff;
  display: flex;
  justify-content: center;
`;

const linkStyle = {
  textDecoration: 'none',
  // display: "flex",
  // alignItems: "center",
  width: '100%',
  color: '#f2f2f2',
  padding: '0',
  margin: '0',
  textAlign: 'center',
};

const Profile = () => {
  const { data: user, isLoading, error } = useUserDetailQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const [lang, setLang] = useState('');

  useEffect(() => {
    const lastSelected = JSON.parse(localStorage.getItem('lang') ?? '[]');
    setLang(lastSelected);
  }, []);

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    if (window.confirm('Tem certeza de que deseja sair?')) {
      try {
        const body = {
          token: sessionStorage.getItem('access_token'),
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
        };

        await logoutApiCall(body).unwrap();
        dispatch(logout());
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        ''
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <BackButton page='/' />
          <HeaderWrapper>
            <LeftWrapper>
              {/* <FaUserCircle  size={60} /> */}
              {user.profile_pic ? (
                <ProfilePic src={user.profile_pic} />
              ) : (
                <FaUserCircle size={60} />
              )}
              <Name>{user.name}</Name>
            </LeftWrapper>
            <RightWrapper>
              <InfoBG>
                <Item>
                  <Strong>
                    {lang === 'Português' ? 'RESPONSÁVEL:' : 'Pöuwei:'}
                  </Strong>
                </Item>
                <Item>
                  <Strong>
                    {lang === 'Português' ? 'EMAIL:' : 'Wãno hika:'}
                  </Strong>{' '}
                  {user.email}
                </Item>
                <Item>
                  <Strong>
                    {lang === 'Português' ? 'ALDEIA:' : 'Xapöno:'}
                  </Strong>{' '}
                  {user.village}
                </Item>
                <Item>
                  <Strong>
                    {lang === 'Português' ? 'TERRITÓRIO:' : 'Urihi:'}
                  </Strong>{' '}
                  {user.indigenous_territory}
                </Item>
              </InfoBG>
            </RightWrapper>
          </HeaderWrapper>
          <ContentWrapper>
            <Link
              to='/myevents'
              state={{ pathname: location.pathname }}
              style={linkStyle}
            >
              <Button>
                {lang === 'Português'
                  ? 'Minhas ocorrências'
                  : 'Ipa Të Kuprowei'}
              </Button>
            </Link>
            <Link to='/edituser' style={linkStyle}>
              <Button2>
                {lang === 'Português'
                  ? 'Editar perfil'
                  : 'No uhutipī tutoprarī'}
              </Button2>
            </Link>
            <Button3 onClick={logoutHandler}>
              {lang === 'Português' ? 'Sair' : 'Yaitai'}
            </Button3>
          </ContentWrapper>

          <Image />
          <FooterText>© 2023 HÃMUGÃY. Todos os direitos reservados.</FooterText>
        </>
      )}
    </>
  );
};

export default Profile;
