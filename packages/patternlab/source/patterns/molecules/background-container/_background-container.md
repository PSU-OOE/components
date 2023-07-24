# Variables
| Variable         | Type   | Required | Description                                               |
|------------------|--------|----------|-----------------------------------------------------------|
| content          | string | true     | The content to render inside the container.               |
| color            | string | true     | Must match a documented color modifier (below).           |
| background_image | string | false    | May match a documented background image modifier (below). |
| padding          | string | false    | May match a documented padding modifier (below).          |
 | width            | string | false    | May match a documented width modifier (below).            |

## Colors
| Color        | Description                        |
|--------------|------------------------------------|
 | light-grey   | Displays a light-grey background   |
 | primary-blue | Displays a primary-blue background |
 | beaver-blue  | Displays a beaver-blue background  |

## Background images
| Image                      | Description                                                                                 |
|----------------------------|---------------------------------------------------------------------------------------------|
| shield:left                | Community shield positioned to the left side of the container.                              |
| shield:right               | Community shield positioned to the right side of the container.                             |
| shield:bottomright         | Community shield positioned to the right-bottom corner of the container                     |
| shield:topleft-bottomright | Dual community shields positioned to the top-left and bottom-right corners of the container |

## Paddings
| Padding | Description                                               |
|---------|-----------------------------------------------------------|
| small   | Adds a small amount of vertical padding to the container. |
| large   | Adds a large amount of vertical padding to the container. |

## Widths
| Width  | Description                                                                  |
|--------|------------------------------------------------------------------------------|
| narrow | Causes a shift in the background sprite to better accommodate narrow spaces. |
