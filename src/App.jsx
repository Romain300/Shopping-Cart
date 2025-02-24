import './App.css'
import NavBar from './components/NavBar'
import Item from './components/Item'
import { useState } from 'react'
import { useParams } from "react-router-dom";
import Cart from './components/Cart'

function App() {
  const { websitePart } = useParams();
  const [nbrItems, setNbrItems] = useState(0);
  const [cart, setCart] = useState([]);

  const handleCart = (updatedCart) => {
    setCart(updatedCart);
    console.log(cart);
  }

  const handleNbrItems = (updatedQuantity) => {
    setNbrItems(updatedQuantity);
  };

  return (
    <>
      <NavBar nbrItems={nbrItems}/>
      {websitePart === "cart" ? (
        <Cart />
      ) : (
        <Item cart={cart} handleCart={handleCart} handleNbrItems={handleNbrItems} nbrItems={nbrItems}/>
      )}
    </>
  )

}

export default App
