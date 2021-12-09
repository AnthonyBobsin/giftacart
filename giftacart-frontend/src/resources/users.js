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
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="email" />
      <TextInput source="phone_number" />
      <TextInput source="street_address" label="Street Address" />
      <TextInput source="city" label="City" />
      <TextInput source="postal_code" label="Postal Code" /> 
    </SimpleForm>
  </Edit>
);

const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="email" />
      <TextInput source="phone_number" />
      <TextInput source="street_address" label="Street Address" />
      <TextInput source="city" label="City" />
      <TextInput source="postal_code" label="Postal Code" /> 
    </SimpleForm>
  </Create>
);

export const UserList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="first_name" />
      <TextField source="last_name" />
      <EmailField source="email" type="email" />
      <TextField source="phone_number" />
      <TextInput source="street_address" label="Street Address" />
      <TextInput source="city" label="City" />
      <TextInput source="postal_code" label="Postal Code" /> 
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
