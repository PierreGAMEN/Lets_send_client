/* eslint-disable react/prop-types */

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import "./formProduct.scss";
import { useState } from "react";

const FormProduct = ({
  handleSubmit,
  productName,
  category,
  description,
  setProductName,
  setDescription,
  setCategory,
  subCategory,
  setSubCategory,
  price,
  setPrice,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <form className="formProduct" onSubmit={handleSubmit}>
      <h2>Création d&apos;un produit</h2>
      <TextField
        margin="dense"
        type="text"
        id="productName"
        name="productName"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        label="Nom du produit"
        required
        fullWidth
      />

      <TextareaAutosize
        className="textarea"
        margin="dense"
        type="text"
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        minRows={3}
        placeholder="Description"
      />
      <FormControl margin="dense" fullWidth>
        <InputLabel id="category">Catégories</InputLabel>
        <Select
          labelId="category"
          name="category"
          id="category"
          value={category}
          label="Catégories"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="Boisson">Boissons</MenuItem>
          <MenuItem value="Entrée">Entrée</MenuItem>
          <MenuItem value="Plat">Plat</MenuItem>
          <MenuItem value="Dessert">Dessert</MenuItem>
        </Select>
      </FormControl>

      <div className="subcategory">
        <label
          className={isFocus || subCategory ? "isFocus" : ""}
          htmlFor="sousCategorie"
        >
          Sous-catégorie
        </label>
        <input
          type="text"
          id="sousCategorie"
          list="sousCategories"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          required
          onFocus={() => {
            setIsFocus(true);
            console.log("focus");
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
        />
        <datalist id="sousCategories">
          <option value="Salade" />
          <option value="Soupe" />
          <option value="Grillades" />
          <option value="Pâtes" />
        </datalist>
      </div>
      <TextField
        margin="dense"
        type="number"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        label="Prix"
        required
        fullWidth
      />
      <Button type="submit">Soumettre</Button>
    </form>
  );
};

export default FormProduct;
