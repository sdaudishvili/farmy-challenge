import React from "react";
import PropTypes from "prop-types";

import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { propertyKeyToLabel } from "@/utils/stringManipulation";

const recursivelyGet = (curLevelObjRef, path, level) => {
  if (!curLevelObjRef) return "";
  if (level === path.length - 1) return curLevelObjRef[path[level]];
  return recursivelyGet(curLevelObjRef[path[level]], path, level + 1);
};

const getValueByPath = (obj, path) => {
  return recursivelyGet(obj, path.split("."), 0);
};

const ListRenderer = (props) => {
  const { items, onEditClick, displayKeys } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          {displayKeys && displayKeys.map((x) => <TableCell key={x}>{propertyKeyToLabel(x)}</TableCell>)}
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items &&
          items.map((item, i) => (
            <TableRow hover key={item.id || JSON.stringify(i)}>
              {displayKeys && displayKeys.map((x) => <TableCell key={x}>{getValueByPath(item, x)}</TableCell>)}
              <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                {onEditClick && (
                  <Button color="primary" onClick={onEditClick} size="small" variant="outlined">
                    Edit
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

ListRenderer.propTypes = {
  items: PropTypes.array.isRequired,
  onEditClick: PropTypes.func,
  displayKeys: PropTypes.array.isRequired
};
ListRenderer.defaultProps = {
  onEditClick: null
};

export default ListRenderer;
