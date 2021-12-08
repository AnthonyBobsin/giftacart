import * as React from "react";
import { Datagrid, DateField, List, ReferenceField, TextField, useRecordContext } from "react-admin";
import { AddressField } from "./users";

export const ItemsField = ({ source }) => {
  const record = useRecordContext();
  const items = record[source];

  return (
    <span>{items ? items.length : 0}</span>
  );
}

export const OrderList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="reference" />
      <TextField source="group_code" />
      <ReferenceField source="user_id" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="user_id" reference="users" label="Address" link={false}>
        <AddressField source="address" />
      </ReferenceField>
      <DateField source="created_at" label="Created"/>
      <DateField source="delivered_at" label="Delivered"/>
      <ItemsField source="items" />
      <TextField source="total" />
    </Datagrid>
  </List>
);
