# @roofox/remark-gatsby-plugins-wrapper

> A [Remark][remark] plugin to add support for (_some_) [`gatsby-remark-*`][npm-gatsby-remark-*] plugins.

With `@roofox/remark-gatsby-plugins-wrapper` you can use _some_ [`gatsby-remark-*`][npm-gatsby-remark-*] plugins with [Remark][remark].

There are just a couple of [`gatsby-remark-*`][npm-gatsby-remark-*] plugins that works fine with `@roofox/remark-gatsby-plugins-wrapper`, since most plugins depends explicitly on some [gatsby related properties][gatsby-plugin-properties] like actions, store, getNodes, schema, etc. this kind of plugins are not supported within this [Remark][remark] plugin.

## Installation

You need to install `@roofox/remark-gatsby-plugins-wrapper` using NPM or Yarn
When using [Remark][remark].

```bash
npm install -D @roofox/remark-gatsby-plugins-wrapper
yarn add --dev @roofox/remark-gatsby-plugins-wrapper
```

## How to use it

Just add `@roofox/remark-gatsby-plugins-wrapper` with the `use` function as any other [Remark][remark] plugin.

```javascript
const remarkGatsbyPluginsWrapper = require("@roofox/remark-gatsby-plugins-wrapper");
const processor = remark();

processor.use(remarkGatsbyPluginsWrapper);
```

## Adding [`gatsby-remark-*`][npm-gatsby-remark-*] plugins

[Gatsby's documentation][gatsby-plugins-docs] about using plugins is pretty straighforward and `@roofox/remark-gatsby-plugins-wrapper` use the exact same _plugin array_ format:



```javascript
remark()
  .use(require('@roofox/remark-gatsby-plugins-wrapper'), {
    plugins: [
      {
        resolve: "gatsby-remark-smartypants",
        options: {
          dashes: "oldschool"
        }
      },
      {
        resolve: "gatsby-remark-prismjs",
        options: {
          showLineNumbers: true,
        },
      },
    ]
  });
```

## Supported [`gatsby-remark-*`][npm-gatsby-remark-*] plugins

- [`gatsby-remark-prismjs`](https://npm.im/gatsby-remark-prismjs)
- [`gatsby-remark-smartypants`](https://npm.im/gatsby-remark-smartypants)

## Example

1. Create an empty project using `mkdir my-test && npm init -y`.

1. Install the followings dependencies: `npm install remark remark-rehype rehype-raw rehype-format rehype-stringify remark-emoji @roofox/remark-gatsby-plugins-wrapper gatsby-remark-smartypants gatsby-remark-prismjs prismjs`.

2. Create a `test.js` file with the following content:

```javascript
const remark = require("remark");
const remark2rehype = require("remark-rehype");
const raw = require("rehype-raw");
const html2format = require("rehype-format");
const stringify = require("rehype-stringify");
const gatsbyPluginsWrapper = require("@roofox/remark-gatsby-plugins-wrapper");

const processor = remark()
  // A native remark plugin
  .use(require("remark-emoji"))
  // This plugin
  .use(gatsbyPluginsWrapper, {
    // gatsby-remark-* plugins
    plugins: [
      {
        resolve: "gatsby-remark-smartypants",
        options: {
          dashes: "oldschool",
        },
      },
      {
        resolve: "gatsby-remark-prismjs",
        options: {
          showLineNumbers: true,
        },
      },
    ],
  })
  .use(remark2rehype, { allowDangerousHtml: true })
  .use(raw)
  .use(html2format)
  .use(stringify);

const md = `# Title

Lorem ipsum

This is an \`inline code\`.

> "Great quote -- with some style ---"

# :dog: :+1: :-)

\`\`\`javascript
console.log("Hello world");
\`\`\`

**BYE**
`;

processor.process(md, (err, file) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(String(file));
});
```


4. Run `node test.js` and you will get the following output:

```html
<h1>Title</h1>
<p>Lorem ipsum</p>
<p>This is an <code class="language-text">inline code</code>.</p>
<blockquote>
  <p>“Great quote – with some style —”</p>
</blockquote>
<h1>🐶 👍 :-)</h1>
<div class="gatsby-highlight" data-language="javascript">
  <pre style="counter-reset: linenumber NaN" class="language-javascript line-numbers"><code class="language-javascript">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Hello world"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code><span aria-hidden="true" class="line-numbers-rows" style="white-space: normal; width: auto; left: 0;"><span></span></span></pre>
</div>
<p><strong>BYE</strong></p>
```

[remark]: https://remark.js.org/
[npm-gatsby-remark-*]: https://www.npmjs.com/search?q=gatsby-remark-&ranking=popularity
[gatsby-plugins-docs]: https://www.gatsbyjs.com/docs/using-a-plugin-in-your-site/
[gatsby-plugin-properties]: https://www.gatsbyjs.com/tutorial/remark-plugin-tutorial/#setting-up-a-plugin