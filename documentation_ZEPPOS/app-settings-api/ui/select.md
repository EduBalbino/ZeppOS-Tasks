
# Select

## Type[​](/docs/1.0/reference/app-settings-api/ui/select/#type "Direct link to Type")

```
(props: Props) => result: RenderFunc  

```
### Props: object[​](/docs/1.0/reference/app-settings-api/ui/select/#props-object "Direct link to Props: object")

| Name | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| label | select label | NO | `string` | - |
| options | select options | NO | `Array<SelectOption>` | - |
| multiple | multiple options | NO | `boolean` | `false` |
| value | selectedValue | NO | `string` or `Array<string>` | - |
| onChange | `(value: SelectValue) => void` | NO | `function` | - |
| title | title | NO | `string` | - |

### SelectOption: object[​](/docs/1.0/reference/app-settings-api/ui/select/#selectoption-object "Direct link to SelectOption: object")

| Name | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| name | option name | NO | `string` | - |
| value | option value | NO | `string` | - |

