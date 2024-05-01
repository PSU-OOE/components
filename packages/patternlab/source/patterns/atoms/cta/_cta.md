---
order: 3
title: CTA
---
# Variables
| Variable      | Type    | Required | Description                                                                                                                |
|---------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------|
| size          | string  | false    | The size variation of the cta component                                                                                    |
| expand_to_fit | boolean | false    | If true, the cta component will expand the width of parent container                                                       |
| color         | string  | false    | The forced color variation of the cta component (**for enhanced accessibility, use the light/dark feature when possible**) |
| color_light   | string  | false    | The preferred color if the cta exists on a light background                                                                |
| color_dark    | string  | false    | The preferred color if the cta exists on a dark background                                                                 |
| font_weight   | string  | false    | The font weighting of the cta component                                                                                    |
| label         | string  | false    | The label of the cta component                                                                                             |
| url           | string  | false    | The url of the cta link                                                                                                    |


## Size modifiers
| Size               | Description                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| xcompact           | An xcompact version of the cta                                                    |
| compact            | A compact version of the cta                                                      |
| compact-responsive | A compact-responsive version of the cta. Matches xcompact until medium breakpoint |

## Font weight modifiers
| Modifier | Description                                    |
|----------|------------------------------------------------|
| bold     | If specified, the cta component will be bolded |

## Color modifiers
| Modifier       | Description                                                                      |
|----------------|----------------------------------------------------------------------------------|
| alt            | If specified, the cta component will have the color modifier of 'alt'            |
| expand         | If specified, the cta component will have the color modifier of 'expand'         |
| hollow-dotted  | If specified, the cta component will have the color modifier of 'hollow-dotted'  |
| hollow-solid   | If specified, the cta component will have the color modifier of 'hollow-solid'   |
| color-keystone | If specified, the cta component will have the color modifier of 'color-keystone' |
| light-blue     | If specified, the cta component will have the color modifier of 'light-blue'     |
| reversed       | If specified, the cta component will have the color modifier of 'reversed'       |

## Icon modifiers
| Modifier       | Description                                                            |
|----------------|------------------------------------------------------------------------|
| icon_before    | If specified, the specified sprite will be placed before the cta label |
| icon_after     | If specified, the specified sprite will be placed after the cta label  |
