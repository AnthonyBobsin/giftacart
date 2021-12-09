import React, { Fragment, useState } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { SaveContextProvider, SimpleForm, TextInput, Title  } from 'react-admin';
import { UserList } from "../resources/users";
import { Box, Button, Step, StepLabel, Stepper } from "@material-ui/core";
import SelectUsers from "./SelectUsers";
import SelectProducts from "./SelectProducts";

const UserBulkActionButtons = ({ selectedIds, handleSelect }) => (
  <Fragment>
    <Button label="Select Users" onClick={() => handleSelect(selectedIds)}>
      Select Users
    </Button>
  </Fragment>
);

const PlaceOrder = props => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  }

  const stepComponents = {
    0: <SelectUsers selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />,
    1: <SelectProducts selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>,
    2: <span>Time Slot select</span>,
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
            {activeStep === Object.keys(stepComponents).length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
        
        
      </CardContent>
    </Card>
  );
};

export default PlaceOrder;
