import React from 'react'

// Style
import styled from 'styled-components'

// Icons
import { FaUserCircle } from 'react-icons/fa'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { AiFillHome } from "react-icons/ai";
import { FaExclamationTriangle, FaPlus, FaQuestion, FaListUl, FaHandsHelping, FaSearch } from 'react-icons/fa'

// Router
import {Link} from 'react-router-dom'

const Wrapper = styled.section`
  // background-color: #198519;
  // background: rgb(24,113,24);
  // background: linear-gradient(90deg, rgba(24,113,24,1) 43%, rgba(26,158,53,1) 100%);
  background-color: #58AE3A;
  width: 100%;
  height: 7vh;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 999999;
  `

const Button = styled.button`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  border: none;
  position: absolute;
  bottom: 15px;
`

const Icon = styled(AiFillHome)`
  background-color: #58AE3A;
  padding: .3rem;
  border-radius: 50%;
`

const Div = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: .5rem;
  
`

const Footer = () => {
  return (
    <Wrapper>
      <Div>
        <Link to='/addevent'>
          <FaPlus  color={"#f2f2f2"} size={20} />
        </Link>
        <Link to='/map'>
          <FaMapMarkerAlt  color={"#f2f2f2"} size={20} />
        </Link>
      </Div>
      <Div>
        <Link to='/'>
        <FaSearch  color={"#f2f2f2"} size={20} />
        </Link>
        <Link to='/profile'>
        <FaUserCircle color={"#f2f2f2"} size={20} />
        </Link>
      </Div>
      <Button>
        <Link to='/'>
        <Icon color={"#f2f2f2"} size={40} />
        </Link>
      </Button>
    </Wrapper>
  )
}

export default Footer