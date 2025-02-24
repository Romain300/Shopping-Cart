import styles from "../styles/NavBar.module.css";

import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function NavBar({nbrItems}) {

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.title}>OmniBrowse</div>
                <ol className={styles.navigation}>
                    <Link className={styles.button} to="/cart">Home</Link>
                    <Link className={styles.button} to="/cart">🛒 {nbrItems}</Link>   
                </ol>
            </nav>
        </>

    )

}

NavBar.propTypes = {
    nbrItems: PropTypes.number
}

export default NavBar;