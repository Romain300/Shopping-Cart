import styles from "../styles/Cart.module.css"
import PropTypes from "prop-types";
import Plus from "../../public/plus.png";
import Minus from "../../public/minus.png";

function Cart( {cart, nbrItems} ) {

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

                                <form className={styles.quantityForm}>
                                    <button className={styles.quantityFormButton} type="button">
                                        <img className={styles.quantityButton} src={Minus} alt="minus" />
                                    </button>
                                    
                                    <input className={styles.inputQuantity} type="text" value={item.quantity}></input>

                                    <button className={styles.quantityFormButton}>
                                        <img className={styles.quantityButton} src={Plus} alt="minus" />
                                    </button>
                                    
                                </form>
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
}

