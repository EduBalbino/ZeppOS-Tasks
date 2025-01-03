
# Auth OAUTH

## Type[​](/docs/1.0/reference/app-settings-api/ui/auth/#type "Direct link to Type")

```
(props: Props) => result: RenderFunc  

```
## Props: object[​](/docs/1.0/reference/app-settings-api/ui/auth/#props-object "Direct link to Props: object")

| Name | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| title | The title of the OAuth component | NO | `string` | - |
| label | The label text of the OAuth component | NO | `string` | - |
| description | The description of the OAuth component | NO | `string` | - |
| authorizeUrl | Url for requesting user authorization for the Token | NO | `string` | - |
| requestTokenUrl | Url to get the unauthorized Token | NO | `string` | - |
| clientId | The client ID specified on the authorized provider account | NO | `string` | - |
| clientSecret | The password corresponding to the specified client ID on the authorized provider's account | NO | `string` | - |
| scope | the scope of the request being made | NO | `string` | - |
| pkce | Protect authorization code authorization. This is actually a cryptographic means of ensuring that a malicious third party canNOt exchange Access Token to the authentication server even if they intercept the Authorization Code or other key. | NO | `boolean` | - |
| onAccessToken | A function that receives the accessToken and anything provided by OAuth (such as refresh tokens and expiration times) | NO | `function` | - |
| onReturn | A function that receives an oauthCode | NO | `function` | - |

