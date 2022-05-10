import React from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saladTypes } from "@/constants/saladTypes";
import { Ingredients } from "./components";
import { Page } from "@/components/Common";
import { loadProducts } from "@/store/actions/products.action";

const CreateSalad = () => {
  const [values, setValues] = React.useState({});
  const { products } = useSelector((store) => store.products);
  const dispatch = useDispatch();

  const changeHandler = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  React.useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <Page title="Create Salad">
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            value={values.title || ""}
            label="Title"
            name="title"
            variant="outlined"
            fullWidth
            onChange={({ target: { value } }) => changeHandler("title", value)}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={values.type || ""} label="Type">
              {saladTypes.map((option) => (
                <MenuItem key={option.value} value={option.value} onClick={() => changeHandler("type", option.value)}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Ingredients
            ingredients={values.ingredients}
            products={products}
            onChange={(value) => changeHandler("ingredients", value)}
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default CreateSalad;
