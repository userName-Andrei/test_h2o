import React from 'react';
import {
  BrowserRouter, 
  Routes, 
  Route
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='users/*' element={<UserLayout />}>

          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
