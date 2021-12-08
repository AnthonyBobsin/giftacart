import fakeDataProvider from 'ra-data-fakerest';

const dataProvider = fakeDataProvider({
  users: [
    {
      id: 1,
      name: "Anthony Bobsin",
      email: "bobbyjay@gmail.com",
      phone: "555-555-5555",
      address: {
        street: "190 Liberty St",
        city: "Toronto",
        zipcode: "M6K3L5",
      },
    },
  ],
  orders: [
    {
      group_code: "holidays2021",
      created_at: "2021-12-05T13:22:23Z",
      delivered_at: "2021-12-06T12:01:04Z",
      reference: "KWFWV09",
      user_id: 1,
      items: [],
      total: "13.32",
    }
  ],
});

export default dataProvider;
