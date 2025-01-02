
# JavaScript Support

## Running restrictions[​](/docs/1.0/guides/framework/device/js-support/#running-restrictions "Direct link to Running restrictions")

For security reasons, dynamic execution of JS code is not allowed in Mini Programs, i.e.

* JS code execution using `eval` is not supported
* The use of `new Function` to create functions is not supported
  + except for `new Function('return this')`.

## ECMAScript Support[​](/docs/1.0/guides/framework/device/js-support/#ecmascript-support "Direct link to ECMAScript Support")

ES6 language features are supported, the following features are not supported:

* Promise
* Generator functions
* Timers
