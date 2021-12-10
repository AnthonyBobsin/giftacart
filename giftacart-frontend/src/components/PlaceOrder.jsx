import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title, useDataProvider, showNotification } from 'react-admin';
import { Box, Button, Step, StepLabel, Stepper } from "@material-ui/core";
import SelectUsers from "./SelectUsers";
import SelectProducts from "./SelectProducts";
import SelectTimeSlots from "./SelectTimeSlots";
import Checkout from "./Checkout";

const PlaceOrder = connect(undefined, { showNotification })(props => {
  const { showNotification } = props;

  const history = useHistory();
  const dataProvider = useDataProvider();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  }

  const stepComponents = {
    0: <SelectUsers selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />,
    1: <SelectProducts selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>,
    2: <SelectTimeSlots selectedTimeSlots={selectedTimeSlots} setSelectedTimeSlots={setSelectedTimeSlots} />,
    3: <Checkout selectedUsers={selectedUsers} selectedProducts={selectedProducts} selectedTimeSlots={selectedTimeSlots} />
  };

  const handleNext = () => {
    if (activeStep == Object.keys(stepComponents).length - 1) {
      const timeSlotsByStore = selectedTimeSlots.reduce((memo, current) => {
        memo[current.store_id] = current;
        return memo;
      }, {});

      // TODO(bobsin): move this to users
      const store = 1;
      const storeProducts = selectedProducts.filter(p => p.store_id === store);

      const ordersToCreate = selectedUsers.map((user, i) => ({
        created_at: new Date().toISOString(),
        delivered_at: null,
        store_id: store,
        bulk_order_num: "testing",
        timeslot_id: timeSlotsByStore[store].id,
        user_id: user.id,
        status: "new",
        order_item_attributes: storeProducts.map(product => ({
          name: product.name,
          product_id: product.id,
          unit_price: product.unit_price,
        })),
        // items: selectedProducts.filter(p => p.store === store),
        sub_total: storeProducts.reduce((memo, current) => memo + parseFloat(current.unit_price), 0),
      }));
      const numOrders = ordersToCreate.length;

      Promise
        .all(ordersToCreate.map(data => dataProvider.create("orders", { data })))
        .then(() => {
          showNotification(`Created ${numOrders} order${numOrders === 1 ? "" : "s"} 🎉`);
          history.push("/orders");
        })
        .catch(() => showNotification(`Failed to create order${numOrders === 1 ? "" : "s"}`, "warning"));
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <Card>
      <Title title="Place Order" />
      <CardContent>
        <Box>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Select Customers</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Products</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Time Slots</StepLabel>
            </Step>
            <Step last={true}>
              <StepLabel>Checkout</StepLabel>
            </Step>
          </Stepper>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }}>
            {stepComponents[activeStep]}
          </Box>

          <Button onClick={handleNext}>
            {
              activeStep === Object.keys(stepComponents).length - 1
                ? `Place ${selectedUsers.length} Order${selectedUsers.length === 1 ? "" : "s"}`
                : 'Next'
            }
          </Button>
        </Box>


      </CardContent>
    </Card>
  );
});

export default PlaceOrder;
