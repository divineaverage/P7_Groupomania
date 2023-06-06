import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../shared/Nav";
import "./postStyles.scss"
import Footer from "../shared/Footer";

import { postAdded } from '../store/postsSlice'

const AddPostForm = () => {
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const canSave =
    [caption, image, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(postAdded({ caption, image, user: userId })).unwrap()
        setCaption('')
        setImage('')
        setUserId('')
      } catch (err) {
        console.warn("Publishing error")
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };


  return (
    <div className="page-container">
        <NavBar></NavBar>
          <div className="Post-form-container">
          <form className="Post-form">
            <div className="Post-form-content">
              <h3 className="Post-form-caption">Post a picture</h3>
              <div className="form-group">
                <label>Create your caption</label>
                <textarea
                  rows="8" cols="50"
                  className="post-text-box"
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
                <button type="submit" className="btn btn-dark" onClick={onSavePostClicked}>
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