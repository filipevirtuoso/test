import React from 'react'

// Icons
import { FaUnderline, FaUserCircle } from 'react-icons/fa'

//Style
import styled from "styled-components";

// RTK
import { useUserDetailQuery } from '../slices/usersSlice';
import { useGetEventsQuery } from '../slices/eventsApiSlice'

// Router
import { Link } from 'react-router-dom';

// Components
import Message from '../components/Message'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import BGImage from '../assets/images/owl.png'

ChartJS.register(ArcElement, Tooltip, Legend);

const UserInfoWrapper = styled.section`
  display: flex;
  align-items: center;

  height: 10vh;
  width: 100%;
  color: #444;
  padding-left: 2rem;
  border-bottom: 2px solid #444;
  
  
`

const NameWrapper = styled.section`
  display: flex;
  flex-direction: column;
  // background-color: green;
  justify-content: center;
  // align-items: center;
  margin-left: 1rem;
`

const Name = styled.span`
  margin: 0;
  padding: 0;
  font-weight: bold;
  color: #444;
`

const Name2 = styled.span`
  margin: 0;
  padding: 0;
`


const InfoWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #198519;
  // background-color: grey;
  // background-color: #2f663d;
  height: 30vh;
  width: 100%;
  color: #444;
  


`

const LeftWrapper = styled.section`
  width: 50%;
  height: 100%;
  // background-color: red;
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f3f3f3
`

const RightWrapper = styled.section`
  width: 100%;
  height: 80%;
  // color: #f3f3f3
  color: #fff;

  display: flex;
  justify-content: space-evenly;
  margin: 3rem;

`

const Titlee = styled.h2`
  font-size: 1.2rem;
  // margin: 0;
  // margin-bottom: .3rem;
  font-weight: bold;
  // margin-top: .7rem;

  margin-bottom: 0;
`

const Div = styled.div`
  width: 100%;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  // background-color: blue;
  font-size: .9rem;
`

const P = styled.p`
  text-decoration: underline;
  // font-weight:
  // margin: 0;
  padding: 0;
`

const Image = styled.section`
  width: 30px;
  height: 50px;
  position: fixed;
  right: 0;
  background-image: url(${BGImage}); 
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.3;
`

export const chartInfo = {
  datasets: [
    {
      label: 'Ocorrências:',
      data: [1, 2, 1, 1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.9)',
        'rgba(54, 162, 235, 0.9)',
        'rgba(255, 206, 86, 0.9)',
        'rgba(75, 192, 192, 0.9)',
        'rgba(153, 102, 255, 0.9)',
        'rgba(255, 159, 64, 0.9)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        // 'rgba(153, 102, 255, 1)',
        // 'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Red = styled.div`
  width: 10px;
  height: 10px;
  background-color: rgba(255, 99, 132, 0.9);
  color: #f2f2f2;
  font-weight: bold;
`

const Blue = styled.div`
  width: 10px;
  height: 10px;
  background-color: rgba(54, 162, 235, 0.9);
  color: #f2f2f2;
  font-weight: bold;
`

const Yellow = styled.div`
  width: 10px;
  height: 10px;
  background-color: rgba(255, 206, 86, 0.9);
  color: #f2f2f2;
  font-weight: bold;
`

const Green = styled.div`
  width: 10px;
  height: 10px;
  background-color: rgba(75, 192, 192, 0.9);
  color: #f2f2f2;
  font-weight: bold;
`
const DD = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .3rem;

`

const Header = ({ name, indigenous_territory  }) => {

  const { data, isLoading, error} = useUserDetailQuery();

  const {data: events, isLoading: isLoadingEvents, error: eventErrors} = useGetEventsQuery();

  return (
    <>
    { isLoading  ? '': error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
      <>
      <UserInfoWrapper>
        <Link to='/profile'>
          <FaUserCircle color={"green"} size={35} />
        </Link>
        <NameWrapper>
          <Name>{data.name}</Name>
          <Name2>Colaborador</Name2>
        </NameWrapper>
        {/* <Image /> */}
      </UserInfoWrapper>
      <InfoWrapper>


        {/* <LeftWrapper>
        <Titlee>Território</Titlee>
          <p>{data.indigenous_territory}</p>
        </LeftWrapper> */}
        <RightWrapper>
        <Pie data={chartInfo} />
        <Div>
        <Titlee>Território:</Titlee>
        <P>Imbaúbas</P>
        <DD><Red />Desmate</DD>
        <DD><Blue />Garimpo</DD>
        <DD><Yellow />Queimadas</DD>
        <DD><Green />Invasão</DD>
        </Div>
        </RightWrapper>
        {/* <LeftWrapper>
          <Title>Território</Title>
          <p>{data.indigenous_territory}</p>
        </LeftWrapper>
        <RightWrapper>
          <Doughnut data={chartInfo} />;
          <Title>BEM-VINDO(A)</Title>
          <Name2>{data.name}</Name2>

          {isLoadingEvents ? '' : (
            <div>
              <Title>Ocorrências</Title>
              <Name2>{events.length}</Name2>
            </div>
          )}
        </RightWrapper> */}
      </InfoWrapper>
      </>)} 
    </>
  )
}

export default Header