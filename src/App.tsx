import React from 'react';
import {
  BrowserRouter, 
  Routes, 
  Route
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';
import { CommonBase } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<MainLayout />}>
          <Route path='users/*' element={<UserLayout />}>
            <Route path='common-base' element={<CommonBase />}/>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
