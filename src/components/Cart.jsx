import styles from "../styles/Cart.module.css"
import PropTypes from "prop-types";
import Plus from "../../public/plus.png";
import Minus from "../../public/minus.png";

function Cart( {cart, nbrItems, handleCart, handleNbrItems} ) {

    const addQuantity = (id) => {

    const updatedCart = cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item) );
    handleCart(updatedCart);
    handleNbrItems((prev) => (prev + 1));

    };

    const diminishQuantity = (id) => {

        const quantity = cart.find((item) => item.id === id).quantity;

        if((quantity - 1) === 0) {
            const updatedCart = cart.filter((item) => (item.id !== id));
            handleCart(updatedCart);
        } else {

            const updatedCart = cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item) );
            handleCart(updatedCart);
        }

        handleNbrItems((prev) => (prev - 1));

        
    };

    const deleteItem = (id) => {

        const quantity = cart.find((item) => item.id === id).quantity;
        const updatedCart = cart.filter((item) => (item.id !== id));
        handleCart(updatedCart);
        handleNbrItems((prev) => (prev - quantity));
    }

    return (

        <>
            <section>
                <div className={styles.cartContainer}>
                    <div className={styles.quantityCart}>Your Cart ({nbrItems} items)</div>

                    {nbrItems === 0 && (
                     <p>Your cart is empty</p>
                    )}

                    {nbrItems > 0 && (
                     
                     cart.map((item) => (

                        
                        <div key={item.id} className={styles.item}>
                            <img className={styles.image} src={item.image} alt="image product"/>

                            <div className={styles.info}>
                                <div className={styles.title}>{item.title}</div>
                                <div className={styles.price}>${Math.round((item.quantity * item.price)*100) / 100}</div>
                                <div className={styles.quantityItem}>Quantity: {item.quantity}</div>

                                <div className={styles.handleQuantityDiv}>

                                    <form onSubmit={(event) => event.preventDefault()} className={styles.quantityForm}>
                                        <button className={styles.quantityFormButton} type="button" onClick={() => diminishQuantity(item.id)}>
                                            <img className={styles.quantityButton} src={Minus} alt="minus" />
                                        </button>
                                        
                                        <input readOnly className={styles.inputQuantity} type="text" value={item.quantity}></input>

                                        <button onClick={() => addQuantity(item.id)} className={styles.quantityFormButton}>
                                            <img className={styles.quantityButton} src={Plus} alt="minus" />
                                        </button>
                                    </form>

                                    <button className={styles.deleteButton} type="button" onClick={() => deleteItem(item.id)}>Delete</button>

                                </div>
                                
                            </div>

                            
                            
                        </div>

                     ))
                     

                    )}


                </div>

                
            </section>
           

            
        </>
        
    )
}

export default Cart;

Cart.propTypes = {
    cart: PropTypes.array,
    nbrItems: PropTypes.number,
    handleCart: PropTypes.func,
    setNbrItems: PropTypes.func,
    handleNbrItems: PropTypes.func
}

