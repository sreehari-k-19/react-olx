import React, { Fragment, useContext, useEffect, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from '../../Store/Context'
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);


  useEffect(() => {
    if(!user) {
      navigate("/login", {replace: true})
    }
  },[])


  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    console.log(product);
  };
  const handleSubmit = async () => {
    let { ref } = await firebase.storage().ref(`/image/${image.name}`).put(image)
    let url = await ref.getDownloadURL()
    let date = new Date();
    await firebase.firestore().collection('products').add({
      name : product.name,
      category : product.category,
      price : product.price,
      url : url,
      userId : user.uid,
      createdAt: date.toString()
    });
    navigate("/")
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={product.name}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={product.category}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="price"
            value={product.price}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : null}
          ></img>
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
