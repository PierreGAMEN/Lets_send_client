/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import FormProduct from "./formProduct";
// import UpdateProduct from "./updateProduct";
import axios from "axios";
import { useState } from "react";
import UpdateProduct from "./updateProduct";

const ProductMenu = ({ company_id }) => {
  // *************************************************
  //************** UseState Create Product ***********/
  //**************************************************

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");

  // *************************************************
  //************** UseState Update Product ***********/
  //**************************************************

  // *************************************************
  //************** UseState Delete Product ***********/
  //**************************************************

  // *************************************************
  //************** Loading Data Function ***********/
  //**************************************************

  // *************************************************
  //************** Create Product Function ***********/
  //**************************************************

  const createProduct = async (event) => {
    event.preventDefault();

    const productData = {
      name: productName,
      description: description,
      category: category,
      sub_category: subCategory,
      price: price,
      company_id: company_id,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/menu",
        productData
      );
      if (response.data) {
        toast.success("Le produit a été créé avec succès");
      }
      // Réinitialisez le formulaire après le succès
      setProductName("");
      setDescription("");
      setCategory("");
      setSubCategory("");
      setPrice("");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // *************************************************
  //************** Update Product Function ***********/
  //**************************************************

  // *************************************************
  //************** Delete Product Function ***********/
  //**************************************************

  return (
    <section>
      <FormProduct
        handleSubmit={createProduct}
        productName={productName}
        category={category}
        description={description}
        setProductName={setProductName}
        setDescription={setDescription}
        setCategory={setCategory}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        price={price}
        setPrice={setPrice}
      />
      <UpdateProduct company_id={company_id}/>
    </section>
  );
};

export default ProductMenu;
