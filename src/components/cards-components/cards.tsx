import { PropsCards } from '../../models/props-interfaces';

import { CardGlobal } from './card/card-book/card';

import styles from './cards-components.module.css'

export const Cards = ({ books, display, path }: PropsCards) => (
    <div className={`${display ? styles.tile__cards__container :styles.list__cards__container}`}>
        {books.map((book) => (
            <li key={book.id}>
                <CardGlobal bookDel={()=>{}} book={book} path={path} display={display}/>
            </li>
        ))}
    </div>
    );
