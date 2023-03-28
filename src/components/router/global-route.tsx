import { HashRouter, Navigate, Route, Routes, } from 'react-router-dom';

import { Layout } from '../../layout';
import { Url } from '../../models/constants';
import { BookPage } from '../../pages/book';
import { DirectionPage } from '../../pages/direction';
import { MainPage } from '../../pages/main';
import { OfferPage } from '../../pages/offer';
import { ProfilePage } from '../../pages/profile-page';
import { useAppSelector } from '../../store';
import { ProtectedRoute } from '../../utils/protected-route';
import { ForgotPassword, Login } from '../login';
import { RegisterStep1 } from '../register';



export const GlobalRoute = () => {

  const { jwt } = useAppSelector((state) => state.user);

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index={true} element={<Navigate to={Url.PATH_All} />} />
          <Route path={Url.PATH_All} element={<ProtectedRoute jwt={jwt}>
            <MainPage />
          </ProtectedRoute>} />
          <Route path='/books' element={<ProtectedRoute jwt={jwt}>
            <MainPage />
          </ProtectedRoute>} />
          <Route path={Url.PATH_CATEGORY} element={<ProtectedRoute jwt={jwt}><MainPage /> </ProtectedRoute>} />
          <Route path='/contract' element={<ProtectedRoute jwt={jwt}> <OfferPage /></ProtectedRoute>} />
          <Route path='/direction' element={<ProtectedRoute jwt={jwt}><DirectionPage /></ProtectedRoute>} />
          <Route path={`${Url.PATH_CATEGORY}/:bookId`} element={<ProtectedRoute jwt={jwt}><BookPage /> </ProtectedRoute>} />
          <Route path={Url.PATH_PROFILE}  element={<ProtectedRoute jwt={jwt}><ProfilePage /></ProtectedRoute>} />
          <Route path='/auth' element={<Login />} />
          <Route path='/registration' element={<RegisterStep1 />} />
          <Route path='/forgot-pass' element={<ForgotPassword />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};


