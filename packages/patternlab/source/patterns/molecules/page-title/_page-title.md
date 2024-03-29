---
title: Page Title
---
The page title component provides a stylized, semantic `<h1>`
element for use on pages. It is generally not rendered out individually, but
rather as part of a larger component.

# Variables
| Variable        | Type    | Required | Description                                                                                                      |
|-----------------|---------|----------|------------------------------------------------------------------------------------------------------------------|
| title           | string  | true     | The primary content to render semantically within the heading. May only contain plaintext, no HTML.              |
| subtitle_before | string  | false    | Optional content to render within the semantic heading, before the title. May only contain plaintext, no HTML.   |
| subtitle_after  | string  | false    | Optional content to render within the semantic heading, after the title. May only contain plaintext, no HTML.    |
| reversed        | boolean | false    | If specified, the page title will render with a reversed color profile.                                          |
