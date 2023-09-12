import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import './App.css';
import ProfilePage from './pages/ProfilePage.js';
import AdminPage from './pages/AdminPage.js';

const App = () => {
  return (
    <div className='app'>
      <Routes >
        <Route exact path="/" element={<HomePage />} />
        <Route exact path='/profile' element={<ProfilePage />} />
        <Route exact path='/admin' element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default App;
