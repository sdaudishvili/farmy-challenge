/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React from "react";
import { dataService } from "@/utils/dataService";

const SaladDesigner = (props) => {
  const id = React.useId();
  const [products, setProducts] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  const [businessLogic, setBusinessLogic] = React.useState(null);
  const [salads, setSalads] = React.useState([]);

  // React.useEffect(() => {
  //   dataService.get("products").then((response) => setProducts(response));
  //   // [...]
  // }, []);

  // Example of data file save.
  const onSaveClick = () => {
    dataService.saveData().then(() => console.log("saved!"));
  };

  // Example of data file upload.
  const handleFileInput = (event) => {
    console.log("a");
    dataService.uploadFileInput(event).then((r) => {
      event.target.value = null;
      console.log("done!", { r });
    });
  };

  return (
    <label htmlFor={id}>
      Form
      <input type="file" id={id} onInput={handleFileInput} />
      <button type="button" onClick={onSaveClick}>
        save
      </button>
      {JSON.stringify(products)}
    </label>
  );
};

export default SaladDesigner;
