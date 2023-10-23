import React from 'react'
import styled from 'styled-components'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import BGImage from '../assets/images/login.png'

import Conafer from '../assets/images/conafer-logo.webp'
import Terra from '../assets/images/terra_bank.webp'
import Accordion from 'react-bootstrap/Accordion';

import BackButton from '../components/BackButton'

const Image = styled.section`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;

  background-image: url(${BGImage}); 
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.2;
`

const Title = styled.h2`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  color: #C95A00;
  font-family: "Arboria-Bold";
`

const Div = styled.div`
  height: 95vh;
`

const Img = styled.img`
  width: 5rem;
  margin-right: 1rem;
  margin-left: 1rem;
`

const LogosWrapper = styled.section`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: start;
  margin-top: 1rem;
`

const Faq = () => {
  return (
    <>
      <BackButton page="/" />
      {/* <Image /> */}
      <Div>
      <Title>FAQ - Perguntas frequentes</Title>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Como abrir uma ocorrência?</Accordion.Header>
          <Accordion.Body>
          No aplicativo, você encontrará uma opção para "Registrar Ocorrência". 
          Clique nessa opção e siga as instruções para adicionar detalhes da ocorrência, 
          incluindo fotos e coordenadas GPS.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Vou receber notificações sobre as ocorrências que registrei?</Accordion.Header>
          <Accordion.Body>
          Sim, o aplicativo enviará notificações sobre as ocorrências que você registrou e possíveis atualizações das ações tomadas pelos órgãos responsáveis.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>O que são os "pontos" no mapa interativo do aplicativo?</Accordion.Header>
          <Accordion.Body>
          Os "pontos" no mapa interativo representam as áreas afetadas pelas ocorrências registradas. 
          Eles ajudam os gestores a visualizar e monitorar a situação em tempo real.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Quem são os "gestores"?</Accordion.Header>
          <Accordion.Body>
          Os gestores são os responsáveis por acompanhar e gerenciar as ocorrências registradas por você. Eles têm acesso ao painel completo de gerenciamento de ocorrências.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Como posso editar minhas informações no aplicativo?</Accordion.Header>
          <Accordion.Body>
          Para editar suas informações, clique no ícone do boneco, 
          localizado no canto superior esquerdo. Em seguida, selecione a opção "Editar Perfil". 
          Lá, você poderá atualizar suas informações conforme necessário. Lembre-se de salvar as alterações antes de sair da página.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Encontrei um problema técnico no aplicativo. Como posso reportá-lo?</Accordion.Header>
          <Accordion.Body>
          Se você encontrar um problema técnico no aplicativo, 
          encaminhe um email para monitoramento@conafer.org.br. 
          Sua contribuição é importante para aprimorarmos a experiência de uso do aplicativo.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>Preciso entrar em contato com a CONAFER!</Accordion.Header>
          <Accordion.Body>
          Email: monitoramento@conafer.org.br
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <LogosWrapper>
        <Img src={Conafer} />
        <Img src={Terra} />
      </LogosWrapper>
      </Div>

      {/* <Image /> */}
    </>
  )
}

export default Faq
