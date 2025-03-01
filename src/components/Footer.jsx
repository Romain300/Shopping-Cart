import styles from "../styles/Footer.module.css"
import gitHubLogo from '../../public/github-brands-solid.svg';

function Footer() {
    return (

        <footer>
            <div className={styles.container}>
                Made with React, By Romain300
            </div>
            <div className={styles.link}>
                <a href="https://github.com/Romain300/">
                    <img className={styles.gitHubLink} src={gitHubLogo} alt="Romain300 GitHub account"/>
                </a>
            </div>
        </footer>
    )
};

export default Footer;