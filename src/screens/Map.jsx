import React from 'react'

// Leaflet
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet";

import Loader from '../components/Loader';
import Message from '../components/Message';


// Style
import styled from 'styled-components'
import Tribal from '../assets/images/bg-home.png'

// RTK
import { useGetEventsQuery } from '../slices/eventsApiSlice'

// Icons
import PinIcon from '../assets/images/map-pin-solid.svg'

const Container = styled.section`
  width: 100%;
  height: 100%;
`


const TribalBG = styled.section`
  margin-top: .6rem;
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: center;

  background-image: url(${Tribal}); 
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.3;
`

const P = styled.div`
  margin: 0;
  padding: 0;

`

const Map = () => {

  const Pin = L.icon({ iconUrl: PinIcon, iconSize: [25, 25], MarkerColor: 'red' });
  const { data: response, isLoading, error } = useGetEventsQuery();

  console.log(response)

  const mapContainerStyle = {
    // marginTop: "5rem",
    width: "100%",
    height: "65vh",
  }

  const position = [-14.2400732, -53.1805017]
  return (
    <>
      { isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
          <TribalBG />
          <MapContainer style={mapContainerStyle}  center={position}  zoom={3}  scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {response.map((event) => (
              <Marker position={event.coordinates.split(',')} icon={Pin}>
                <Popup>
                  <P>{event.description}</P>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <TribalBG />
        </>
      )}
    </>
  )
}

export default Map