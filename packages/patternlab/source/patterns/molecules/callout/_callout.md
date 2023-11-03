---
title: Callouts
---
# Variables
| Variable    | Type    | Required | Description                                                           |
|-------------|---------|----------|-----------------------------------------------------------------------|
| content     | string  | true     | The content to render within the heading. May contain arbitrary HTML. |
| background  | string  | false    | Must match a documented background modifier (below).                  |
| width       | string  | false    | Must match a documented width modifier (below).                       |
| padding     | string  | false    | Must match a documented padding modifier (below).                     |

## Background modifiers
| Size          | Description                                               |
|---------------|-----------------------------------------------------------|
| light-grey    | If specified, renders a light grey background variant.    |
| blue-gradient | If specified, renders a blue gradient background variant. |

## Width modifiers
| Modifier | Description                                                  |
|----------|--------------------------------------------------------------|
| narrow   | If specified, content will be constrained to a narrow width. |

## Padding modifiers
| Modifier | Description                                      |
|----------|--------------------------------------------------|
| small    | If specified, a small amount of padding is used. |
| large    | If specified, a large amount of padding is used. |
