---
title: Bio
---
## A physical address element
This is an opinionated implementation for physical addresses.

### When to use address semantics?
When the physical address is related to the nearest article or body ancestor
element, semantics should be used.  For other addresses, semantics should
be omitted.

## Variables
| Variable | Type    | Required | Description                                            | Example(s)                        |
|----------|---------|----------|--------------------------------------------------------|-----------------------------------|
| semantic | boolean | false    | If TRUE, a semantic address will be rendered.          | true                              |
| name     | string  | false    | The name on the address.                               | The Pennsylvania State University |
| street   | string  | true     | The street number and/or building code on the address. | 128 Outreach Building             |
| locality | string  | true     | The locality of the address.                           | University Park                   |
| state    | string  | true     | The state of the address.                              | PA                                |
| postcode | string  | true     | The postal code of the address.                        | 16802                             |
