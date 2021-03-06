/* eslint-disable no-param-reassign */
import React from "react";
import propTypes from "prop-types";
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  ButtonGroup,
  Typography
} from "@mui/material";

const Ingredients = React.memo(({ products, ingredients, onChange, totalCost, totalWeight, ...rest }) => {
  const [curSelectedProduct, setCurSelectedProduct] = React.useState(null);

  const addHandler = () => {
    if (curSelectedProduct) {
      setCurSelectedProduct(null);
      onChange([...ingredients, { ...curSelectedProduct, numOfServings: 1 }]);
    }
  };

  const decrementClickHandler = (objectRef) => {
    if (objectRef.numOfServings > 1) {
      objectRef.numOfServings -= 1;
    }
    // re render
    onChange([...ingredients]);
  };

  const increaseClickHandler = (objectRef) => {
    objectRef.numOfServings += 1;
    // re render
    onChange([...ingredients]);
  };

  const visibleProducts = products.filter(
    (product) => ingredients.findIndex((ingredient) => ingredient.id === product.id) === -1
  );

  const deleteHandler = (id) => {
    onChange(ingredients.filter((x) => x.id !== id));
  };

  return (
    <Box {...rest}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">Total Cost: {totalCost.toFixed(2)}€</Typography>
        <Typography variant="body2">Total Weight: {totalWeight}g</Typography>
      </Box>
      <Paper variant="outlined" sx={{ mt: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Number of servings</TableCell>
              <TableCell>Weight per serving</TableCell>
              <TableCell>Cost per serving</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients &&
              ingredients.map((x, i) => (
                <TableRow hover key={x.id || JSON.stringify(i)}>
                  <TableCell>{x.name}</TableCell>
                  <TableCell>
                    <ButtonGroup orientation="horizontal" aria-label="vertical outlined button group">
                      <Button variant="contained" onClick={() => decrementClickHandler(x)}>
                        -
                      </Button>
                      <Button>{x.numOfServings}</Button>
                      <Button variant="contained" onClick={() => increaseClickHandler(x)}>
                        +
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell>{x.weightPerServing}g</TableCell>
                  <TableCell>{x.costPerServing}€</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" size="small" color="error" onClick={() => deleteHandler(x.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>

      <Box display="flex" sx={{ mt: 3 }}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Product</InputLabel>
          <Select value={curSelectedProduct?.id || ""} label="Product">
            {visibleProducts.map((option) => (
              <MenuItem key={option.id} value={option.id} onClick={() => setCurSelectedProduct(option)}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button sx={{ width: "200px", ml: 3 }} variant="contained" onClick={addHandler} disabled={!curSelectedProduct}>
          ADD
        </Button>
      </Box>
    </Box>
  );
});

Ingredients.propTypes = {
  products: propTypes.instanceOf(Array),
  ingredients: propTypes.instanceOf(Array),
  onChange: propTypes.func,
  totalWeight: propTypes.number,
  totalCost: propTypes.number
};

Ingredients.defaultProps = {
  products: [],
  ingredients: [],
  onChange: () => {},
  totalWeight: 0,
  totalCost: 0
};

export default Ingredients;
