import React, { useState } from "react";
import axios from "axios";

import NavBar from "../components/NavBar";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Button,
  TextField,
  makeStyles,
  Container,
  Paper,
  Typography,
  Grid,
  InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
  field: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "block",
  },
  imageUpload: {
    display: "none",
  },
  imagePreview: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const UploadProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { user } = useAuthContext();

  const classes = useStyles();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const createProduct = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("productImage", selectedFile);

    try {
      const imageUploadResponse = await axios.post(
        process.env.REACT_APP_API_URL + "/products/imageUpload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.idToken}`,
          },
        }
      );
      const { path, signedUrl } = imageUploadResponse.data;

      // You can include additional form data in formData for your product details
      const productDetails = {
        name: e.target.name.value, // Extract other form fields similarly
        price: e.target.price.value,
        currency: e.target.currency.value,
        description: e.target.description.value,
        path: path,
        productImageUrl: signedUrl,
      };

      await axios.post(
        process.env.REACT_APP_API_URL + "/products",
        productDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.idToken}`,
          },
        }
      );

      alert("New Product Created");

      // You can handle the response from the server here
    } catch (error) {
      alert("Error:", error);
      // Handle error scenarios
    }
  };

  return (
    <Container className={classes.root}>
      <NavBar />
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Upload Product
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InputLabel htmlFor="fileInput" className={classes.field}>
              <div className={classes.imagePreview}>
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className={classes.imagePreview}
                  />
                )}
              </div>
              <Button
                component="label"
                color="primary"
                className={classes.button}
              >
                Attach Image
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className={classes.imageUpload}
                  onChange={handleFileChange}
                />
              </Button>
            </InputLabel>
          </Grid>
          <Grid item xs={12} md={6}>
            <form onSubmit={createProduct}>
              <TextField
                className={classes.field}
                required
                label="Name"
                name="name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <TextField
                className={classes.field}
                required
                label="Description"
                name="description"
                type="text"
                variant="outlined"
                fullWidth
              />
              <TextField
                className={classes.field}
                required
                label="Price"
                name="price"
                type="text"
                variant="outlined"
                fullWidth
              />
              <TextField
                className={classes.field}
                required
                label="Currency"
                name="currency"
                type="text"
                variant="outlined"
                fullWidth
              />

              {/* Add more form fields as needed */}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Create Product
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UploadProduct;
