import { FC } from 'react';

import { Comments } from '../../models/interfaces';

import { Comment } from './comment'

export  const CommentsList:FC<{ comments: Comments[]}> =  ({ comments }) => {

   const sortedComments = [...comments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()

    );

return(
     <div >
       {sortedComments.map(comment => (
         <Comment
           key={comment.id}
           id={comment.id}
           rating={comment.rating}
           text={comment.text}
           createdAt={comment.createdAt}
           user={comment.user}
         />
       ))}
     </div>
   );
  }