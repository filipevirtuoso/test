import React from 'react'

// Leaflet
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

// Style
import styled from 'styled-components'

const Container = styled.section`
  width: 100%;
  height: 100%;
`

const Map = () => {

  const mapContainerStyle = {
    width: "100%",
    height: "80vh",
  }

  const position = [-14.2400732, -53.1805017]
  return (
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
  )
}

export default Map