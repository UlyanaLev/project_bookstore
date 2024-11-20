import React from 'react';
import './App.css';
// import Buttons from './components/Buttons/Buttons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import SearchPage from './pages/SearchPage/SearchPage';
import MainPage from './pages/MainPage/MainPage';
import SelectedPage from './pages/SelectedPage/SelectedPage';

// const buttonDelete = 'button__delete';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header></Header>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/selected/:isbn13" element={<SelectedPage />} />
            {/* <Buttons buttonsState={true} typeButtons={buttonDelete}>
              <FontAwesomeIcon icon={faXmark} />
            </Buttons> */}
          </Routes>
        <Footer></Footer>
      </Provider>
    </Router>
  );
}

export default App;
