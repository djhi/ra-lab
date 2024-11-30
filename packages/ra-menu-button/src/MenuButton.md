## `<MenuButton>`

### Usage

You can use it in a `<Datagrid>` for instance:

```tsx
import { Datagrid, List, TextField } from "react-admin";
import { MenuButton } from "@djhi-lab/ra-menu-button";

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
```

### Props

`<MenuButton>` expects the following props:

| Name           | Required | Type           | Default                   | Description |
| -------------- | -------- | -------------- | ------------------------- | --- |
| `children`     | Required | `string`       | -                         | The menu items |
| `button`       |          | `string`       | `<MenuButton.IconButton>` | The button that opens the menu on click |

### `children`

The menu items. Use the components provided on `MenuButton` or a custom `MenuItem` from `@mui/material`:

```tsx
import { Datagrid, List, TextField } from "react-admin";
import { MenuButton } from "@djhi-lab/ra-menu-button";

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
```

### `button`

The button element that opens the menu when clicked.

```tsx
import { Datagrid, List, TextField } from "react-admin";
import { MenuButton } from "@djhi-lab/ra-menu-button";
import MoreIcon from "@mui/icons-material/MoreVert";

const MyButton = () => {
    return (
        <MenuButton.IconButton label="Actions">
            <MoreIcon />
        </MenuButton>
    );
}

const PostList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="status" />
      <MenuButton button={<MyButton />}>
        <MenuButton.RecordLinkItem label="Record Edit" link="edit" />
        <MenuButton.RecordLinkItem label="Record Show" link="show" />
        <MenuButton.DeleteItem />
      </MenuButton>
    </Datagrid>
  </List>
);
```