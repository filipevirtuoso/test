import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import { useLocation } from "react-router-dom";

import styled from 'styled-components'

import { FaArrowCircleLeft, FaEraser, FaCamera } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Form }from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import {  FaDraftingCompass } from "react-icons/fa";
import BackButton from '../components/BackButton';

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { Draw } from "leaflet-draw";

import { useEditEventMutation } from '../slices/eventsApiSlice'
import { useGetEventDetailsQuery } from '../slices/eventsApiSlice';

import { toast } from 'react-toastify'

import { useUserDetailQuery } from '../slices/usersSlice';

const Title = styled.h2`
  text-align: center;
  margin-top: .5rem;
  font-size: 1.3rem;
  color: #C95A00;

`

const FormContainer = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: flex-start;
  background-color: #000;
  color: #fff;
`
const ButtonWidth = styled(Button)`
  width: 100%;

`

const Div = styled.div`
  // height: 400px;
`

const InpButton  = styled.button`
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  outline: 0;
  border: 0;
  border: 1px solid #444;

  background-repeat: no-repeat;
  background-size: cover;

`

const Wrapper = styled.div`
  display: flex;
  justify-content: center

`

const InputWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
`

const MyButton = styled.button`
  width: 100%;
  height: 8vh;
  margin-top: .5rem;

  background-color: #EB6900; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
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

const EditEvent = () => {

  const location = useLocation()
  const { id } = location.state;

    const [complaint, setComplaint] = useState('')
    const [description, setDescription] = useState('')
    const [date_occurrence, setDateOccurrence] = useState('')
    const [time_occurrence, setTimeOccurrence] = useState('')
    const [coordinates, setCoordinates] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')

    const [showMap, setShowMap] = useState(0);
    const center = [-19.5124837, -42.5636109];


    const [editEvent, { isLoading }] = useEditEventMutation()
    const navigate = useNavigate()

    const { data, isLoading: isLoadingUser, error } = useUserDetailQuery();
    const { data: event, isLoading: isLoadingEvent, error: errorEvent } = useGetEventDetailsQuery(id);


    useEffect(() => {
      if(event) {
        setComplaint(event.complaint)
        setDescription(event.description)
        setDateOccurrence(event.date_occurrence)
        setTimeOccurrence(event.time_occurrence)
        setCoordinates(event.coordinates)
      }
    }, event)


    const [mapData, setMapData] = useState([])

    const hiddenFileInput = React.useRef(null);
    const hiddenFileInput2 = React.useRef(null);
    const hiddenFileInput3 = React.useRef(null);


    const handleClick = event => {
      hiddenFileInput.current.click();
    };


    const handleClick2 = event => {
      hiddenFileInput2.current.click();
    };

    const handleClick3 = event => {
      hiddenFileInput3.current.click();
    };

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
      eventData.append("image2", image2)
      eventData.append("image3", image3)
      eventData.append("teste", "teste")
      eventData.append("user", data.id)
      eventData.append("id", id)
      eventData.append("coordinates", coordinates)

      try {
        toast.info('Enviando')
        const res = await editEvent(eventData).unwrap();
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

    const handleImage2 = (e) => {
      setImage2(e.target.files[0])
    }

    const handleImage3 = (e) => {
      setImage3(e.target.files[0])
    }

    const saveMarkers = (newMarkerCoords) => {
      setCoordinates(newMarkerCoords)
      setShowMap(!showMap)
    };

    return (
      <>
        {/* <Title>Editar ocorrência</Title> */}
        {/* <BackButton page="/myevents" /> */}
        <FormContainer>
          <Title>Editar ocorrência</Title>
          <Form onSubmit={submitHandler}>


          <InputWrapper>
            <Form.Group controlId='image1' className='mt-3'>
              {/* <Form.Label>Selecione uma imagem</Form.Label> */}
              <InpButton onClick={handleClick} >
                {/* <FaCamera /> */}
                {image1 ? '1' : <FaCamera />}
              </InpButton >
              <Form.Control
                ref={hiddenFileInput}
                style={{display:'none'}}
                type='file'
                onChange={handleImage}>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='image2' className='mt-3'>
              {/* <Form.Label>Selecione uma imagem</Form.Label> */}
              <InpButton onClick={handleClick2}>
              {/* <FaCamera /> */}
              {image2 ? '2' : <FaCamera />}
              </InpButton>
              <Form.Control
                ref={hiddenFileInput2}
                style={{display:'none'}}
                type='file'
                onChange={handleImage2}>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='image3' className='mt-3'>
              {/* <Form.Label>Selecione uma imagem</Form.Label> */}
              <InpButton onClick={handleClick3}>
              {/* <FaCamera /> */}
              {image3 ? '3' : <FaCamera />}
              </InpButton>
              <Form.Control
                ref={hiddenFileInput3}
                style={{display:'none'}}
                type='file'
                onChange={handleImage3}>
              </Form.Control>
            </Form.Group>
            </InputWrapper>



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
            center={{ lat: -7.6029958, lng: -58.2951507 }}
            zoom={4}
            scrollWheelZoom={false}
            style={{ height: "50vh" }}
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
                <option>Selecione uma opção</option>
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
              <MyButton type='submit' variant='success' className='mt-4 mb-5' >Enviar</MyButton>
              {/* { isLoading && <Loader />} */}
            </Wrapper>
          </Form>
        </FormContainer>
      </>






  )
}

export default EditEvent