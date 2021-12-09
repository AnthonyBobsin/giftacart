import React, { useState, useEffect } from "react";
import { Datagrid, EmailField, TextField } from "ra-ui-materialui";
import { useDataProvider } from "react-admin";
import { AddressField } from "../resources/users";

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

  const dataGridProps = {
    hasBulkActions: true,
    onSelect: console.log,
    currentSort: { field: "id", order: "ASC" },
    data: usersById,
    basePath: "/users",
    ids: Object.keys(usersById),
    selectedIds: selectedUsers,
    total: users.length,
    onToggleItem: id => {
      setSelectedUsers(
        selectedUsers.includes(id) ?
          selectedUsers.filter(uid => uid !== id) :
          [...selectedUsers, id]
      );
    },
    // TODO(bobsin): include pagination
  }
  return (
    <Datagrid {...dataGridProps}> 
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <AddressField source="address"/>
    </Datagrid>
  )
};

export default SelectUsers;
