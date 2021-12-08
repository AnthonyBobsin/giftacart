import * as React from "react";
import { Admin, ListGuesser, Resource } from "react-admin";
import { UserCreate, UserEdit, UserList } from "./resources/users";
import dataProvider from "./dataProvider";
import { OrderList } from "./resources/orders";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
    <Resource name="orders" list={OrderList} />
  </Admin>
);

export default App;
