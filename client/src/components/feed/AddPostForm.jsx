import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../shared/Nav";
import "./postStyles.scss"
import Footer from "../shared/Footer";
import { useNavigate } from "react-router-dom"


const AddPostForm = () => {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState()
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [canSave, setCanSave] = useState (checkCanSave())

  function checkCanSave() {
    return !!caption.length && !!image && addRequestStatus === 'idle'
  }

  useEffect (()=>{
    setCanSave(checkCanSave)
    console.log(image)
  }
  ,[caption, image, addRequestStatus])


  const handlePicture = (e) => {
    setImage(e.target.files[0]);
  };

 function handleSubmit(e) {
  e.preventDefault()

  const body = new FormData()
  body.append("image", image)
  body.append("caption", caption)
  body.append("userId", userData.userId)

  console.log(body.get("userId"));
  const options = {
    method: "POST",
    headers: {
      Authorization : "Bearer " + userData.token
    },
    body
  }
  fetch ("//localhost:8080/api/posts", options).then(res => res.json()).then(data => {
    console.log(data)
    navigate ("/postsList")
  }).catch(() => {
    console.log("OH NO")
  })
 }


  return (
    <div className="page-container">
        <NavBar></NavBar>
          <div className="Post-form-container">
          <form className="Post-form" onSubmit={handleSubmit}>
            <div className="Post-form-content">
              <h3 className="Post-form-caption">Post a picture</h3>
              <div className="form-group">
                <label>Create your caption</label>
                <textarea
                  rows="8" cols="50"
                  className="post-text-box"
                  onChange={(e) => {setCaption(e.target.value)}}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image upload</label>
                <input
                  type="file"
                  className="image-upload"
                  name="image"
                  accept="image/png, image/jpeg"
                  required
                  onChange={(e) => handlePicture(e)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-dark" disabled={!canSave}>
                  Publish post
                </button>
              </div>
            </div>
          </form>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default AddPostForm;