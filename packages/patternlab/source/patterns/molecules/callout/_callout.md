---
title: Callouts
---
# Variables
| Variable           | Type   | Required | Description                                                           |
|--------------------|--------|----------|-----------------------------------------------------------------------|
| content            | string | true     | The content to render within the heading. May contain arbitrary HTML. |
| background         | string | false    | Must match a documented background modifier (below).                  |
| shadow             | string | false    | Must match a documented shadow modifier (below).                      |
| width              | string | false    | Must match a documented width modifier (below).                       |
| padding_vertical   | string | false    | Must match a documented padding vertical modifier (below).            |
| padding_horizontal | string | false    | Must match a documented padding vertical modifier (below).            |

## Background modifiers
| Size          | Description                                               |
|---------------|-----------------------------------------------------------|
| white         | If specified, renders a white background variant.         |
| light-grey    | If specified, renders a light grey background variant.    |
| blue-gradient | If specified, renders a blue gradient background variant. |
 | blue          | If specified, renders a blue background variant.          |

## Shadow modifiers
| Shadow   | Description                              |
|----------|------------------------------------------|
| standard | If specified, renders a standard shadow. |

## Width modifiers
| Modifier | Description                                                  |
|----------|--------------------------------------------------------------|
| narrow   | If specified, content will be constrained to a narrow width. |

## Vertical padding modifiers
| Modifier          | Description                                                                               |
|-------------------|-------------------------------------------------------------------------------------------|
| xsmall            | If specified, an extra small amount of padding is used.                                   |
| small             | If specified, a small amount of padding is used.                                          |
| small-percentage  | If specified, a small amount of variable padding is used, clamped by two sentinel values. |
| medium-percentage | If specified, a small amount of variable padding is used, clamped by two sentinel values. |
| large-percentage  | If specified, a small amount of variable padding is used, clamped by two sentinel values. |

## Horizontal padding modifiers
| Modifier          | Description                                                                               |
|-------------------|-------------------------------------------------------------------------------------------|
| small-percentage  | If specified, a small amount of variable padding is used, clamped by two sentinel values. |
| medium-percentage | If specified, a small amount of variable padding is used, clamped by two sentinel values. |
| large-percentage  | If specified, a small amount of variable padding is used, clamped by two sentinel values. |
