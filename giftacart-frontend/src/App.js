import * as React from "react";
import { Admin, Resource } from "react-admin";
import { Route } from "react-router-dom";
import users from "./resources/users";
import orders from "./resources/orders";
import dataProvider from "./dataProvider";
import theme from "./theme";
import PlaceOrder from "./components/PlaceOrder";

const customRoutes = [
  <Route exact path="/orders/new" component={PlaceOrder} />
];

const App = () => (
  <Admin theme={theme} customRoutes={customRoutes} dataProvider={dataProvider}>
    <Resource name="users" {...users} />
    <Resource name="orders" {...orders} />
  </Admin>
);

export default App;
