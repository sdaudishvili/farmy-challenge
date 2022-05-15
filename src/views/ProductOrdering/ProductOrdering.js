import React from "react";
import { Card, CardHeader, Divider, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "@/components/Common";
import { loadSalads } from "@/store/actions/salads.action";
import { loadProducts } from "@/store/actions/products.action";
// .map((x) => ({ ...x, ...products.find((p) => x.id === p.id) }));

const ProductOrdering = () => {
  const { salads } = useSelector((state) => state.salads);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadSalads());
    dispatch(loadProducts());
  }, []);

  const items = React.useMemo(() => {
    const res = salads.reduce((result, curSalad) => {
      if (!curSalad.ingredients || curSalad.ingredients.length <= 0) return result;
      return curSalad.ingredients.reduce((acc, cur) => {
        const curIngredientCount = (curSalad.targetStock - curSalad.currentStock) * cur.numOfServings;
        return { ...acc, [cur.id]: acc[cur.id] ? acc[cur.id] + curIngredientCount : curIngredientCount };
      }, result);
    }, {});
    return Object.entries(res).map(([id, count]) => ({
      count,
      ...products.find((p) => +id === p.id)
    }));
  }, [salads, products]);

  return (
    <Page title="Product Ordering">
      <Card>
        <CardHeader title="Browse Ingredients" />
        <Divider />
        <Table>
          <TableBody>
            {items &&
              items.map((item) => (
                <TableRow hover key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.count}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </Page>
  );
};

export default ProductOrdering;
