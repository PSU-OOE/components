# Variables
| Variable      | Type    | Required | Description                                                                                                               |
|---------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------|
| label         | string  | true     | The label of the button                                                                                                   |
| label_clamp   | integer | false    | If specified, allows the label to wrap to N lines before being truncated.                                                 |
| type          | string  | false    | The type of the button, must match an enumerated value if specified, defalts to 'button'.                                 |
| expanded      | bool    | false    | If true, the button will be rendered in expanded state. This is typically used in conjunction with the controls property. |
| controls      | string  | false    | The id attribute of the element that this button controls.                                                                |
| color         | string  | false    | The preferred color variation of the button                                                                               |
| color_on_dark | string  | false    | The preferred color if the button exists on a dark background (defaults to 'reversed')                                    |
| font_weight   | string  | false    | The font weighting of the button                                                                                          |
| size          | string  | false    | The size variation of the button                                                                                          |
| expand_to_fit | boolean | false    | If true, the button will expand the width of parent container                                                             |
| classes       | array   | false    | An array of additional classes.                                                                                           |

## Type modifiers
| Type   | Description                                                               |
|--------|---------------------------------------------------------------------------|
| button | The button is a clickable button                                          |
| submit | The button is a submit button (submits form-data)                         |
| reset  | The button is a reset button (resets the form-data to its initial values) |

## Size modifiers
| Size               | Description                                                                          |
|--------------------|--------------------------------------------------------------------------------------|
| xcompact           | An xcompact version of the button                                                    |
| compact            | A compact version of the button                                                      |
| compact-responsive | A compact-responsive version of the button. Matches xcompact until medium breakpoint |
| medium             | A medium version of the button                                                       |

## Font weight modifiers
| Modifier | Description                               |
|----------|-------------------------------------------|
| bold     | If specified, the button will be bolded   |

## Color modifiers
| Modifier        | Description                                                      |
|-----------------|------------------------------------------------------------------|
| alt             | If specified, the button will have the 'alt' color.              |
| hollow-dotted   | If specified, the button will have the 'hollow-dotted' color.    |
| hollow-solid    | If specified, the button will have the 'hollow-solid' color.     |
| keystone        | If specified, the button will have the 'keystone' color.         |
| keystone-light  | If specified, the button will have the 'keystone-light' color.   |
| light-blue      | If specified, the button will have the 'light-blue' color.       |

## Dark color modifiers
| Modifier       | Description                                                                       |
|----------------|-----------------------------------------------------------------------------------|
| keystone       | If specified, the button will have the 'keystone' color in dark containers.       |
| keystone-light | If specified, the button will have the 'keystone-light' color in dark containers. |
| light-blue     | If specified, the button will have the 'light-blue' in dark containers.           |

## Icon modifiers
| Modifier       | Description                                                               |
|----------------|---------------------------------------------------------------------------|
| icon_before    | If specified, the specified sprite will be placed before the button label |
| icon_after     | If specified, the specified sprite will be placed after the button label  |
