import React from 'react'


const Comments = ({ev, comments}) => {
   const com = comments.map((c) => {
     return (
       <div>
        <h5>{c.username}</h5>
        <p>{c.comment}</p>
     </div>
   )
   })
   return com
}

export default Comments
