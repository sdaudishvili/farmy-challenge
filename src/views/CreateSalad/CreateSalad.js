import React, { useId } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Page from "@/components/Common/Page";
import { saladTypes } from "@/constants/saladTypes";
import { Ingredients } from "./components";

const CreateSalad = () => {
  const id = useId();
  console.log(id);
  const [values, setValues] = React.useState({});
  const changeHandler = (field, value) => {
    setValues({ ...values, [field]: value });
  };

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
                <MenuItem value={option.value} onClick={() => changeHandler("type", option.value)}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Ingredients />
        </Grid>
      </Grid>
    </Page>
  );
};

export default CreateSalad;
