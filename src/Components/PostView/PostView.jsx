import React, { useContext, useState, useEffect } from 'react'
import { FirebaseContext } from '../../Store/FirebaseContext'
import { PostContext } from '../../Store/PostContext'
import './PostView.css'
function PostView() {
  const [userDetails, setuserDetails] = useState(null)
  const { postDetails } = useContext(PostContext)
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    window.scrollTo(0, 0)
    const { userId } = postDetails
    firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
      res.forEach(doc => {
        setuserDetails(doc.data())
      })
    })
  }, [firebase,postDetails])
  function giveAlert(){
    alert("Can't available now")
  }
  return (
    
    <div className='post-view'>
      <div className="column-1">
        <div className="images">
          <img src={postDetails.url} alt='postImage'/>
        </div>
        <div className="mobile-price">
          <div className="top">
            <h2>₹ {postDetails.price}</h2>
            <div className="icon">
              <i className="fa-solid fa-share-nodes"></i>
              <i className="fa-regular fa-heart"></i>
            </div>
          </div>
          <p>{postDetails.proName}</p>
          <div className="bottom">
            <p>Maradu, Kochi</p>
            <p>Today</p>
          </div>
        </div>
        <div className="content">
          <h4>Description</h4>
          <p>
            {postDetails.description}
          </p>
        </div>
      </div>
      <div className='column-2'>
        <div className="box-1">
          <div className="top">
            <h2>₹ {postDetails.price}</h2>
            <div className="icon">
              <i className="fa-solid fa-share-nodes"></i>
              <i className="fa-regular fa-heart"></i>
            </div>
          </div>
          <p className='proname'>{postDetails.proName}</p>
          <div className="bottom">
            <p>Maradu, Kochi</p>
            <p>Today</p>
          </div>
        </div>
        <div className="box-2">
          <div className="top">
            <h4>Seller description</h4>
          </div>
          {userDetails && <div className="profile">
            <img src={require('./avatar.png')} alt="" />
            <div style={{display:'flex' , flexDirection:'column'}}>
            <h3>{userDetails.username}</h3>
            <p>{userDetails.mobile}</p>
            </div>
          </div>}
          <div className="chat">
            <button onClick={()=>{giveAlert()}} >Chat with seller</button>
          </div>
        </div>
      </div>
    </div>
  )
}
  
export default PostView