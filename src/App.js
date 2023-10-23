import React from 'react';
// Components
import Header from './components/Header'
import NewButtom from './components/NewButtom';
import Footer from './components/Footer'
import BackButton from './components/BackButton';

// Router
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

// Style
import 'react-toastify/dist/ReactToastify.css';

// Others
import { ToastContainer } from 'react-toastify';

import styled from 'styled-components';

const Div = styled.div`
background-color: #000;
height: 100vh;
`

function App() {

  const { pathname } = useLocation();

  return (
    <Div className="App">
      {/* {pathname !== '/' && pathname !== '/login' && <BackButton />} */}
      {pathname === '/' && <Header />}
      {pathname === '/' && <NewButtom />}
      <Outlet />
      {pathname !== '/login' && <Footer />}
      <ToastContainer />
    </Div>
  );
}

export default App;
