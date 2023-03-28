import { Link } from 'react-router-dom';

import facebook from '../../assets/svg/facebook.svg'
import ins from '../../assets/svg/Icon_Soc.svg'
import vk from '../../assets/svg/Icon_Social.svg'
import inst from '../../assets/svg/icon-instagram.svg'

import styles from './footer.module.css'

export const Footer = () => (
    <div className={styles.container}>
        <p className={styles.text}> © 2020-2023 Cleverland. Все права защищены.</p>
        <div className={styles.icon__div}>
            <Link to="facebook.com" >
                <          img src={facebook} alt="sort icon" className={styles.icon} />
            </Link>
            <Link to="instagram.com
" >
                <img src={inst} alt="sort icon" className={styles.icon} />
            </Link>
            <Link to="vk.ru" >
                <img src={vk} alt="sort icon" className={styles.icon} />
            </Link>
            <Link to="vk.ru" >
                <img src={ins} alt="sort icon" className={styles.icon} />
            </Link>
        </div>
    </div>
);
