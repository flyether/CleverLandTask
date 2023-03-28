import { useEffect } from 'react';

export const useNoScroll = () => {
  useEffect(() => {
    document.body.classList.add('no__scroll');

    return () => {
      document.body.classList.remove('no__scroll');
    };
  }, []);
};
