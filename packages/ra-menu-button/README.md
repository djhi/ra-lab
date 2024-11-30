# ra-menu-button

A component for react-admin that renders a MUI button which displays a menu when clicked.

## MenuButton

### Props

`<MenuButton>` expects the following props:

| Name           | Required | Type           | Default                   | Description |
| -------------- | -------- | -------------- | ------------------------- | --- |
| `children`     | Required | `string`       | -                         | The menu items |
| `button`       |          | `string`       | `<MenuButton.IconButton>` | The button that opens the menu on click |

## `<MenuButtonDeleteItem>`

### Props

`<MenuButtonDeleteItem>` expects the following props:

| Name           | Required | Type           | Default                   | Description |
| -------------- | -------- | -------------- | ------------------------- | --- |
| `mutationMode` |          | `undoable|optimistic|pessimistic` | -                         | The mutation mode |
