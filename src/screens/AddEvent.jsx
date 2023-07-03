import React, { useState } from 'react'
import styled from 'styled-components'
import { FaArrowCircleLeft, FaEraser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Form }from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import {  FaDraftingCompass } from "react-icons/fa";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { Draw } from "leaflet-draw";

import { useAddEventMutation } from '../slices/eventsApiSlice'

import { toast } from 'react-toastify'

import { useUserDetailQuery } from '../slices/usersSlice';

const Title = styled.h2`
  text-align: center;
  margin-top: 1rem;
  font-size: 1.3rem;
`

const FormContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: flex-start;
`
const ButtonWidth = styled(Button)`
  width: 100%;
  
`

const Div = styled.div`
  // height: 400px;
`

const Input = styled.input`
  width: 80%;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center

  
`

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

function MyComponent({ saveMarkers }) {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      L.marker([lat, lng], { icon }).addTo(map);
      saveMarkers([lat, lng]);
    }
  });
  return null;
}

const AddEvent = () => {


  const [complaint, setComplaint] = useState('')
  const [description, setDescription] = useState('')
  const [date_occurrence, setDateOccurrence] = useState('')
  const [time_occurrence, setTimeOccurrence] = useState('')
  const [coordinates, setCoordinates] = useState('')
  const [image1, setImage1] = useState('')

  const [showMap, setShowMap] = useState(0);
  const center = [-19.5124837, -42.5636109];


  const [addEvent, { isLoading }] = useAddEventMutation()
  const navigate = useNavigate()

  const { data, isLoading: isLoadingUser, error } = useUserDetailQuery();


  const [mapData, setMapData] = useState([])


  const handleMap = () => {
    setShowMap(!showMap);
    setCoordinates('')
  };

  const removeMarkedArea = () => {
    setShowMap(!showMap);
    setCoordinates('')
  };



  const submitHandler = async (e) => {
    e.preventDefault()


    let eventData = new FormData()

    eventData.append("complaint", complaint)
    eventData.append("description", description)
    eventData.append("date_occurrence", date_occurrence)
    eventData.append("time_occurrence", time_occurrence)
    eventData.append("image1", image1)
    eventData.append("teste", "teste")
    eventData.append("user", data.id)
    eventData.append("coordinates", coordinates)

    for (const value of eventData.values()) {
      console.log("AQUi")
      console.log(value);
    }

    try {
      const res = await addEvent(eventData).unwrap();
      // dispatch(setCredentials({...res, }))
      toast.success('Ocorrência adicionada com sucesso!')
      navigate('/')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const handleImage = (e) => {
    setImage1(e.target.files[0])
  }



  const saveMarkers = (newMarkerCoords) => {
    console.log(newMarkerCoords)
    setCoordinates(newMarkerCoords)
    // let markerInfo = [...markerInfo, newMarkerCoords];
    // console.log(markerInfo)
    
    // setMapData((prevState) => ({ ...prevState, markerInfo }));
  };

  return (
    <>
      <Title>Abrir ocorrência</Title>
      <FormContainer>
        <Form onSubmit={submitHandler}>


          <Form.Group controlId='image1' className='mt-3'>
            <Form.Label>Selecione uma imagem</Form.Label>
            <Form.Control
              type='file'
              // value={image1}
              // required
              onChange={handleImage}>
            </Form.Control>
          </Form.Group>




          <Form.Group controlId='coordinates' className=''>
            <Form.Label>Coordenadas</Form.Label>
            <Form.Control
              type='text'
              value={coordinates}
              placeholder="Ex: -15.7801, -47.9292"
              minLength="1"
              required
              readOnly
              onChange={(e) => setCoordinates(e.target.value)}>
            </Form.Control>
          </Form.Group>
          {/* <Div> */}
            <ButtonWidth
              block
              color="info"
              variant="primary"
              className="mt-3 mb-3"
              onClick={handleMap}
            >
              <FaDraftingCompass /> Marcar área
            </ButtonWidth>
            {coordinates && (
                  // <Col lg="12" className="mb-3">
                    <ButtonWidth
                    
                      block
                      variant="danger"
                      className="mt-1"
                      onClick={removeMarkedArea}
                    >
                      <FaEraser /> Limpar marcação
                    </ButtonWidth>
                  // </Col>
                )}
          {/* </Div> */}
          {!!showMap && (
                  <Col lg="12">
                    <Form.Group>
                      {/* <Div id="map"></Div> */}
                      <Div className="mt-3">
                      <MapContainer
          className="Map"
          center={{ lat: 40.7, lng: -74 }}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "30vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyComponent saveMarkers={saveMarkers} />
        </MapContainer>
        </Div>
                    </Form.Group>
                  </Col>
            )}



          <Form.Group controlId='complaint'>
            <Form.Label className="mt-3">Tipo</Form.Label>
            <Form.Select
              type='select'
              value={complaint}
              required
              onChange={(e) => setComplaint(e.target.value)}>
              <option>Desmate</option>
              <option>Grilagem</option>
              <option>Invasão</option>
              <option>Garimpo</option>
              <option>Queimadas</option>
              <option>Outros</option>
            </Form.Select>
          </Form.Group>

        
          

          <Form.Group controlId='description' className='mt-3'>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Informações sobre a ocorrência'
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='date_occurrence' className='mt-3'>
            <Form.Label>Informe a data</Form.Label>
            <Form.Control
              type='date'
              value={date_occurrence}
              required
              onChange={(e) => setDateOccurrence(e.target.value)}>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='time_occurrence' className=''>
            <Form.Label>Informe o horário</Form.Label>
            <Form.Control
              type='time'
              value={time_occurrence}
              required
              onChange={(e) => setTimeOccurrence(e.target.value)}>
            </Form.Control>
          </Form.Group>


          <Wrapper>
            <Button type='submit' variant='success' className='mt-2' >Enviar</Button>
            {/* { isLoading && <Loader />} */}
          </Wrapper>
        </Form>
      </FormContainer>
    </>
  )
}

export default AddEvent
