# ra-menu-button

A component for react-admin that renders a MUI button which displays a menu when clicked.

## Installation

```sh
npm install @djhi-lab/ra-menu-button
# or
yarn add @djhi-lab/ra-menu-button
# or
bun add @djhi-lab/ra-menu-button
```
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
## `<MenuButton.DeleteItem>`

### Usage

```tsx
import { Datagrid, List, TextField } from "react-admin";
import { MenuButton } from "@djhi-lab/ra-menu-button";

const PostList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="status" />
      <MenuButton>
        <MenuButton.RecordLinkItem label="Record Edit" link="edit" />
        <MenuButton.DeleteItem />
      </MenuButton>
    </Datagrid>
  </List>
);
```

### Props

`<MenuButtonDeleteItem>` expects the following props:

| Prop                | Required | Type                             | Default           | Description                                                             |
|-------------------- |----------|--------------------------------- |-------------------|-------------------------------------------------------------------------|
| `className`         | Optional | `string`                         | -                 | Class name to customize the look and feel of the button element itself  |
| `label`             | Optional | `string`                         | 'Delete'          | label or translation message to use                                     |
| `icon`              | Optional | `ReactElement`                   |                   | iconElement, e.g. `<CommentIcon />`                                     |
| `mutationMode`      | Optional | `string`                         | `'undoable'`      | Mutation mode (`'undoable'`, `'pessimistic'` or `'optimistic'`)         |
| `mutation Options`  | Optional |                                  | null              | options for react-query `useMutation` hook                              |
| `record`            | Optional | `Object`                         | -                 | Record to delete, e.g. `{ id: 12, foo: 'bar' }`                         |
| `redirect`          | Optional | `string | false | Function`      | 'list'            | Custom redirection after success side effect                            |
| `resource`          | Optional | `string`                         | -                 | Resource to delete, e.g. 'posts'                                        |
| `sx`                | Optional | `SxProps`                        | -                 | The custom styling for the button                                       |
| `success Message`   | Optional | `string`                         | 'Element deleted' | Lets you customize the success notification message.                    |


### `label`

By default, the label is `Delete` in English. In other languages, it's the translation of the `'ra.action.delete'` key.

To customize the `<MenuButton.DeleteItem>` label, you can either change the translation in your i18nProvider, or pass a `label` prop:

```jsx
<MenuButton.DeleteItem label="Delete this comment" />
```

Custom labels are automatically translated, so you can use a translation key, too:

```jsx
<MenuButton.DeleteItem label="resources.comments.actions.delete" />
```

### `icon`

Customize the icon of the button by passing an `icon` prop:

```jsx
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

<MenuButton.DeleteItem icon={<DeleteForeverIcon />} />
```

### `mutationMode`

`<MenuButton.DeleteItem>` has three modes, depending on the `mutationMode` prop:

- `'undoable'` (default): Clicking the button will update the UI optimistically and display a confirmation snackbar with an undo button. If the user clicks the undo button, the record will not be deleted and the UI will be rolled back. Otherwise, the record will be deleted after 5 seconds.
- `optimistic`: Clicking the button will update the UI optimistically and delete the record. If the deletion fails, the UI will be rolled back.
- `pessimistic`: Clicking the button will display a confirmation dialog. If the user confirms, the record will be deleted. If the user cancels, nothing will happen.

**Note**: When choosing the `pessimistic` mode, `<DeleteButton>` will actually render a `<DeleteWithConfirmButton>` component and accept additional props to customize the confirm dialog (see below).

### `mutationOptions`

`<MenuButton.DeleteItem>` calls the `useMutation` hook internally to delete the record. You can pass options to this hook using the `mutationOptions` prop.

{% raw %}
```jsx
<MenuButton.DeleteItem mutationOptions={{ onError: () => alert('Record not deleted, please retry') }} />
```
{% endraw %}

