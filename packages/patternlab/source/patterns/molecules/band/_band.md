# Variables
| Variable   | Type   | Required | Description                                                                                                                         |
|------------|--------|----------|-------------------------------------------------------------------------------------------------------------------------------------|
| content    | string | true     | The content to render inside the container.                                                                                         |
 | background | string | false    | May match a documented background modifier (below). If not overridden, a default background color is applied.                       |
 | padding    | string | false    | May match a documented padding modifier (below). If not overridden, a default amount of vertical padding is added to the container. |

## Backgrounds
| Background    | Description                                      |
|---------------|--------------------------------------------------|
| secondary     | Display the band in a secondary color profile    |
| hub-geometric | Display the band with a hub geometric background |

## Paddings
| Padding | Description                                                    |
|---------|----------------------------------------------------------------|
| compact | Applies a smaller amount of vertical padding to the container. |
| none    | Applies no vertical padding to the container.                  |
