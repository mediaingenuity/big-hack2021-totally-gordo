## What's inside?

- Gatsby (v2)
- Storybook (v5)
- Styled Components (v4)

## Quick start

```
$ cd TM-gatsby-boilerplate
$ yarn start

```

### src/pages

Gatsby routing uses the `pages` dir to route single pages.
Create a new react component inside of the pages it will use as a `new route`
using it's files name as a `url`.

```
|-- src
|   |-- pages
|   |   |-- index.jsx
|   |   |-- 404.jsx
|   |   |-- your-page.jsx
```

```
 localhost:8000/your-page
```

### Using a global wrapper component

`src/components/Layout/index.jsx` will wrap all the components add to `src/pages` or `src/templates`
and where wrapping can be applied.