Check out the [useMutation documentation](https://tanstack.com/query/latest/docs/framework/react/reference/useMutation) for more information on the available options.

### `record`

By default, `<MenuButton.DeleteItem>` reads the current record from the `RecordContext`. If you want to delete a different record, you can pass it as a prop:

{% raw %}
```jsx
<MenuButton.DeleteItem record={{ id: 123, author: 'John Doe' }} />
```
{% endraw %}

### `redirect`

By default, `<MenuButton.DeleteItem>` redirects to the list page after a successful deletion. You can customize the redirection by passing a path as the `redirect` prop:

```jsx
<MenuButton.DeleteItem redirect="/comments" />
```

### `resource`

By default, `<MenuButton.DeleteItem>` reads the current resource from the `ResourceContext`. If you want to delete a record from a different resource, you can pass it as a prop:

{% raw %}
```jsx
<MenuButton.DeleteItem record={{ id: 123, author: 'John Doe' }} resource="comments" />
```
{% endraw %}

### `successMessage`

![Delete button success message](./img/DeleteButton_success.png)

On success, `<MenuButton.DeleteItem>` displays a "Element deleted" notification in English. `<MenuButton.DeleteItem>` uses two successive translation keys to build the success message:

- `resources.{resource}.notifications.deleted` as a first choice
- `ra.notification.deleted` as a fallback

To customize the notification message, you can set custom translation for these keys in your i18nProvider.

**Tip**: If you choose to use a custom translation, be aware that react-admin uses the same translation message for the `<MenuButton.DeleteItem>`, so the message must support [pluralization](./TranslationTranslating.md#interpolation-pluralization-and-default-translation):

```jsx
const englishMessages = {
    resources: {
        comments: {
            notifications: {
                deleted: 'Comment deleted |||| %{smart_count} comments deleted',
                // ...
            },
        },
    },
};
```

Alternately, pass a `successMessage` prop:

```jsx
<MenuButton.DeleteItem successMessage="Comment deleted successfully" />
```

## `<MenuButton.UpdateItem>`

### Usage

```tsx
import { Datagrid, List, TextField } from "react-admin";
import { MenuButton } from "@djhi-lab/ra-menu-button";

const PostList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="status" />
      <MenuButton>
        <MenuButton.RecordLinkItem label="Record Edit" link="edit" />
        <MenuButton.UpdateItem label="Archive" data={{ status: 'archived' }} />
      </MenuButton>
    </Datagrid>
  </List>
);
```

### Props

`<MenuButton.UpdateItem>` expects the following props:

| Prop                | Required | Type                             | Default           | Description                                                             |
|-------------------- |----------|--------------------------------- |-------------------|-------------------------------------------------------------------------|
| `className`         | Optional | `string`                         | -                 | Class name to customize the look and feel of the button element itself  |
| `label`             | Required | `string`                         |                   | label or translation message to use                                     |
| `icon`              | Optional | `ReactElement`                   |              `    | iconElement, e.g. `<CommentIcon />`                                     |
| `mutationMode`      | Optional | `string`                         | `'undoable'`      | Mutation mode (`'undoable'`, `'pessimistic'` or `'optimistic'`)         |
| `mutation Options`  | Optional |                                  | null              | options for react-query `useMutation` hook                              |
| `record`            | Optional | `Object`                         | -                 | Record to update, e.g. `{ id: 12, foo: 'bar' }`                         |
| `redirect`          | Optional | `string | false | Function`      | 'list'            | Custom redirection after success side effect                            |
| `resource`          | Optional | `string`                         | -                 | Resource to update, e.g. 'posts'                                        |
| `sx`                | Optional | `SxProps`                        | -                 | The custom styling for the button                                       |
| `success Message`   | Optional | `string`                         | 'Element updated' | Lets you customize the success notification message.                    |


### `label`

To customize the `<MenuButton.UpdateItem>` label, you can either change the translation in your i18nProvider, or pass a `label` prop:

```jsx
<MenuButton.UpdateItem label="Archive this comment" data={{ status: 'archived' }} />
```

Custom labels are automatically translated, so you can use a translation key, too:

```jsx
<MenuButton.UpdateItem label="resources.comments.actions.archive" data={{ status: 'archived' }} />
```

### `icon`

Customize the icon of the button by passing an `icon` prop:

```jsx
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

<MenuButton.UpdateItem icon={<DeleteForeverIcon />} data={{ status: 'archived' }} />
```

### `mutationMode`

`<MenuButton.UpdateItem>` has three modes, depending on the `mutationMode` prop:

- `'undoable'` (default): Clicking the button will update the UI optimistically and display a confirmation snackbar with an undo button. If the user clicks the undo button, the record will not be updated and the UI will be rolled back. Otherwise, the record will be deleted after 5 seconds.
- `optimistic`: Clicking the button will update the UI optimistically and delete the record. If the update fails, the UI will be rolled back.
- `pessimistic`: Clicking the button will display a confirmation dialog. If the user confirms, the record will be updated. If the user cancels, nothing will happen.

**Note**: When choosing the `pessimistic` mode, `<MenuButton.UpdateItem>` will actually render a `<DeleteWithConfirmButton>` component and accept additional props to customize the confirm dialog (see below).

### `mutationOptions`

`<MenuButton.UpdateItem>` calls the `useMutation` hook internally to delete the record. You can pass options to this hook using the `mutationOptions` prop.

{% raw %}
```jsx
<MenuButton.UpdateItem mutationOptions={{ onError: () => alert('Record not updated, please retry') }} data={{ status: 'archived' }} />
```
{% endraw %}

Check out the [useMutation documentation](https://tanstack.com/query/latest/docs/framework/react/reference/useMutation) for more information on the available options.

### `record`

By default, `<MenuButton.UpdateItem>` reads the current record from the `RecordContext`. If you want to update a different record, you can pass it as a prop:

{% raw %}
```jsx
<MenuButton.UpdateItem record={{ id: 123, author: 'John Doe' }} data={{ status: 'archived' }} />
```
{% endraw %}

### `redirect`

By default, `<MenuButton.UpdateItem>` redirects to the list page after a successful deletion. You can customize the redirection by passing a path as the `redirect` prop:

```jsx
<MenuButton.UpdateItem redirect="/comments" data={{ status: 'archived' }} />
```

### `resource`

By default, `<MenuButton.UpdateItem>` reads the current resource from the `ResourceContext`. If you want to update a record from a different resource, you can pass it as a prop:

{% raw %}
```jsx
<MenuButton.UpdateItem record={{ id: 123, author: 'John Doe' }} resource="comments" data={{ status: 'archived' }} />
```
{% endraw %}

### `successMessage`

![Delete button success message](./img/MenuButton.UpdateItem_success.png)

On success, `<MenuButton.UpdateItem>` displays a "Element updated" notification in English. `<MenuButton.UpdateItem>` uses two successive translation keys to build the success message:

- `resources.{resource}.notifications.updated` as a first choice
- `ra.notification.updated` as a fallback

To customize the notification message, you can set custom translation for these keys in your i18nProvider.

**Tip**: If you choose to use a custom translation, be aware that react-admin uses the same translation message for the `<MenuButton.UpdateItem>`, so the message must support [pluralization](./TranslationTranslating.md#interpolation-pluralization-and-default-translation):

```jsx
const englishMessages = {
    resources: {
        comments: {
            notifications: {
                updated: 'Comment updated |||| %{smart_count} comments updated',
                // ...
            },
        },
    },
};
```

Alternately, pass a `successMessage` prop:

```jsx
<MenuButton.UpdateItem successMessage="Comment archived successfully" data={{ status: 'archived' }} />
```
