import React from 'react';
import ReactDOM from 'react-dom/client';

// Router
import {
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider } from 'react-router-dom';

// RTK
import { Provider } from 'react-redux'
import store from './store'
// Components
import App from './App';
import Home from './screens/Home';
import EventDetails from './screens/EventDetails'
import Login from './screens/Login';
import Faq from './screens/Faq';
import AddEvent from './screens/AddEvent'
import Map from './screens/Map';
import Profile from './screens/Profile';
import EditUser from './screens/EditProfile';
import PrivateRoute from './components/PrivateRoute';

// Style
import 'bootstrap/dist/css/bootstrap.min.css'

// Other
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals'

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path='/' element={<App />}>
      <Route path='/login'  element={<Login />} />
      <Route path='' element={<PrivateRoute />}>
        <Route index={true} path='/' element={<Home />} />
        <Route path='/eventdetails/:id' element={<EventDetails />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/addevent' element={<AddEvent />} />
        <Route path='/map' element={<Map />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/edituser' element={<EditUser />} />
      </Route>
    </Route>
  ])
) 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
