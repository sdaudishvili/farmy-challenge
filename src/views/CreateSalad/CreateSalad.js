import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Ingredients } from "./components";
import { Page } from "@/components/Common";
import { loadProducts } from "@/store/actions/products.action";
import { loadBusinessLogic } from "@/store/actions/businessLogic.action";
import { firstLetterToUpperCase } from "@/utils/stringManipulation";

const reducer = (property) => (acc, cur) => acc + cur[property] * cur.numOfServings;

const CreateSalad = () => {
  const [values, setValues] = React.useState({});
  const { products } = useSelector((store) => store.products);
  const { saladTypes, margin } = useSelector((store) => store.businessLogic);

  const dispatch = useDispatch();

  const changeHandler = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  React.useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadBusinessLogic());
  }, []);

  const totalCost = values.ingredients?.reduce(reducer("costPerServing"), 0) || 0;
  const totalWeight = values.ingredients?.reduce(reducer("weightPerServing"), 0) || 0;

  const saveHandler = () => {
    const hoursFresh =
      values.ingredients?.reduce(
        (acc, cur) => (cur.hoursFresh < acc ? cur.hoursFresh : acc),
        Number.MAX_SAFE_INTEGER
      ) || null;

    console.log({ ...values, cost: totalCost, price: totalCost / (1 - margin), hoursFresh });
  };

  const saladTypesKeys = React.useMemo(() => Object.keys(saladTypes), [saladTypes]);

  return (
    <Page title="Create Salad">
      <Card>
        <CardHeader title="Create Salad" />
        <Divider />
        <CardContent>
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
                  {saladTypesKeys.map((option) => (
                    <MenuItem key={option} value={option} onClick={() => changeHandler("type", option)}>
                      {firstLetterToUpperCase(option)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {values.type && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Target Cost/Weight: {saladTypes[values.type]?.targetCost}€ / {saladTypes[values.type]?.targetWeight}g
            </Typography>
          )}
          <Ingredients
            sx={{ mt: 5 }}
            ingredients={values.ingredients}
            products={products}
            onChange={(value) => changeHandler("ingredients", value)}
            totalCost={totalCost}
            totalWeight={totalWeight}
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button variant="contained" onClick={saveHandler}>
            save
          </Button>
        </CardActions>
      </Card>
    </Page>
  );
};

export default CreateSalad;
