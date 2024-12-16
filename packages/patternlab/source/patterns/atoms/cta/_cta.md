---
order: 3
title: CTA
---
# Variables
| Variable      | Type    | Required | Description                                                                         |
|---------------|---------|----------|-------------------------------------------------------------------------------------|
| label         | string  | true     | The label of the cta component                                                      |
| url           | string  | true     | The url of the cta link                                                             |
| color         | string  | false    | The preferred color variation of the cta component                                  |
| color_on_dark | string  | false    | The preferred color if the cta exists on a dark background (defaults to 'reversed') |
| font_weight   | string  | false    | The font weighting of the cta component                                             |
| size          | string  | false    | The size variation of the cta component                                             |
| expand_to_fit | boolean | false    | If true, the cta component will expand the width of parent container                |

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
| Modifier         | Description                                                                       |
|------------------|-----------------------------------------------------------------------------------|
| alt              | If specified, the cta component will have the color modifier of 'alt'             |
| hollow-dotted    | If specified, the cta component will have the color modifier of 'hollow-dotted'   |
| hollow-solid     | If specified, the cta component will have the color modifier of 'hollow-solid'    |
| keystone   | If specified, the cta component will have the color modifier of 'keystone'  |
| light-blue       | If specified, the cta component will have the color modifier of 'light-blue'      |
| expand           | If specified, the cta component will have the color modifier of 'expand'          |
| expand-reversed  | If specified, the cta component will have the color modifier of 'expand-reversed' |

## Dark color modifiers
| Modifier        | Description                                                                       |
|-----------------|-----------------------------------------------------------------------------------|
| reversed        | If specified, the cta component will have the color modifier of 'reversed'        |
| keystone  | If specified, the cta component will have the color modifier of 'keystone'  |
| light-blue      | If specified, the cta component will have the color modifier of 'light-blue'      |

## Icon modifiers
| Modifier       | Description                                                            |
|----------------|------------------------------------------------------------------------|
| icon_before    | If specified, the specified sprite will be placed before the cta label |
| icon_after     | If specified, the specified sprite will be placed after the cta label  |
