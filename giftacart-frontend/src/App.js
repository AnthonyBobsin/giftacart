import * as React from "react";
import { fetchUtils, Admin, Resource } from "react-admin";
import simpleRestProvider from 'ra-data-simple-rest';
import { Route } from "react-router-dom";
import users from "./resources/users";
import orders from "./resources/orders";
import dataProvider from "./dataProvider";
import theme from "./theme";
import PlaceOrder from "./components/PlaceOrder";

const customRoutes = [
  <Route exact path="/orders/new" component={PlaceOrder} />
];

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
  options.headers.set('Access-Control-Expose-Headers', 'http://localhost:3000/');
    return fetchUtils.fetchJson(url, options);
};

const App = () => (
  <Admin theme={theme} customRoutes={customRoutes} dataProvider={simpleRestProvider('http://localhost:3001', httpClient)}>
    <Resource name="users" {...users} />
    <Resource name="orders" {...orders} />
  </Admin>
);

export default App;
