import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  flew-wrap: wrap;
  margin-top: .5rem;
  overflow-y: scroll

  @media (max-width: 1600px) {
    width: 90%;

  }
`

export const PageButton = styled.button`
  width: 2rem;
  height: 2rem;
  background: ${props => props.active ? '#063251' : '#EBF7FF'};
  color: ${props => props.active ? '#fff' : null};
  border-color: transparent;
  border-radius: 5px;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s linear;
`

export const PrevButton = styled.button`
  background: transparent;
  border-color: transparent;
  font-weight: bold;
  text-transform: capitalize;
  letter-spacing: 0.1rem;
  margin: .5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`

export const NextButton = styled.button`
  background: transparent;
  border-color: transparent;
  font-weight: bold;
  text-transform: capitalize;
  letter-spacing: 0.1rem;
  margin: .5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`