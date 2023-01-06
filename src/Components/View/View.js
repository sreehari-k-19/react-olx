import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';

import './View.css';
function View() {
  const [userDetails, setUserDetails] = useState();
  let {postDetails} = useContext(PostContext)
  let {firebase} = useContext(FirebaseContext)
  useEffect(() => {
    firebase.firestore().collection('users').where('id','==',postDetails.userId).get().then((res) => {
      console.log(res)
      res.docs.forEach(doc => {
        setUserDetails(doc.data())
      })
    })
    console.log("user : ",userDetails, "\n")
    console.log(postDetails)
  }, [])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.category}</span>
          <p>{postDetails.name}</p>
          <span>Tue May 04 2021</span>
        </div>
        {
          userDetails ? <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div> : null
        }
      </div>
    </div>
  );
}
export default View;
