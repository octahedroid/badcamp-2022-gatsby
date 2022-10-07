# BADCamp 2022 - Decoupling Drupal using GraphQL & Gatsby: A Crash Course

## 0 - Prerequisites
Your computer should be ready for Gatsby v4 and have installed:
- Node (v16.x)
- Yarn (v1.22.x)
- NPM (8.x)
- Git
- Gatsby-CLI

## 1.A - Get the code on your local machine

Use git to clone the code repository

```
git clone git@github.com:octahedroid/badcamp-2022-gatsby.git

cd badcamp-2022-gatsby
``` 

Install dependencies
```
yarn install
```

Start Gatsby on develop mode
```
yarn develop
```

# 1.B Project Structure

```bash
❯ tree src/
```
 
## 1.C - Start gatsby
```
yarn start
```

## 1.D - Visit your Gatsby site

Open the browser and point to http://localhost:8000/

## 1.D - Visit the Graphiql instance of your Gatsby site

Open the browser and point to http://localhost:8000/___graphql

## 1.E - Execute query for all Site pages
```graphql
{
  allSitePage {
    nodes {
      id
      path
    }
  }
}
```

## 2.A - Install Gatsby Source Drupal GraphQL plugin
```
yarn add gatsby-source-drupal-graphql
```

> NOTE: This was done already no need to execute this command

## 2.B - Configure Gatsby Source Drupal GraphQL plugin
Add plugin configuration to `gatsby-config.js` file
```javascript
    {
      resolve: `gatsby-source-drupal-graphql`,
      options: {
        baseUrl: process.env.DRUPAL_BASE_URL,
        endPoint: process.env.DRUPAL_ENDPOINT,
        environment: process.env.NODE_ENV,
        concurrency: 10,
        auth: {
          oauth: {
            baseUrl: process.env.DRUPAL_BASE_URL,
            user: process.env.DRUPAL_AUTH_USERNAME,
            password: process.env.DRUPAL_AUTH_PASSWORD,
            clientId: process.env.DRUPAL_AUTH_CLIENT_ID
          },
        },
      },
    },
```

## 2.C - Create .env files
```bash
cp .env.dist .env.development
cp .env.dist .env.production
```

> NOTE: Copy values from instructor shared screen

## 3.A - Start gatsby
```
yarn start
```

## 3.B - Visit the Graphiql instance of your Gatsby site

Open the browser and point to http://localhost:8000/___graphql


## 3.C - Execute query for Node Pages

Copy/paste the following GraphQl query

```graphql
{
  allDrupalNodePage {
    nodes {
      id
      title
      path
      body {
        processed
      }
    }
  }
}
```

## 3.D - Execute query for Node Articles

Copy/paste the following GraphQl query

```graphql
{
  allDrupalNodeArticle {
    nodes {
      id
      title
      path
      body {
        processed
      }
      image {
        mediaImage {
          url
        }
        gatsbyImage {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
}
```

## 3.D - Execute query for a single Node Page

Copy/paste the following GraphQl query

```graphql

```

---

## 4.A - Create gatsby-node.js file
Create `gatsby-node.js` file and paste code
```javascript
const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  return graphql(`
    query {
      allDrupalNodeArticle {
        nodes {
          id 
          path
        }
      }
      allDrupalNodePage {
        nodes {
          id 
          path
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create allDrupalNodeArticle
    const articles = result.data.allDrupalNodeArticle.nodes;
    articles.forEach((article) => {
      actions.createPage({
        path: article.path,
        component: path.resolve("src/templates/article.js"),
        context: {
          id: article.id,
        },
      });
    });

    // Create allDrupalNodePage
    const pages = result.data.allDrupalNodePage.nodes;
    pages.forEach((page) => {
      actions.createPage({
        path: page.path === "/home" ? "/" : page.path,
        component: path.resolve("src/templates/page.js"),
        context: {
          id: page.id,
        },
      });
    });
  });
};
```

## 4.B - Create template file
Create `src/templates/article.js` file and paste code
```javascript
import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Article({ data: { node } }) {
  return (
    <Container>
      <Header />
      <article className="prose prose-lg max-w-6xl mx-auto">
        <pre>
            { JSON.stringify(node, {}, 2) }
        </pre>
      </article>
      <Footer />
    </Container>
  );
}

export const query = graphql`
  query drupalNodeArticle($id: String) {
    node: drupalNodeArticle(id: {eq: $id}) {
      title
      body {
        processed
      }
    }
  }
`
```

## 4.C - Create template file
Create `src/templates/page.js` file and paste code
```javascript
import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Page({ data: { node } }) {
  return (
    <Container>
      <Header />
      <article className="prose prose-lg max-w-6xl mx-auto">
        <pre>
            { JSON.stringify(node, {}, 2) }
        </pre>
      </article>
      <Footer />
    </Container>
  );
}

export const query = graphql`
  query drupalNodePage($id: String) {
    node: drupalNodePage(id: {eq: $id}) {
      title
      body {
        processed
      }
    }
  }
`
```

## 4.D - Remove index.js file
Remove `src/pages/index.js` index file

---

## 5.A - Rendering field data

Open page file `src/templates/page.js`

Remove JSON output

```html
<pre>
    { JSON.stringify(node, {}, 2) }
