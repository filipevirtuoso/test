import React from 'react'

// Style
import styled from 'styled-components'

// Icons
import { FaArrowCircleLeft } from 'react-icons/fa'

// Router
import { Link } from 'react-router-dom'

const UserInfoWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 10vh;
  width: 100%;
  color: #444;
  padding-left: 2rem;
  border-bottom: 2px solid #444; 
  // background-color: #2f663d;
  background-color: #EB6900;
`

const NameWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`

const Text = styled.span`
  margin: 0;
  padding: 0;
  font-weight: bold;
  // color: #444;
  color: #fff;
`

const linkStyle = {
  textDecoration: "none",
};

const BackButton = ({page}) => {
  return (
    <Link to={page} style={linkStyle} >
      <UserInfoWrapper>
        <FaArrowCircleLeft color={"white"} size={35} />
        <NameWrapper>
          <Text>Voltar</Text>
        </NameWrapper>
      </UserInfoWrapper>
    </Link>
  )
}

export default BackButton