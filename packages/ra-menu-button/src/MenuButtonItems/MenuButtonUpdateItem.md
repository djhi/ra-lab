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
