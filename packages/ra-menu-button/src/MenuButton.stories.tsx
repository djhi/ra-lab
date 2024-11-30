import * as React from 'react';
import { Admin, Datagrid, EditGuesser, List, Resource, ShowGuesser, TextField } from "react-admin";
import fakeRestDataProvider from 'ra-data-fakerest';
import { MenuButton } from './MenuButton';

const dataProvider = fakeRestDataProvider(
  {
    posts: [
      { id: 1, name: "first post", status: "active" },
      { id: 2, name: "second post", status: "active" },
    ],
  },
  true
);

const PostList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="status" />
      <MenuButton>
        <MenuButton.LinkItem label="Label" to="/custom" />
        <MenuButton.RecordLinkItem label="Record Edit" link="edit" />
        <MenuButton.RecordLinkItem label="Record Show" link="show" />
        <MenuButton.UpdateItem label="Update Record" data={{ status: 'archived' }} />
        <MenuButton.DeleteItem />
      </MenuButton>
    </Datagrid>
  </List>
);
export const FullApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} edit={EditGuesser} show={ShowGuesser} />
  </Admin>
);