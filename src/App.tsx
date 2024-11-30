import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import SearchPage from './pages/SearchPage/SearchPage';
import MainPage from './pages/MainPage/MainPage';
import SelectedPage from './pages/SelectedPage/SelectedPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import CartPage from './pages/CartPage/CartPage';
import ThemeContext from './providers/ThemeContext';
import AccountPage from './pages/AccountPage/AccountPage';

function App() {
  return (
    <Router>
      <ThemeContext>
        <Provider store={store}>
          <Header></Header>
            <Routes>
              <Route path="/" element={<MainPage/>} />
              <Route path="/search" element={<SearchPage/>} />
              <Route path="/selected/:isbn13" element={<SelectedPage/>} />
              <Route path="/favorites" element={<FavoritesPage/>} />
              <Route path="/carts" element={<CartPage/>} />
              <Route path="/account" element={<AccountPage/>} />
            </Routes>
          <Footer></Footer>
        </Provider>
        </ThemeContext>
    </Router>
  );
}

export default App;
