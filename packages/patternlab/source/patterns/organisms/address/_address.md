---
title: Bio
---
## A semantic address element
This is an opinionated implementation for physical addresses. Please bear in
mind that other use cases for address semantics are also appropriate. See this
[external documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address)
for alternative use cases.

### Variables
| Variable | Type   | Required | Description                                            | Example(s)                        |
|----------|--------|----------|--------------------------------------------------------|-----------------------------------|
| name     | string | false    | The name on the address.                               | The Pennsylvania State University |
| street   | string | true     | The street number and/or building code on the address. | 128 Outreach Building             |
| locality | string | true     | The locality of the address.                           | University Park                   |
| state    | string | true     | The state of the address.                              | PA                                |
| postcode | string | true     | The postal code of the address.                        | 16802                             |
