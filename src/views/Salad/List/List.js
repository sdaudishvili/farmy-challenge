import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardHeader, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { ListRenderer, Page } from "@/components/Common";
import { loadSalads } from "@/store/actions/salads.action";

const ListSalad = () => {
  const { salads } = useSelector((store) => store.salads);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadSalads());
  }, []);

  return (
    <Page title="Create Salad">
      <Card>
        <CardHeader
          title="Browse Salads"
          action={
            <Button variant="contained" to="/salads/create" LinkComponent={Link}>
              Create salad
            </Button>
          }
        />
        <Divider />
        <ListRenderer
          displayKeys={["name", "size", "cost", "price", "targetStock", "currentStock"]}
          items={salads}
          onEditClick={() => console.log("a")}
        />
      </Card>
    </Page>
  );
};

export default ListSalad;
