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
import { firstLetterToUpperCase, propertyKeyToLabel } from "@/utils/stringManipulation";
import { setAlert } from "@/store/actions/base.action";
import { dataService } from "@/utils/dataService";

const reducer = (property) => (acc, cur) => acc + cur[property] * cur.numOfServings;

const rounder = (val) => Math.round(val * 100) / 100;

const calculateHoursFresh = (values) =>
  values.ingredients?.reduce((acc, cur) => (cur.hoursFresh < acc ? cur.hoursFresh : acc), Number.MAX_SAFE_INTEGER) ||
  null;

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

  const totalCost = rounder(values.ingredients?.reduce(reducer("costPerServing"), 0)) || 0;
  const totalWeight = values.ingredients?.reduce(reducer("weightPerServing"), 0) || 0;

  const saveHandler = async () => {
    if (
      !values.title ||
      !values.type ||
      !values.ingredients ||
      values.ingredients?.length <= 0 ||
      (!values.targetStockByWeekday && values.targetStockByWeekday !== 0) ||
      (!values.currentStock && values.currentStock !== 0)
    ) {
      dispatch(setAlert({ msg: "All fields are required", type: "error" }));
    } else {
      try {
        const hoursFresh = calculateHoursFresh(values);
        const newSalad = {
          ...values,
          cost: totalCost,
          price: rounder(totalCost / (1 - margin)),
          hoursFresh,
          targetStockByWeekday: parseInt(values.targetStockByWeekday, 10) || 0,
          currentStock: parseInt(values.currentStock, 10) || 0
        };
        await dataService.create("salads", newSalad);
        dispatch(setAlert({ msg: "Salad has been successfully created", type: "success" }));
      } catch (error) {
        dispatch(setAlert({ msg: "Error occured while saving salad", type: "error" }));
      }
    }
  };

  const saladTypesKeys = React.useMemo(() => Object.keys(saladTypes), [saladTypes]);

  const generateTextFieldProps = (key) => ({
    value: values[key] || "",
    label: propertyKeyToLabel(key),
    name: key,
    variant: "outlined",
    fullWidth: true,
    onChange: ({ target: { value } }) => changeHandler(key, value)
  });

  return (
    <Page title="Create Salad">
      <Card>
        <CardHeader title="Create Salad" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <TextField {...generateTextFieldProps("title")} />
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
            <Grid item xs={6}>
              <TextField {...generateTextFieldProps("targetStockByWeekday")} type="number" />
            </Grid>
            <Grid item xs={6}>
              <TextField {...generateTextFieldProps("currentStock")} type="number" />
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
