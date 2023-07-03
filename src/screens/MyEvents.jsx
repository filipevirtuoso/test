import React from 'react'
import styled from 'styled-components'

import { useGetUserEventsQuery } from '../slices/eventsApiSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';

import { FaEdit } from 'react-icons/fa'

import { Link } from 'react-router-dom'

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Title = styled.h2`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  text-decoration: underline;
`

const linkStyle = {
  textDecoration: "none",
  // display: "flex",
  // alignItems: "center",
  color: '#444'
};

const MyEvents = () => {

  const { data: events, isLoading, error } = useGetUserEventsQuery();
  console.log(events)

  return (
    <>
    <Title>Minhas ocorrências</Title>

    { isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <Table striped borered hover responsive className='table-sm'>

        <thead>
          <tr>
            <th>Tipo</th>
            <th>Data</th>
            <th>Descrição</th>
            

            <th>Ações</th>
          </tr>
        </thead>


        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.complaint}</td>
              <td>{event.date_occurrence.split('-').reverse().join('/')}</td>
              <td>{event.description}</td>
              <td><Link to='/editevent' style={linkStyle} state={{id: event.id}}><FaEdit /></Link></td>
            </tr>
          ) )}
        </tbody>


      </Table>
    )}
    </>
  )
}

export default MyEvents