# Variables
| Variable               | Type    | Required | Description                                                                              |
|------------------------|---------|----------|------------------------------------------------------------------------------------------|
| menu_name              | string  | true     | The name of the menu (visible in the accessibility tree).                                |
 | density                | enum    | false    | Overrides the layout density of the menu; must be one of the documented density presets. |
 | highlight_active_trail | boolean | false    | Should the active trail be highlighted with a vertical highlight?                        |
 | parent_item            | object  | false    | If provided, the parent item will be placed at the start and emphasized.                 |
| items                  | array   | true     | The items to include in the menu.                                                        |
| active_item | string | false | The current active url |


## Menu Densities
| Density | Description                                      |
|---------|--------------------------------------------------|
 | tight   | The menu will be displayed with a tight density. |
 | loose   | The menu will be displayed with a loose density. |

## Parent item structure
The parent item is a trimmed down version of the normal menu structure.

| Attribute       | Type    | Required | Description                                                   |
|-----------------|---------|----------|---------------------------------------------------------------|
| title           | string  | true     | The text to display within the link (inline HTML is allowed). | 
| url             | string  | true     | The url of the menu item.                                     |

## Menu item structure
The menu item structure is recursive.  Each item has the following attributes:

| Attribute       | Type    | Required | Description                                                   |
|-----------------|---------|----------|---------------------------------------------------------------|
| title           | string  | true     | The text to display within the link (inline HTML is allowed). | 
 | url             | string  | true     | The url of the menu item.                                     |
 | in_active_trail | boolean | false    | Is the item in the active trail?                              |
 | below           | array   | false    | An array of items that exist under the current item.          |
