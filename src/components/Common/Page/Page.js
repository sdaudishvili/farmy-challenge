import React from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

import { Box } from "@mui/material";

const Page = (props) => {
  const { title, children, className, ...rest } = props;

  return (
    <Box {...rest} className={className} sx={{ padding: 3 }}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
};

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string
};

Page.defaultProps = {
  children: null,
  title: "",
  className: ""
};

export default Page;
