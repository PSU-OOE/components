# Variables
| Variable | Type   | Required | Description                                       |
|----------|--------|----------|---------------------------------------------------|
| content  | string | true     | The content to render inside the container.       |
| color    | string | true     | Must match a documented color modifier (below).   |
| sprite   | string | false    | May match a documented sprite modifier (below).   |
| position | string | false    | May match a documented position modifier (below). |
| padding  | string | false    | May match a documented padding modifier (below).  |
 | width    | string | false    | May match a documented width modifier (below).    |

## Colors
| Color      | Description                      |
|------------|----------------------------------|
 | light-grey | Displays a light-grey background |

## Sprites
| Sprite | Description            |
|--------|------------------------|
| shield | Displays a shield SVG. |

## Positions
| Position | Description                                          |
|----------|------------------------------------------------------|
 | left     | Displays a configured sprite on the left-hand side.  |
| right    | Displays a configured sprite on the right-hand side. |

## Paddings
| Padding | Description                                               |
|---------|-----------------------------------------------------------|
| small   | Adds a small amount of vertical padding to the container. |
| large   | Adds a large amount of vertical padding to the container. |

## Widths
| Width  | Description                                                                  |
|--------|------------------------------------------------------------------------------|
| narrow | Causes a shift in the background sprite to better accommodate narrow spaces. |
