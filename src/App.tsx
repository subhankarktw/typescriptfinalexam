import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPages';
import Navbar from './Components/Navbar'; 
import store from './store/store'; 

const App: React.FC = () => {
  return (
    <Provider store={store}> 
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<HomePage />} />  
          <Route path="/cart" element={<CartPage />} />  
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
