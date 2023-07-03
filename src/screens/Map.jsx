import React from 'react'

// Leaflet
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

// Style
import styled from 'styled-components'
import Tribal from '../assets/images/bg-home.png'

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

const Map = () => {

  const mapContainerStyle = {
    // marginTop: "5rem",
    width: "100%",
    height: "65vh",
  }

  const position = [-14.2400732, -53.1805017]
  return (
    <>
        <TribalBG />
    <MapContainer style={mapContainerStyle}  center={position}  zoom={3}  scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
    <TribalBG />
    </>
  )
}

export default Map