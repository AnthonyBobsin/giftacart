import * as React from "react";
import { Admin, Resource } from "react-admin";
import { UserCreate, UserEdit, UserList } from "./resources/users";
import dataProvider from "./dataProvider";
import { OrderList } from "./resources/orders";
import { createTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import PersonIcon from '@material-ui/icons/Person';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const theme = createTheme({
  palette: {
    primary: {
      main: "#388e3c",
    },
    secondary: {
      main: "#d7ccc8",
    }
  }
})

const App = () => (
  <Admin theme={theme} dataProvider={dataProvider}>
    <Resource name="users" icon={PersonIcon} list={UserList} edit={UserEdit} create={UserCreate} />
    <Resource name="orders" icon={LibraryBooksIcon} list={OrderList} />
  </Admin>
);

export default App;
