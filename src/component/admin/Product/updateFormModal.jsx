/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import "./formProduct.scss";

const UpdateProductModal = ({
  onSubmit,
  editProduct,
  setEditProduct,
  onClose,
  open,
  isFocus,
  setIsFocus,
}) => {
  return (
    <Dialog className="formProduct" open={open} onClose={onClose}>
      <DialogTitle>Modifier</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          type="text"
          id="productName"
          name="productName"
          value={editProduct.name}
          onChange={(e) =>
            setEditProduct({ ...editProduct, name: e.target.value })
          }
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
          value={editProduct.description}
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              description: e.target.value,
            })
          }
          minRows={3}
          placeholder="Description"
        />
        <FormControl margin="dense" fullWidth>
          <InputLabel id="category">Catégories</InputLabel>
          <Select
            labelId="category"
            name="category"
            id="category"
            value={editProduct.category}
            onChange={(e) =>
              setEditProduct({ ...editProduct, category: e.target.value })
            }
            label="Catégories"
          >
            <MenuItem value="Boisson">Boissons</MenuItem>
            <MenuItem value="Entrée">Entrée</MenuItem>
            <MenuItem value="Plat">Plat</MenuItem>
            <MenuItem value="Dessert">Dessert</MenuItem>
          </Select>
        </FormControl>

        <div className="subcategory">
          <label className={isFocus || editProduct.sub_category ?  "isFocus" : ""} htmlFor="sousCategorie">
            Sous-catégorie
          </label>
          <input
            type="text"
            id="sousCategorie"
            list="sousCategories"
            value={editProduct.sub_category}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                sub_category: e.target.value,
              })
            }
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
          value={editProduct.price}
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              price: parseFloat(e.target.value),
            })
          }
          label="Prix"
          required
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>Soumettre</Button>
        <Button onClick={onClose}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProductModal;
