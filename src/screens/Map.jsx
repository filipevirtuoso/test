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
import PinIcon from '../assets/images/map/map-pin-solid.svg'
import FireIcon from '../assets/images/map/fire.png'
import DeforestationIcon from '../assets/images/map/log.png'
import LandGrabbingIcon from '../assets/images/map/thief.png'
import InvasionIcon from '../assets/images/map/invasion.png'
import MiningIcon from '../assets/images/map/mining.png'
import OtherIcon from '../assets/images/map/other.png'


// Components
import BackButton from '../components/BackButton';

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

  const Pin = L.icon({ iconUrl: PinIcon, iconSize: [25, 25]});
  const Fire = L.icon({ iconUrl: FireIcon, iconSize: [25, 25]});
  const Deforestation = L.icon({ iconUrl: DeforestationIcon, iconSize: [25, 25]});
  const LandGrabbing = L.icon({ iconUrl: LandGrabbingIcon, iconSize: [25, 25]});
  const Invasion = L.icon({ iconUrl: InvasionIcon, iconSize: [25, 25]});
  const Mining = L.icon({ iconUrl: MiningIcon, iconSize: [25, 25]});
  const Other = L.icon({ iconUrl: OtherIcon, iconSize: [25, 25]});




  const { data: response, isLoading, error } = useGetEventsQuery();

  const mapContainerStyle = {
    // marginTop: "5rem",
    width: "100%",
    height: "85vh",
  }

  const position = [-14.2400732, -53.1805017]
  return (
    <>
      { isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
          <BackButton page="/" />
          {/* <TribalBG /> */}
          <MapContainer style={mapContainerStyle}  center={position}  zoom={3}  scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {response.map((event) => (
              <Marker position={event.coordinates.split(',')} icon={event.complaint === "Desmate" ? Deforestation : event.complaint === "Queimadas" ? Fire : event.complaint === "Grilagem" ? LandGrabbing : event.complaint === "Invasão" ? Invasion : event.complaint === "Garimpo" ? Mining : Other } key={event.id}>
                {/* <Popup>
                  <P>{event.description}</P>
                </Popup> */}
              </Marker>
            ))}
          </MapContainer>
          {/* <TribalBG /> */}
        </>
      )}
    </>
  )
}

export default Map