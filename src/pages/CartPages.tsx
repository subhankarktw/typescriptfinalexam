import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, updateCartItem, removeCartItem, clearCart } from '../cart/cartSlice';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Typography } from '@mui/material';
import { RootState } from '../store/store';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => selectCartItems(state));
  const cartTotal = useSelector((state: RootState) => selectCartTotal(state));

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateCartItem({ id, quantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeCartItem(id));
  };

  return (
    <div>
      <Table style={{marginTop:"70px"}}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, +e.target.value)}
                />
              </TableCell>
              <TableCell>${item.price * item.quantity}</TableCell>
              <TableCell>
                <Button onClick={() => handleRemoveItem(item.id)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="h6">Total: ${cartTotal}</Typography>
      <Button onClick={() => dispatch(clearCart())}>Clear Cart</Button>
    </div>
  );
};

export default CartPage;
