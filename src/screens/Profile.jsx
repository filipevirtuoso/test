import React from 'react'

// Style
import styled from 'styled-components'

// Icons
import { FaArrowCircleLeft, FaUser } from 'react-icons/fa'
import { FaUserCircle } from 'react-icons/fa'

// Router
import { Link } from 'react-router-dom'

const HeaderWrapper = styled.section`
  height: 25vh;
  background-color: #f2f2f2;
  display: flex;
  // flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 1rem;
  border-bottom: 2px solid grey;
`

const LeftWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
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
  width: 50%;
  height: 100%;
  
  // background-color: blue;
`

const Wrapper = styled.section`
  width: 30%;
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  // margin-top: .5rem;
`

const Item = styled.span`
  padding: 0;
  margin: 0;
  font-weight: bold;
  line-height: .5rem;
`

const InfoLabel = styled.p`
  padding: 0;
  margin: 0;
`




const Profile = () => {
  return (
    <HeaderWrapper>
      <LeftWrapper>
        <FaUserCircle  size={60} />
        <Name>Filipe Virtuoso</Name>
      </LeftWrapper>
      <RightWrapper>
        <Wrapper><Item>Gestor:</Item> Lucas</Wrapper>
        <Wrapper><Item>Gestor:</Item> Lucas</Wrapper>
        <Wrapper><Item>Gestor:</Item> Lucas</Wrapper>
        <Wrapper><Item>Gestor:</Item> Lucas</Wrapper>

      </RightWrapper>
    </HeaderWrapper>
  )
}

export default Profile
