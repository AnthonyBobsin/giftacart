import * as React from "react";
import { List, Datagrid, TextField, EmailField, useRecordContext, Edit, SimpleForm, TextInput, Create } from "react-admin";
import PersonIcon from '@material-ui/icons/Person';

export const AddressField = ({ source }) => {
  const record = useRecordContext();
  const address = record[source];

  return address ? (
    <span>
      {address.street}, {address.city}, {address.zipcode}
    </span>
  ) : "";
};

const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="address.street" label="Street Address" />
      <TextInput source="address.city" label="City" />
      <TextInput source="address.zipcode" label="Postal Code" /> 
    </SimpleForm>
  </Edit>
);

const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="address.street" label="Street Address" />
      <TextInput source="address.city" label="City" />
      <TextInput source="address.zipcode" label="Postal Code" /> 
    </SimpleForm>
  </Create>
);

export const UserList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EmailField source="email" type="email" />
      <TextField source="phone" />
      <AddressField source="address"/>
    </Datagrid>
  </List>
);

const users =  {
  icon: PersonIcon,
  list: props => {
    console.log(props);
    return <UserList {...props} />;
  },
  edit: UserEdit,
  create: UserCreate,
};
export default users;
