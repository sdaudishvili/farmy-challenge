import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { setAlert } from "@/store/actions/base.action";

const TRANSITION_DURATION = 300;

const Alerts = () => {
  const [open, setOpen] = React.useState(false);
  const { alert } = useSelector((store) => store.base);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (alert.msg) {
      setOpen(true);
    }
  }, [alert]);

  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        dispatch(setAlert({ msg: "", type: "" }));
      }, TRANSITION_DURATION);
    }
  }, [open]);

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} transitionDuration={TRANSITION_DURATION}>
      <Alert onClose={handleClose} severity={alert.type || "info"} sx={{ width: "100%" }}>
        {alert.msg}
      </Alert>
    </Snackbar>
  );
};

export default Alerts;
