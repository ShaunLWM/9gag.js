# 9GAG.js

[![npm](https://img.shields.io/npm/v/9gag.js.svg)]()
[!["Monthly Download"](https://img.shields.io/npm/dm/9gag.js.svg)](https://npmjs.org/package/9gag.js)
[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ShaunLWM/9gag.js/blob/master/LICENSE)

The simplest 9Gag API you've ever met.

## Installation

```bash
node install 9gag.js
yarn add 9gag.js
```

### Usage

Look in example.js for more information

```javascript
const NineGag = require("9gag.js")
(async () => {
    // Fetch the first page of the hot section
    let hot = await NineGag.getType({ type: "hot" });
    console.log(hot["posts"]);
})();
```

## Methods
``` getType({ type = "hot", cursor = "", simplified = false }) ```

``` Returns { posts: [...], cursor: "..." } ```
- Returns an object with an array of posts and a cursor. ```type``` can be "hot", "trending" or "fresh", ```cursor``` value is found in the cursor value of the returned results. ```simplified = true``` returns only necessary values.

```getComments({ id = "", orderKey = "", simplified = false  })```

``` Returns [...] ```
- Returns an array of comments.  ```id``` is the post unique id. ```orderKey``` allows pagination where the value can be found in the ```orderKey``` of each comment result. ```simplified = true``` returns only necessary values.

## License
MIT - Shaun (2019)