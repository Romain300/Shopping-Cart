import styles from "../styles/Item.module.css"
import { useState, useEffect } from "react"
import PropTypes from 'prop-types';

function Item({handleCart, cart, handleNbrItems, nbrItems, handleSubTotal}) {

    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState({});

    //add quantity when added to cart

    const addToCart = (event, id) => {

        event.preventDefault();
        const nbrItem = quantity[id] || 1;
        const newItem = items.find((item) => item.id === id);

        
        const index = cart.findIndex((item) => item.id === id);

        if (index === -1) {
            const updatedCart = [...cart, {...newItem, quantity: nbrItem}]
            const subTotal = updatedCart.reduce((total, item) => {
                return Math.round((total + item.quantity * item.price) * 100) / 100 ;
            }, 0);
            handleCart(updatedCart);
            handleSubTotal(subTotal);
        } else {
            const currentQuantity = cart[index].quantity;
            const updatedCart = cart.map((item) => 
                (item.id === id ? {...item, quantity: currentQuantity + nbrItem} : item)
            );
            const subTotal = updatedCart.reduce((total, item) => {
                return Math.round((total + item.quantity * item.price) * 100) / 100 ;
            }, 0);
            handleCart(updatedCart);
            handleSubTotal(subTotal);

        }

        
        const updatedNbrItem = nbrItems + nbrItem;
        handleNbrItems(updatedNbrItem);

        

        event.target.reset();
       
    };

    

    const handleQuantity = (event, id) => {
        const newQuantity = parseInt(event.target.value);
        
        const updatedQuantity = {...quantity, [id]: newQuantity}

        setQuantity(updatedQuantity);
        
    };

    
    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=20', { mode: "cors" })
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
        })
        .then((response) => {
            setItems(response);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => setLoading(false)) 
    }, []);

    return (
        <>
            {loading && 
                <div className={styles.loading}>Loading...</div>
            }

            {!loading &&

                <section className={styles.allItems}>

                    {items.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <img className={styles.image} src={item.image} alt="image product"/>
                            <div className={styles.info}>
                                <div className={styles.title}>{item.title}</div>
                                <div className={styles.price}>${item.price}</div>
                                <div className={styles.reviews}>
                                    <span className={styles.star}>★</span>
                                    {item.rating.rate} {item.rating.count} (Reviews)
                                </div>

                                <form onSubmit={(event) => addToCart(event, item.id)}>
                                    <div className={styles.quantity}>
                                        <label htmlFor={`${item.id}-quantity`}>Quantity:</label>
                                        <select onChange={(event) => handleQuantity(event, item.id)} id={`${item.id}-quantity`}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>

                                    <button className={styles.addButton} type="submit">Add to cart</button>
                                    
                                </form>
                            </div>
                            
                        </div>
                    ))}

                </section>

            }


        </>

    )


}

export default Item;


Item.propTypes = {
    handleCart: PropTypes.func,
    cart: PropTypes.array,
    handleNbrItems: PropTypes.func,
    nbrItems: PropTypes.number,
    handleSubTotal: PropTypes.func
}

