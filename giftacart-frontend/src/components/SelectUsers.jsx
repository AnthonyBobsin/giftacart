import React, { useState, useEffect } from "react";
import { Datagrid, EmailField, TextField } from "ra-ui-materialui";
import { useDataProvider } from "react-admin";
import { AddressField, FullNameField } from "../resources/users";

const SelectUsers = props => {
  const { selectedUsers, setSelectedUsers } = props;

  const dataProvider = useDataProvider();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // TODO(bobsin): change this to getList
    dataProvider
      .getMany("users", { ids: [1] })
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(error => console.error(error));
  }, []);

  const usersById = users.reduce((memo, current) => {
    memo[current.id] = current;
    return memo;
  }, {});

  const selectedUserIds = selectedUsers.map(u => u.id);
  const dataGridProps = {
    hasBulkActions: true,
    onSelect: console.log,
    currentSort: { field: "id", order: "ASC" },
    data: usersById,
    basePath: "/users",
    ids: Object.keys(usersById),
    selectedIds: selectedUserIds.map(id => id.toString()),
    total: users.length,
    onToggleItem: id => {
      id = parseInt(id);
      setSelectedUsers(
        selectedUserIds.includes(id) ?
          selectedUsers.filter(u => u.id !== id) :
          [...selectedUsers, usersById[id]]
      );
    },
    // TODO(bobsin): include pagination
  }
  return (
    <Datagrid {...dataGridProps}> 
      <FullNameField label="Name" />
      <EmailField source="email" type="email" />
      <TextField source="phone_number" />
      <AddressField label="Address"/>
    </Datagrid>
  )
};

export default SelectUsers;
