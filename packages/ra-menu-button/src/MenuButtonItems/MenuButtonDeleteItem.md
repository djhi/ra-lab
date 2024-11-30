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
