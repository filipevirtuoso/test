import React from 'react'
import { VoiceRecorder } from 'react-voice-recorder-player';

import { styled } from 'styled-components'

import { useAddHelpMutation, useGetHelpQuery } from '../slices/eventsApiSlice';
import { useUserDetailQuery } from '../slices/usersSlice';

import { toast } from 'react-toastify'

import Loader from '../components/Loader';
import Message from '../components/Message';

import Table from 'react-bootstrap/Table';

import moment from 'moment';

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  padding-top: 1rem;
  text-align: center;
`

const Status = styled.span`
  background-color: ${props => 
    props.status === 'Em análise' ? 'yellow' 
    : props.status === 'Concluída' ? 'green'
    : props.status === 'Cancelada' ? 'red' : ''};
  color: #444;
  border-radius: 5px;
  padding: .2rem;
`




const Call = () => {

  const [addHelp, { isLoading }] = useAddHelpMutation()
  const { data, isLoading: isLoadingUser, error } = useUserDetailQuery();
  const {data: helps, isLoading: isLoadingHelp, error: errorHelp, refetch} = useGetHelpQuery();

  console.log("HELP")
  console.log(helps)


  const submitAudio = async (audioData) => {

    console.log("AQUI")
    console.log(audioData.type)

    console.log(data.id)

    // const url = URL.createObjectURL(blob);

    const file = new File([audioData], 'message')

    console.log(file)

    let helpData = new FormData()


    helpData.append("user", data.id)
    helpData.append("audio", file, 'audio.wav')
    helpData.append("title", "teste")


    try {
      const res = await addHelp(helpData).unwrap();
      refetch();
      // dispatch(setCredentials({...res, }))
      toast.success('Áudio enviado com sucesso!')
      // refetch();
      // navigate('/profile')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }


  return (
    <Wrapper>
      <h5>Envie um áudio descrevendo o problema que entraremos em contato.</h5>
      <VoiceRecorder onRecordingEnd={submitAudio}  />
      

      { isLoadingHelp ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <Table striped borered hover responsive className='table-sm mt-4'>

        <thead>
          <tr>
            <th>Data</th>
            <th>Horário</th>
            <th>Status</th>
          </tr>
        </thead>


        <tbody>
          {helps.slice(0).reverse().map((help, index) => index < 5 && (
            <tr key={help.id}>
              {/* <td>{help.created_at.split('-').reverse().join('/')}</td> */}
              <td>{moment(help.created_at).format('DD/MM')}</td>
              <td>{moment(help.created_at).format('h:mm:ss')}</td>
              <td><Status status={help.status}>{help.status.slice(0, 10) + '...'}</Status></td>
            </tr>
          ) )}
        </tbody>


      </Table>
    )}
    </Wrapper>
  )
}

export default Call