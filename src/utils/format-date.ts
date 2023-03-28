export const formattedDateFunction = (delivery: string) => {

const dateHandedTo = new Date(delivery);
const formatDate = dateHandedTo.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' });
const monthWithLeadingZero = formatDate.split('/')[0].padStart(2, '0');
const day = dateHandedTo.getDate();

return `${day}.${monthWithLeadingZero}`;
} 

export const formattedDateFunction10 = (delivery: string) => {

   const dateHandedTo = new Date(delivery);
   dateHandedTo.setDate(dateHandedTo.getDate()+10)
   const formatDate = dateHandedTo.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' });
   const monthWithLeadingZero = formatDate.split('/')[0].padStart(2, '0');
   const day = dateHandedTo.getDate();
   
   return `${day}.${monthWithLeadingZero}`;
   } 