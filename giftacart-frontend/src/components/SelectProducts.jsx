import { Accordion, AccordionSummary, AccordionDetails, CardContent, Checkbox, Divider, Grid, TextField } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { Button, useDataProvider } from "react-admin";
import ExpandMore from '@material-ui/icons/ExpandMore';

const groupProductsByStore = products => products.reduce((memo, current) => {
  const storeId = current.store_name;

  if (!(storeId in memo)) {
    memo[storeId] = [];
  }
  memo[storeId].push(current);

  return memo;
}, {});

const SelectProducts = props => {
  const { selectedProducts, setSelectedProducts } = props;
  // TODO(bobsin): receive store from props
  // TODO(bobsin): execute a product query for each store and construct results

  const dataProvider = useDataProvider();
  const [productQuery, setProductQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [expandedStore, setExpandedStore] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    // TODO(bobsin): change this to getList with productQuery
    if (searching === true) {
      if (productQuery.length > 2) {
        dataProvider
          .getList("products", { sort: { field: "id", order: "DESC" }, filter: {}, pagination: { page: 1, perPage: 1 } })
          .then(({ data }) => {
            const selectedProducts = data.filter(p => p.name.toLowerCase().includes(productQuery.toLowerCase()));
            setProducts(selectedProducts);
          })
          .catch(error => console.error(error));
      }
      setSearching(false);
    }
  }, [searching]);

  const productsByStore = groupProductsByStore(products);
  const selectedProductsByStore = groupProductsByStore(selectedProducts);

  const stores = [...new Set(Object.keys(productsByStore).concat(Object.keys(selectedProductsByStore)))];
  useEffect(() => {
    if (stores.length > 0 && expandedStore === "") {
      setExpandedStore(stores[0]);
    }
  }, [products, selectedProducts]);

  const ProductListByStore = props => {
    const { title, productsByStore } = props;

    const selectedProductIds = selectedProducts.map(p => p.id);
    const handleToggle = product => {
      setSelectedProducts(selectedProductIds.includes(product.id) ? selectedProducts.filter(p => p.id !== product.id) : [...selectedProducts, product]);
    };

    if (Object.keys(productsByStore).length == 0) { return null; }

    return (
      <Fragment>
        <div style={{ margin: "40px 0" }}>{title}</div>
        {Object.keys(productsByStore).map((store, idx) => (
          <Accordion key={idx} expanded={expandedStore === store} onChange={(event, isExpanded) => setExpandedStore(isExpanded ? store : "")}>
            <AccordionSummary expandIcon={<ExpandMore />} >
              {store}
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: "100%" }}>
              {productsByStore[store].map((product, idx2) => (
                <Grid justifyContent="space-between" container key={idx2}>
                  <Grid item style={{ margin: "auto 0" }}>
                    {product.name}
                  </Grid>
                  <Grid item>
                    <Checkbox checked={selectedProductIds.includes(product.id)} onChange={() => handleToggle(product)}/>
                  </Grid>
                </Grid>
              ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </Fragment>
    );
  }

  return (
    <CardContent>
      <TextField
        value={productQuery}
        onChange={({ target }) => setProductQuery(target.value)}
        style={{ width: "300px" }}
        variant="filled"
        label="Search Products"
        onKeyDown={(event) => event.key === "Enter" ? setSearching(true) : null}
        />
      <div><Button onClick={() => setSearching(true)} label="Search" /></div>
      <ProductListByStore title="Query Results" productsByStore={productsByStore}/>
      {Object.keys(productsByStore).length > 0 && <Divider />}
      <ProductListByStore title="Selected Products" productsByStore={selectedProductsByStore}/>
    </CardContent>
  );
};

export default SelectProducts;
