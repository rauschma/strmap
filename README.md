A simple map from strings to values in JavaScript
=================================================

This implementation avoids the pitfalls of directly using objects for this purpose.

Usage on Node.js (on browsers, you need an AMD-compatible script loader such as [RequireJS](http://requirejs.org/)):

    > var strmap = require("./strmap");
    > var map = new strmap.StrMap({ foo: 1, bar: 2});
    > map.get("foo")
    1
    > map.set("foo", "abc")

Tests
-----

- Run the tests via [Mocha](http://visionmedia.github.com/mocha/).
- Assertion API: [expect.js](https://github.com/LearnBoost/expect.js).
