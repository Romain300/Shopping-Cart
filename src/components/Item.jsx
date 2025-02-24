import styles from "../styles/Item.module.css"
import { useState, useEffect } from "react"
import PropTypes from 'prop-types';

function Item({handleCart, cart, handleNbrItems, nbrItems}) {

    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState({});

    //add quantity when added to cart

    const addToCart = (event, id) => {
        event.preventDefault();
        const nbrItem = quantity[id] || 1;
        const newItem = items.filter((item) => item.id === id);
        const updatedCart = [...cart, {...newItem, quantity: nbrItem}]
        const updatedNbrItem = nbrItems + nbrItem;
        handleNbrItems(updatedNbrItem);
        handleCart(updatedCart);
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
                <p className={styles.loading}>Loading...</p>
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

                                    <button type="submit">Add to cart</button>
                                    
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
}

