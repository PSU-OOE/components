# Variables

| Variable     | Type   | Required | Description                                                                                       |
|--------------|--------|----------|---------------------------------------------------------------------------------------------------|
| menu_name    | string | true     | The name of the menu (visible in the accessibility tree).                                         |
| items        | array  | true     | The items to include in the menu.                                                                 |
| current_path | string | false    | The current path (used to determine if an item is ```aria-current```). Use is highly recommended. |

## Menu item structure

The menu item structure is recursive. Each item has the following attributes:

| Attribute       | Type    | Required | Description                                                   |
|-----------------|---------|----------|---------------------------------------------------------------|
| title           | string  | true     | The text to display within the link (inline HTML is allowed). | 
| url             | string  | true     | The url of the menu item.                                     |
| in_active_trail | boolean | false    | Is the item in the active trail?                              |
| below           | array   | false    | An array of items that exist under the current item.          |
