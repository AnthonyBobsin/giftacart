import * as React from "react";
import { Button, Datagrid, DateField, ExportButton, List, ReferenceField, TextField, TopToolbar, useRecordContext } from "react-admin";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AddIcon from '@material-ui/icons/Add';
import { AddressField, FullNameField } from "./users";

export const ItemsField = ({ source }) => {
  const record = useRecordContext();
  const items = record[source];

  return (
    <span>{items ? items.length : 0}</span>
  );
}

const ListActions = props => {
  const { onCreate, ...rest } = props;

  return (
    <TopToolbar {...rest}>
      <Button label="Create" onClick={onCreate}>
        <AddIcon />
      </Button>
      <ExportButton />
    </TopToolbar>
  )
}

export const OrderList = props => (
  <List {...props} actions={<ListActions onCreate={() => props.history.push("/orders/new")} />}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="bulk_order_num" label="Order Group" />
      <ReferenceField source="user_id" reference="users">
        <FullNameField label="Name" />
      </ReferenceField>
      <ReferenceField source="user_id" reference="users" label="Address" link={false}>
        <AddressField label="Address" />
      </ReferenceField>
      <DateField source="created_at" label="Created"/>
      <DateField source="delivered_at" label="Delivered"/>
      <ItemsField source="items" />
      <TextField source="sub_total" />
    </Datagrid>
  </List>
);

const orders = {
  icon: LibraryBooksIcon,
  list: OrderList,
};
export default orders;
