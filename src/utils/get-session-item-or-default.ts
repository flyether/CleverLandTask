export function getSessionItemOrDefault(key: string, defaultValue = ''): string {
   const item = sessionStorage.getItem(key);

   return item ? item : defaultValue;
 }