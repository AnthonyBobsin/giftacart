import React, { Fragment } from "react";
import { Accordion, AccordionSummary, AccordionDetails, CardContent, Divider, Grid } from "@material-ui/core";
import { Datagrid, EmailField, TextField } from "ra-ui-materialui";
import ExpandMore from '@material-ui/icons/ExpandMore';
import { AddressField, FullNameField } from "../resources/users";
import { groupProductsByStore } from "./SelectProducts";
import { humanDate, humanTime } from "../utils/formatTime";

const Checkout = props => {
  const { selectedUsers, selectedProducts, selectedTimeSlots } = props;
  // TODO(bobsin): group everything by store

  const SelectedUsers = props => {
    const { users } = props;
    const usersById = users.reduce((memo, current) => {
      memo[current.id] = current;
      return memo;
    }, {});

    const dataGridProps = {
      hasBulkAction: false,
      currentSort: { field: "id", order: "ASC" },
      data: usersById,
      basePath: "/users",
      ids: Object.keys(usersById),
      selectedIds: Object.keys(usersById),
      total: users.length,
    };

    return (
      <Fragment>
        <div style={{ margin: "20px 0"}}>
          {`${users.length} selected customer${users.length > 1 ? "s" : ""}`}
        </div>
        <Datagrid {...dataGridProps}>
          <FullNameField label="Name" />
          <EmailField source="email" type="email" />
          <TextField source="phone_number" />
          <AddressField label="Address"/>
        </Datagrid>
      </Fragment>
    );
  }

  const SelectedProducts = props => {
    const { products } = props;
    const productsByStore = groupProductsByStore(products);

    return (
      <Fragment>
        <div style={{ margin: "20px 0"}}>
          {`${products.length} selected product${products.length > 1 ? "s" : ""}`}
        </div>
        {Object.keys(productsByStore).map((store, idx) => (
          <Accordion defaultExpanded={idx === 0} key={idx}>
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
                </Grid>
              ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </Fragment>
    )
  }

  const SelectedTimeSlots = props => {
    const { timeSlots } = props;

    // TODO(bobsin): group this by store
    return (
      <Fragment>
        <div style={{ margin: "20px 0"}}>
          <div style={{ marginBottom: "20px" }}>
            {`${timeSlots.length} selected time slot${timeSlots.length > 1 ? "s" : ""}`}
          </div>
          <div>
            {`${humanDate(timeSlots[0].from_time)} between ${humanTime(timeSlots[0].from_time)} and ${humanTime(timeSlots[0].to_time)}`}
          </div>
        </div>
      </Fragment>
    )
  }

  return (
    <CardContent>
      <SelectedUsers users={selectedUsers} />
      <Divider style={{ margin: "20px 0" }} />
      <SelectedProducts products={selectedProducts} />
      <Divider style={{ margin: "20px 0" }} />
      <SelectedTimeSlots timeSlots={selectedTimeSlots} />
      <Divider style={{ margin: "20px 0" }} />
    </CardContent>
  )
};

export default Checkout;
