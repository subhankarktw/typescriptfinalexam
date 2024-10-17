import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useProducts } from "../api/products";
import { addToCart } from "../cart/cartSlice";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { data: products, isLoading, error } = useProducts();
  const [sortCriteria, setSortCriteria] = useState<string>("");

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  const sortedProducts = () => {
    if (!products) return [];

    switch (sortCriteria) {
      case "price":
        return [...products].sort((a, b) => a.price - b.price);
      case "name":
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return products;
    }
  };

  const handleSortByPrice = () => {
    setSortCriteria("price");
  };

  const handleSortByName = () => {
    setSortCriteria("name");
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading products</Typography>;
  }

  return (
    <>
      <div
        style={{
          marginBottom: "20px",
          marginTop: "80px",
          marginRight: "10px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSortByPrice}
          style={{ marginRight: "10px" }}
        >
          Sort by Price
        </Button>
        <Button variant="contained" color="primary" onClick={handleSortByName}>
          Sort by Name
        </Button>
      </div>

      <Grid container spacing={3}>
        {sortedProducts()?.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: {
                  xs: "auto",
                  sm: "100%",
                  md: "100%",
                  lg: "100%",
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{
                  objectFit: "contain",
                  width: "100%",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">
                  {truncateText(product.title, 50)}
                </Typography>
                <Typography>
                  Price: <strong>${product.price}</strong>
                </Typography>
                <Typography></Typography>
                <Typography>
                  {truncateText(product.description, 200)}
                </Typography>
              </CardContent>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "16px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
