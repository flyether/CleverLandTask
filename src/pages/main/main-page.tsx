import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Cards } from '../../components/cards-components'

import { FilterBar } from '../../components/filter-bar';
import { Url } from '../../models/constants';
import { Book } from '../../models/interfaces';
import { useAppSelector} from '../../store';
import { BookAPI } from '../../store/services/book-service';

import styles from './main-page.module.css'

export const MainPage = () => {
  const [sortingOrder, setSortingOrder] = useState<'asc' | 'desc' | null>('asc');
  const [triggerBook] = BookAPI.useLazyGetAllBooksQuery()
  const [triggerCat] = BookAPI.useLazyGetCategoriesQuery()
  const [isModalErrorActive, setModalErrorActive] = useState(false);
  const [displayType, setDisplayType] = useState(true);
  const [isSearchDisplay, setSearchDisplay] = useState(true);
  const { category } = useParams();
  const { allBooks } = useAppSelector((state) => state.books);

  const [books, setBooks] = useState(allBooks);
  const { cat, lastValueState } = useAppSelector((state) => state.stateComponent);
  const [isSearchValue, setSearchValue] = useState(lastValueState || '');
  const location = useLocation();
  const [isNotCategory, setNotCategory] = useState(false);
  let choice = '';
  let path = ''
  const { jwt } = useAppSelector((state) => state.user);


  useEffect(() => {
    if (jwt) {
      triggerCat()
      triggerBook()
    }
  }, [jwt, triggerCat, triggerBook]);

  sessionStorage.setItem('referrerPath', location.pathname);

  useEffect(() => {
    if (location.pathname === Url.PATH_OTHER) { setNotCategory(true) }

  }, [location.pathname]);


  const handleButtonClick = () => {
    setDisplayType(displayType === true ? false : true);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleLast = (value: string) => {
    if (value) {
      setSearchValue(value);
    }
  }

  useEffect(() => {
    if (books) {
      const sortedBooks = [...books].sort((a, b) =>
        sortingOrder === 'asc' ? (b.rating ?? 0) - (a.rating ?? 0) : (a.rating ?? 0) - (b.rating ?? 0)
      );

      if (!arraysAreEqual(books, sortedBooks)) {
        setBooks(sortedBooks);
      }
    }
  }, [books, sortingOrder]);

  function arraysAreEqual(arr1: Book[], arr2: Book[]) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  const handleRating = (value: boolean) => {
    if (value) {
      setSortingOrder('desc');
    } else {
      setSortingOrder('asc');
    }
  }

  if (cat) {
    cat.forEach((item) => {
      if (item.path === category) {
        choice = item.name;
        path = item.path
      }
    });
  }

  useEffect(() => {
    if (allBooks) {
      const searchBooks = allBooks.filter(book => {
        let ok = true;

        if (isSearchValue)
          ok = ok && !!book.title && book.title!.toLowerCase().includes(isSearchValue.toLowerCase());
        if (choice)
          ok = ok && book.categories.includes(choice);

        return ok;
      });

      setBooks(searchBooks);

      if (isSearchValue && searchBooks.length === 0) {
        setSearchDisplay(true);
      } else {
        setSearchDisplay(false);
      }
    }
  }, [allBooks, isSearchValue, category, choice]);

  return (
    <section className={styles.main__page} data-test-id='main-page'>
      <div>
        <FilterBar handleRating={handleRating} onClick={handleButtonClick} handleSearch={handleSearch} handleLast={handleLast} />
        <div>
          <div>
            {isNotCategory ? <div data-test-id='empty-category' className={styles.not_found}>В этой категории книг ещё нет</div> : (isSearchDisplay ? (
              <div data-test-id='search-result-not-found' className={styles.not_found}>По запросу ничего не найдено</div>
            ) : (
              books && <Cards path={path} books={books as Book[]} display={displayType} />
            ))
            }
          </div>
        </div>
      </div>
    </section>
  )
};
