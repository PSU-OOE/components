---
title: Event Spotlight
---

### Variables
| Variable        | Type    | Required | Description                                                                                                                     |
|-----------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------|
| images          | array   | true     | One or more ***decorative*** images to display on the spotlight. If more than one image is provided, one is displayed randomly. |
| heading_level   | integer | true     | The heading level to use in the spotlight.                                                                                      |
| title           | string  | true     | The title of the event.                                                                                                         |
| url             | string  | true     | The url of the event.                                                                                                           |
| start           | string  | false    | The start datetime of the event (if applicable).                                                                                |
| end             | string  | false    | The end datetime of the event (if applicable).                                                                                  |
| timezone        | string  | false    | The timezone to display the event in (if applicable).                                                                           |
| cta_text        | string  | false    | Optional call to action text to display in the spotlight.                                                                       |
| all_events_text | string  | false    | Optional text for an all events page link.                                                                                      |
| all_events_url  | string  | false    | Optional url to an all events page.                                                                                             |
| use_cta_button  | boolean | false    | ***This is only included as a food for thought example -- will be removed!***                                                   |
