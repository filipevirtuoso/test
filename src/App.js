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

function App() {

  const { pathname } = useLocation();

  return (
    <div className="App">
      {/* {pathname !== '/' && pathname !== '/login' && <BackButton />} */}
      {pathname === '/' && <Header />}
      {pathname === '/' && <NewButtom />}
      <Outlet />
      {pathname !== '/login' && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default App;
