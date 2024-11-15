import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import TabsContainer from './components/TabsContainer/TabsContainer';
import Buttons from './components/Buttons/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AllPosts from './components/AllPosts/AllPosts';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Titles from './components/Titles/Titles';
import Footer from './components/Footer/Footer';
import Pagination from './components/Pagination/Pagination';

const buttonAddToCart = 'button__add-to-cart';
const buttonDelete = 'button__delete';
const buttonAddToFavorite = 'button__add-to-favorite';

function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <Titles>New Releases Books</Titles>
      <TabsContainer />
      <Buttons buttonsState={false} typeButtons={buttonAddToCart}>Add to cart</Buttons>
      <Buttons buttonsState={true} typeButtons={buttonDelete}>
        <FontAwesomeIcon icon={faXmark} />
      </Buttons>
      <Buttons buttonsState={false} typeButtons={buttonAddToFavorite}>
        <FontAwesomeIcon icon={faHeart} />
      </Buttons>
      <AllPosts />
      <Pagination />
      <Footer></Footer>
    </Provider>
  );
}

export default App;
