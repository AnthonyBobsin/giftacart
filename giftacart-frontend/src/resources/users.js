import * as React from "react";
import { List, Datagrid, TextField, EmailField, useRecordContext, Edit, SimpleForm, TextInput, Create } from "react-admin";
import PersonIcon from '@material-ui/icons/Person';

export const FullNameField = () => {
  const record = useRecordContext();
  return record ? (
    <span>
      {record.first_name} {record.last_name}
    </span>
  ) : "";
}

export const AddressField = () => {
  const record = useRecordContext();
  const address = record;

  return address ? (
    <span>
      {record.street_address}, {record.city}, {record.postal_code}
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
      <FullNameField label="Name" />
      <EmailField source="email" type="email" />
      <TextField source="phone_number" />
      <AddressField label="Address" />
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
