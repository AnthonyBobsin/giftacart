import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, CardContent, Checkbox, Grid, TextField } from "@material-ui/core";

const Checkout = props => {
  const { selectedUsers, selectedProducts, selectedTimeSlots } = props;

  return (
    <CardContent>
      {JSON.stringify(selectedUsers)}
      <br/>
      {JSON.stringify(selectedProducts)}
      <br/>
      {JSON.stringify(selectedTimeSlots)}
      <br/>
      Checkout time!
    </CardContent>
  )
};

export default Checkout;
