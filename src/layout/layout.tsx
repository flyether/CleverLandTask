import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { ServerError } from '../components/errors';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { LoadingScreen } from '../components/loading/loading-screen';
import { Responsive } from '../components/side-bar';
import { useAppSelector } from '../store';
import { BookAPI } from '../store/services/book-service';
import { UserAPI } from '../store/services/user-servese';

import { displayError } from './handle-errors';

import styles from './layout.module.css';

export const Layout = () => {
  const { jwt } = useAppSelector((state) => state.user);
  const [path, setPath] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [trigger] = BookAPI.useLazyGetAllBooksQuery()
  const [triggerCat] = BookAPI.useLazyGetCategoriesQuery();
  const [triggerMe] = UserAPI.useLazyGetUserMeQuery()
  const location = useLocation();


  const [rejectedEndpointName, setRejectedEndpointName] = useState<string | undefined>(undefined);
  const queries = useAppSelector((state) => state.api.queries);
  const mutations = useAppSelector((state) => state.api.mutations);
  const isSomeQueryPending = Object.values(queries).some(query => query?.status === 'pending')
  const isSomeMutationPending =  Object.values(mutations).some(query => query?.status === 'pending')

  useEffect(() => {
    const rejectedQuery = Object.values(queries).find((query) => query?.status === 'rejected');

    if (rejectedQuery && rejectedQuery.endpointName ) {
      setRejectedEndpointName(displayError(rejectedQuery.endpointName));
    
    } else {
      setRejectedEndpointName(undefined);
    }
  }, [queries]);

  useEffect(() => {
    const rejectedQuery = Object.values(mutations).find((mutation) => mutation?.status === 'rejected');

    if (rejectedQuery && rejectedQuery.endpointName ) {
      setRejectedEndpointName(displayError(rejectedQuery.endpointName));
    
    } else {
      setRejectedEndpointName(undefined);
    }
  }, [mutations]);
 
  useEffect(() => {
    if (jwt) {
      triggerCat()
      trigger()
      triggerMe()
    }
  }, [jwt, trigger, triggerCat, triggerMe]);

  useEffect(() => {
    if (location.pathname.match(/^\/books\/[^/]+\/[^/]+$/)) {
      setPath(true);
    }
    else {
      setPath(false);
    }
  }, [location.pathname]);



  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [screenWidth]);


  return (
    <div className={styles.container}>
       {isSomeQueryPending&& <LoadingScreen />}
       {isSomeMutationPending && <LoadingScreen />}
      {rejectedEndpointName && <ServerError message={rejectedEndpointName} close={() =>  setRejectedEndpointName(undefined)} />}
      <Header />
      {path ? <div className={styles.path}>
        <Outlet />
      </div> : <div className={styles.wrapper}>
        <Responsive screenWidth={screenWidth} />
        <Outlet />
      </div>}
      <Footer />
    </div>
  );
}

