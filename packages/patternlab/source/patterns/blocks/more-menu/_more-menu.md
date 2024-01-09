# Variables
| Variable   | Type   | Required | Description                                                       |
|------------|--------|----------|-------------------------------------------------------------------|
| links      | array  | true     | An array of links to render within the menu.                      |
| more_label | string | false    | Phrasing content to render as the more label. Defaults to "More". |

## Link Structure
Each link has the following attributes:

| Attribute | Type   | Required  | Description           |
|-----------|--------|-----------|-----------------------|
| url       | string | true      | The URL of the link.  |
| label     | string | true      | The label of th link. |
