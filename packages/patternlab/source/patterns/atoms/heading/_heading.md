---
order: 3
title: Headings
---
# Variables
| Variable     | Type    | Required | Description                                                                 |
|--------------|---------|----------|-----------------------------------------------------------------------------|
| content      | string  | true     | The content to render within the heading. May contain arbitrary HTML.       |
| level        | integer | false    | An integer, between 1 and 6 that denotes the heading level.  Defaults to 2. |
| size         | string  | false    | Must match a documented size modifier (below).                              |
| align        | string  | false    | Must match a documented align modifier (below).                             |
| vspace       | string  | false    | Must match a documented vertical space modifier (below).                    |
| position     | string  | false    | Must match a documented position modifier (below).                          |
| no_overline  | boolean | false    | If specified, the heading will never render with an overline decoration.    |
| subtle       | boolean | false    | If specified, the heading will render with a subtle look.                   |

## Size modifiers
| Size    | Description                         |
|---------|-------------------------------------|
| xlarge  | This style looks like an &lt;h1&gt; |
| large   | This style looks like an &lt;h2&gt; |
| medium  | This style looks like an &lt;h3&gt; |
| small   | This style looks like an &lt;h4&gt; |
| xsmall  | This style looks like an &lt;h5&gt; |
| 2xsmall | This style looks like an &lt;h6&gt; |

## Position modifiers
| Modifier | Description                                                                                 |
|----------|---------------------------------------------------------------------------------------------|
| flush    | If specified, the heading will be shifted up to avoid extra space in the upper line-height. |

## Align modifiers
| Modifier | Description                                       |
|----------|---------------------------------------------------|
| left     | If specified, the heading will be left aligned.   |
| center   | If specified, the heading will be center aligned. |
| right    | If specified, the heading will be right aligned.  |

## Vertical space modifiers
| Modifier | Description                                               |
|----------|-----------------------------------------------------------|
| none     | If specified, the heading will have no margin bottom      |
| small    | If specified, the heading will have a small margin bottom |
| large    | If specified, the heading will have a large margin bottom |
