# Variables
| Variable       | Type   | Required | Description                                                  |
|----------------|--------|----------|--------------------------------------------------------------|
| toggle_content | string | true     | The content to render within the drop-button toggle element. |
| panel_content  | string | true     | The content to render within the drop-button panel element.  |
| panel_width    | enum   | false    | Must match a documented width modifier (below).              |
| panel_padding  | enum   | false    | Must match a documented padding modifier (below).            |

## Width modifiers
| Size    | Description                                                 |
|---------|-------------------------------------------------------------|
| wide    | If specified, renders the drop-button panel at a wide size. |

## Padding modifiers
| Size   | Description                                                     |
|--------|-----------------------------------------------------------------|
| none   | If specified, renders the drop-button panel with no padding.    |
| small  | If specified, renders the drop-button panel with small padding. |
