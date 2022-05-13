import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardHeader, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ListRenderer, Page } from "@/components/Common";
import { loadSalads } from "@/store/actions/salads.action";

const ListSalad = () => {
  const { salads } = useSelector((store) => store.salads);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          onEditClick={(x) => navigate(`/salads/update/${x.id}`)}
        />
      </Card>
    </Page>
  );
};

export default ListSalad;
