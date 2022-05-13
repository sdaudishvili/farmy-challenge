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
import { Link, useNavigate, useParams } from "react-router-dom";
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const changeHandler = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  React.useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadBusinessLogic());
  }, []);

  React.useEffect(() => {
    if (params.id && products.length > 0) {
      const fetchData = async () => {
        try {
          const item = await dataService.get(`salads/${params.id}`);

          setValues({
            ...item,
            ingredients: item.ingredients.map((x) => ({
              ...products.find((p) => p.id === x.id),
              numOfServings: x.numOfServings
            }))
          });
          console.log(item);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [params.id, products]);

  const totalCost = rounder(values.ingredients?.reduce(reducer("costPerServing"), 0)) || 0;
  const totalWeight = values.ingredients?.reduce(reducer("weightPerServing"), 0) || 0;

  const saveHandler = async () => {
    if (
      !values.name ||
      !values.size ||
      !values.ingredients ||
      values.ingredients?.length <= 0 ||
      (!values.targetStock && values.targetStock !== 0) ||
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
          targetStock: parseInt(values.targetStock, 10) || 0,
          currentStock: parseInt(values.currentStock, 10) || 0,
          ingredients: values?.ingredients?.map((x) => ({ id: x.id, numOfServings: x.numOfServings })) || []
        };
        if (params.id) {
          await dataService.update(`salads/${params.id}`, newSalad);
          dispatch(setAlert({ msg: "Salad has been successfully created", type: "success" }));
        } else {
          await dataService.create("salads", newSalad);
          dispatch(setAlert({ msg: "Salad has been successfully created", type: "success" }));
        }
        navigate("/salads");
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
        <CardHeader
          title="Create Salad"
          action={
            <Button variant="contained" to="/salads" LinkComponent={Link}>
              salads list
            </Button>
          }
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <TextField {...generateTextFieldProps("name")} />
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Size</InputLabel>
                <Select value={values.size || ""} label="Size">
                  {saladTypesKeys.map((option) => (
                    <MenuItem key={option} value={option} onClick={() => changeHandler("size", option)}>
                      {firstLetterToUpperCase(option)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField {...generateTextFieldProps("targetStock")} type="number" />
            </Grid>
            <Grid item xs={6}>
              <TextField {...generateTextFieldProps("currentStock")} type="number" />
            </Grid>
          </Grid>
          {values.size && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Target Cost/Weight: {saladTypes[values.size]?.targetCost}€ / {saladTypes[values.size]?.targetWeight}g
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
