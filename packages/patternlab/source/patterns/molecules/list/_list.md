# Variables
| Variable      | Type   | Required | Description                                             |
|---------------|--------|----------|---------------------------------------------------------|
| list_semantic | enum   | false    | Must match a semantic option. Defaults to unordered.    |
| orientation   | enum   | false    | Must match an orientation option. Defaults to vertical. |
| separator     | enum   | false    | Must match a separator option. Defaults to none.        |
| density       | enum   | false    | Must match a density option. Defaults to normal.        |
| items         | array  | true     | An array of list items to render.                       |

## Semantic options
| Modifier | Description                            |
|----------|----------------------------------------|
| ordered  | If specified, renders an ordered list. |

## Orientation options
| Modifier   | Description                                    |
|------------|------------------------------------------------|
| horizontal | If specified, renders list items horizontally. |

## Separator options
| Modifier | Description                                    |
|----------|------------------------------------------------|
| dot      | If specified, renders dots between list items. |

## Density options
| Modifier | Description                               |
|----------|-------------------------------------------|
| loose    | If specified, renders list items loosely. |
