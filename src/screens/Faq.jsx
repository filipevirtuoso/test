import React, {useState, useEffect} from 'react'
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
  width: 3.6rem;
  margin-right: 1rem;
  margin-left: 1rem;
  margin-bottom: .5rem;
`

const LogosWrapper = styled.section`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;;
  margin-top: 1rem;
  flex-direction: column;
`

const FooterText = styled.p`
  padding: 0;
  margin: 0;
  color: #fff;
  display: flex;
  justify-content: center;
  font-size: .9rem;
`

const DirectionWrapper = styled.section`
  display: flex;
`

const Faq = () => {

  const [lang, setLang] = useState('')


  useEffect(() => {
    const lastSelected = JSON.parse(
      localStorage.getItem("lang") ?? "[]"
    );
    setLang(lastSelected);
  }, [])

  
  return (
    <>
      <BackButton page="/" />
      {/* <Image /> */}
      <Div>
      <Title>{lang === "Português" ? "FAQ - Perguntas frequentes" : "Wãrii yaimoü"}</Title>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{lang === "Português" ? "Como abrir uma ocorrência?" : "Wetinaha Karoprai Tërë?"}</Accordion.Header>
          <Accordion.Body>
          {lang === "Português" ? "No aplicativo, você encontrará uma opção para Registrar Ocorrência. Clique nessa opção e siga as instruções para adicionar detalhes da ocorrência, incluindo fotos e coordenadas GPS." : "Aplicativo Aha, Watë Ha Tararini Kuprariowei Watë Taai Watë Ha Hutikitarënë Nosiha Tërënë Watë Pewaha Taaixoape GPS Ani Wa Taeprapë Watë Takei."}

          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          {/* <Accordion.Header>Vou receber notificações sobre as ocorrências que registrei?</Accordion.Header> */}
          <Accordion.Header>{lang === "Português" ? "Vou receber notificações sobre as ocorrências que registrei?" : "Pei yatë Pëwãhã Tëapë Tëpërë Kuprarionowei?"}</Accordion.Header>
          <Accordion.Body>
          {lang === "Português" ? "Sim, o aplicativo enviará notificações sobre as ocorrências que você registrou e possíveis atualizações das ações tomadas pelos órgãos responsáveis." : "Awei, Aplicativo Ani Tepë Wahaximipë Tëpëre Kuprariõnowei Watëpë Wãha Re Teararenowei Ai Tutëtutë Hikari Kuprouwei órgãos Penikãi Ximipë."}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>{lang === "Português" ? "O que são os pontos no mapa interativo do aplicativo?" : "Mapa Ahami Exi Tëpëwãha Tepërë Katitiowei?"}</Accordion.Header>
          <Accordion.Body>
          {lang === "Português" ? "Os pontos no mapa interativo representam as áreas afetadas pelas ocorrências registradas. Eles ajudam os gestores a visualizar e monitorar a situação em tempo real." : "Mapa interativo Aha Katitiowei Tëpë Wãhãwahimiopë Tëpërë Kuprariõnowei Gestores Pë Payëripramopë Tepë Miëhëtëhë Yaimamo Yëopë Tutë Të Wakaraha."}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>{lang === "Português" ? "Quem são os gestores?" :  "Wëti Këpë gestores?" }</Accordion.Header>
          <Accordion.Body>
        {lang === "Portuhguês" ? "Os gestores são os responsáveis por acompanhar e gerenciar as ocorrências registradas por você. Eles têm acesso ao painel completo de gerenciamento de ocorrências." : "Kama Tëri Pëni Të Pë Miporaheni Watë Waha Nohi Rë Wëyëkenowei Ihi Të Rë Kui Kama Tëri Pëni Të Pë Miporaheni Të Rii Kai Hikarimopehe. Të Pë Wa Hano Rë Wëyëowei Të Pë Mayo Nosi Hikari Tëpou Haikia Waikirahei."}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>{lang === "Português" ? "Como posso editar minhas informações no aplicativo?" : "Wetinãha Yãai Kuopë Ipa Tëpë Waharé Kui aplicativo aha?"}</Accordion.Header>
          <Accordion.Body>
          {lang === "Português" ? "Para editar suas informações, clique no ícone do boneco, localizado no canto superior esquerdo. Em seguida, selecione a opção Editar Perfil. Lá, você poderá atualizar suas informações conforme necessário. Lembre-se de salvar as alterações antes de sair da página." : "Wano Hé Wa Tëpë Oni Tapë, Haihai Të Maxirë Kureha Ihiru A No Uhutipi Ta Hutikiki Ihitë Nosiki Ha Pei Wano Uhutipirë Kuowei Të Ta Yai Rë. Iha Ehë Wano wa Të Pë Tutoprapëtëpë Puhio Pë Naha. Puhi Ta Xatiiko, Wa Haiwei Tëhë, Tëpë Oni Maprou Mao Pë Tëpë Ta Tutoprai."}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>{lang === "Português" ? "Encontrei um problema técnico no aplicativo. Como posso reportá-lo?" : "Wariaitõ técnico Yatë Taeprarema aplicativo aha. WëtinahaYatë Wãha Ximië Kuopë?"}</Accordion.Header>
          <Accordion.Body>
          {lang === "Português" ? "Se você encontrar um problema técnico no aplicativo, encaminhe um email para monitoramento@conafer.org.br. Sua contribuição é importante para aprimorarmos a experiência de uso do aplicativo." : "Wãrihito técnico Aplicativo Aha Watë Tapirai Tehë, E-mail Wa Ximië monitoramento@conafer.org.br Wa Payëriowei Tëhë importante Të Yai aplicativo a Katehepropë a Hupamopë."}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>{lang === "Português" ? "Preciso entrar em contato com a CONAFER!" : "Conafer Íha Wawa Hai Xoaopë"}</Accordion.Header>
          <Accordion.Body>
          {lang === "Português" ? "Email: monitoramento@conafer.org.br" : "Email Waximipë: monitoramento@conafer.org.br Pë Watëkãi liga Mapë...."}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <LogosWrapper>
        <DirectionWrapper>
          <Img src={Conafer} />
          <Img src={Terra} />
        </DirectionWrapper>
        {/* <FooterText>© 2023 HÃMUGÃY. Todos os direitos reservados.</FooterText> */}
      </LogosWrapper>
  
      </Div>
      
      {/* <Image /> */}
    </>
  )
}

export default Faq
