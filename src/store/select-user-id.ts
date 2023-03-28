import { RootState } from './store';

export const selectUserId = (state: RootState): number => {
   const {user} = state;

   return user ? user.user.id : 0;
 };