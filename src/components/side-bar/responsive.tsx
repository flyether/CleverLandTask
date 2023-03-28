import { useLocation, useParams } from 'react-router-dom';

import { SideBar } from '.'

export const Responsive = ({ screenWidth }: { screenWidth: number }) => {
   const { category, bookId } = useParams();
   const location = useLocation();

   if (screenWidth < 860 || (category && bookId) || location.pathname.includes('/profile') ) return null;

   return <SideBar setIsOpenBurger={() => { } } dataTestsContract='navigation-contract' nav='navigation' dataTestsTerms='navigation-terms' dataTestsHowcase='navigation-showcase' dataTestsBooks='navigation-books' showAuth={false} />;

};