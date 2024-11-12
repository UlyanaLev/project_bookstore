import React from 'react';
import './App.css';
import TabsContainer from './components/TabsContainer/TabsContainer';
import Inputs from './components/Inputs/Inputs';
import Buttons from './components/Buttons/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const buttonAddToCart = 'button__add-to-cart';
const buttonDelete = 'button__delete';
const buttonAddToFavorite = 'button__add-to-favorite';

function App() {
  return (
      <>
          <TabsContainer />
          <Inputs />
          <Buttons buttonsState={false} typeButtons={buttonAddToCart}>Add to cart</Buttons>
          <Buttons buttonsState={true} typeButtons={buttonDelete}>
            <FontAwesomeIcon icon={faXmark} />
          </Buttons>
          <Buttons buttonsState={false} typeButtons={buttonAddToFavorite}>
            <FontAwesomeIcon icon={faHeart} />
          </Buttons>
      </>
  );
}

export default App;
