---
order: 3
title: Headings
---
# Variables
| Variable | Type    | Required | Description                                                                 |
|----------|---------|----------|-----------------------------------------------------------------------------|
| content  | string  | true     | The content to render within the heading.                                   |
| level    | integer | false    | An integer, between 1 and 6 that denotes the heading level.  Defaults to 2. |
| size     | string  | false    | **DEPRECATED: Use "style" instead.**                                        |
| style    | string  | false    | Must match a documented style modifier (below).                             |
| color    | string  | false    | Must match a documented color modifier (below).                             |

## Style modifiers
| Size   | Description                                                       |
|--------|-------------------------------------------------------------------|
| xlarge | This style looks like an &lt;h1&gt;                               |
| large  | This style looks like an &lt;h2&gt;                               |
| medium | This style looks like an &lt;h3&gt;                               |
| small  | This style looks like an &lt;h4&gt;                               |
| xsmall | This style looks like an &lt;h5&gt;                               |
| hr     | This style renders the heading in a horizontal-rule-like fashion. |

## Color modifiers
| Color   | Description                                           |
|---------|-------------------------------------------------------|
| neutral | If specified, the color of the heading becomes Slate. |

## Position modifiers
| Modifier | Description                                                                                 |
|----------|---------------------------------------------------------------------------------------------|
| flush    | If specified, the heading will be shifted up to avoid extra space in the upper line-height. |
