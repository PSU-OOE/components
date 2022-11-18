---
title: Bio
---

### Variables
| Variable      | Type   | Required | Description                                                                                                          |
|---------------|--------|----------|----------------------------------------------------------------------------------------------------------------------|
| legacy_title  | string | false    | A string to render without heading semantics.  Only useful for legacy configurations.  This will be removed in 2.0.0 |
| title         | object | false    | A heading object.                                                                                                    |
| profile_photo | string | false    | The profile photo.                                                                                                   |
| job_title     | string | false    | The job title.                                                                                                       |
| credentials   | array  | false    | An array of credential objects.                                                                                      |
| content       | string | true     | A short bit of introduction content about the person being represented.                                              |
| link          | object | false    | An optional link object to a full bio page.                                                                          |