</pre>
```

Import components
```javascript
import Title from "../components/field/title";
import Body from "../components/field/body";
```

Add components to the page 
```javascript
<Title>{node.title}</Title>

<Body
  content={node?.body?.processed}
/>
```

## 5.B - Show/Hide field title feature

Open page file `src/templates/page.js`

Add `showTitle` to GraphLQ Query
```graphql
    showTitle
```

Replace original code:

```javascript
<Title>{node.title}</Title>
```

With this code containing the showTitle value validation to show/hide the title component

```javascript
{ node.showTitle && <Title>{node.title}</Title> }
```

## 6.A - Serve inline-images from Drupal CMS

Open `gatsby-config.js` file and add configuration
```javascript
        inlineImages: {
          'NodeArticle': ['body'],
          'NodePage': ['body'],
        }
```

Open page file `src/templates/page.js` 

Add `processedWithInlineImages` field to GraphLQ Query
```graphql
# GraphQL Customization Fields
fields {
  processedWithInlineImages
}
```

Update `Body` component to use previously added field

```javascript
<Body
  content={node.fields.processedWithInlineImages}
/>
```

Instead of 
```javascript
<Body
  content={node?.body?.processed}
/>
```

> Check `gatsby-node.js` for code to replace image relativePath with remotePath

## 6.B - Serve images as Gatsby Images

Open page file `src/templates/page.js` 

Add `inlineImages` field to GraphLQ Query
```graphql
# GraphQL Customization Fields
fields {
    ...
    inlineImages {
      remotePath
      gatsbyImage {
        childImageSharp {
          gatsbyImageData(width: 1024)
        }
      }
    }
}
```

Replace original `Body` compoenent with `BodyInlineImages`:

```javascript
import BodyInlineImages from "../components/field/body-inline-images";
```

With the recently imported `BodyInlineImages` component

```javascript
<BodyInlineImages
  content={node?.fields?.processedWithInlineImages}
  inlineImages={node.fields.inlineImages}
/>
```
---

## 7.A - Replace Body field with Paragraphs and React components

Add `components` field
```graphql
      components {
        __typename
        ...ParagraphBlogTeaser
        ...ParagraphHeroCta
        ...ParagraphImage
        ...ParagraphText
      }
```

> Check `src/helpers/fragments.js` for code related to GraphQL query fragments

Import `uuid` library and `componentResolver` helper
```javascript
import uuid from "react-uuid"
import { componentResolver } from "../helpers/component-resolver"
```

Call `componentResolver` helper

```javascript
const components = componentResolver(node?.components);
```

> NOTE: Check `src/helpers/component-resolver.js` file for resolvers

## 7.B - Replace `BodyInlineImages` component:

```javascript
<BodyInlineImages
  content={node?.fields?.processedWithInlineImages}
  inlineImages={node.fields.inlineImages}
/>
```

With the `components` array constant

```javascript
{components &&
  components.map((item) => {
    return <React.Fragment key={uuid()}>{item}</React.Fragment>
})}
```

## 7.C - Remove no longer needed classNames at `src/templates/page.js` html
```javascript
<article className="prose prose-lg max-w-6xl mx-auto">
```

It should look like this:
```
<article>
```

--- 

## 8.A - Rendering field data

Open page file `src/templates/article.js`

Remove JSON output
```html
<pre>
    { JSON.stringify(node, {}, 2) }
</pre>
```

Add fields to GraphQL Query 
```graphql
      created
      author {
        displayName
        picture {
          gatsbyImage {
            childImageSharp {
              gatsbyImageData(layout: FIXED, width: 48, height: 48)
            }
          }
        }
      }
      image {
        gatsbyImage {
          childImageSharp {
            gatsbyImageData(width: 1500)
          }
        }
      }
```

Add code 
```javascript
  const author = {
    name: node.author.displayName,
    picture: node.author.picture.gatsbyImage.childImageSharp,
  }
```

Import component
```javascript
import Cover from "../components/cover";
```

Add `Cover` component to the page

```javascript
<Cover
  className="prose prose-lg max-w-6xl mx-auto"
  title={node.title}
  coverImage={node.image.gatsbyImage.childImageSharp}
  date={node.created}
  author={author}
/>
```

## 8.B - Add and React components

Add `components` field

```graphql
      components {
        __typename
        ...ParagraphHeroCta
        ...ParagraphHeroText
        ...ParagraphImage
        ...ParagraphText
        ...ParagraphCodeBlock
      }
```

## 8.C - Import `uuid` library and `componentResolver` helper
```javascript
import uuid from "react-uuid"
import { componentResolver } from "../helpers/component-resolver"
```

Call `componentResolver` helper

```javascript
const components = componentResolver(node?.components);
```

And render the `components` array constant

```javascript
{components &&
  components.map((item) => {
    return <React.Fragment key={uuid()}>{item}</React.Fragment>
})}
```

## 8.D - Remove no longer needed classNames at `article` html
```javascript
<article className="prose prose-lg max-w-6xl mx-auto">
```

It should look like this:
```html
<article>
```

---

## Q & A

Used Drupal Modules:
- https://www.drupal.org/project/graphql_compose
- https://www.drupal.org/project/simple_oauth
- https://www.drupal.org/project/build_hooks

Other Drupal Modules:
- https://www.drupal.org/project/yaml_content
- https://www.drupal.org/project/gatsby
