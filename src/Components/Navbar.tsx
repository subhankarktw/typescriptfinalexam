import React from "react";
import { AppBar, Toolbar, Typography, Button, Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { selectCartItems } from "../cart/cartSlice";
import { RootState } from "../store/store";

const Navbar: React.FC = () => {
  const cartItems = useSelector((state: RootState) => selectCartItems(state));
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-commerce App
        </Typography>

        <Button component={Link} to="/" color="inherit">
          All Products
        </Button>

        <Button component={Link} to="/cart" color="inherit">
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
