
# Fetch API

The Fetch API can be used to send HTTP requests in JS. The use of `fetch()` in the "Side Service" can be found in [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

When called by passing in a `URL` address string, it is a `GET` request.

```
const url = 'https://xxx.com/api/xxx'  
const { body: { data = {} } = {} } = await fetch(url)  

```

When more request parameters need to be passed, the behavior differs from the standard Fetch API in that all parameters are in a single object and only the `url`, `method`, `headers`, and `body` attributes are supported.

```
const res = await fetch({  
  url: 'https://xxx.com/api/xxx',  
  method: 'POST',  
  headers: {  
    'Content-Type': 'application/json'  
  },  
  body: JSON.stringify({  
    text: 'Hello Zepp OS'  
  })  
})  
  
const data = typeof res.body === 'string' ?  JSON.parse(res.body) : res.body  

```

caution

Due to the compatibility of the models, `res.body` on some models is a string of JSON. It is suggested that developers should add compatibility judgment when processing the returned data.

`const data = typeof res.body === 'string' ? JSON.parse(res.body) : res.body`


tip

For a sample of the Fetch API used in an Mini Program, see [FetchAPI](/docs/1.0/samples/app/fetchAPI/).

