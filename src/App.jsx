import './App.css'
import NavBar from './components/NavBar'
import Item from './components/Item'
import Footer from './components/Footer'
import { useState } from 'react'
import { useParams } from "react-router-dom";
import Cart from './components/Cart'

function App() {
  const { websitePart } = useParams();
  const [nbrItems, setNbrItems] = useState(0);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const handleCart = (updatedCart) => {
    setCart(updatedCart);
  }

  const handleNbrItems = (updatedQuantity) => {
    setNbrItems(updatedQuantity);
  };

  const handleSubTotal = (updatedTotal) => {
    setSubTotal(updatedTotal);
  };

  return (
    <div className='main-container'>
      <NavBar nbrItems={nbrItems}/>
      {websitePart === "cart" ? (
        <Cart cart={cart} nbrItems={nbrItems} handleCart={handleCart} handleNbrItems={handleNbrItems} subTotal={subTotal} handleSubTotal={handleSubTotal}/>
      ) : (
        <Item cart={cart} handleCart={handleCart} handleNbrItems={handleNbrItems} nbrItems={nbrItems} handleSubTotal={handleSubTotal}/>
      )}
      <Footer />
    </div>
  )

}

export default App
