import { graphql } from "gatsby"

export const ParagraphBlogTeaser = graphql`
  fragment ParagraphBlogTeaser on DrupalParagraphBlogTeaser {
    id
  }
`
// TODO: check why is retuning null
export const ParagraphHeroCta = graphql`
  fragment ParagraphHeroCta on DrupalParagraphHeroCta {
    id
    intro
    title
    text
    cta {
      uri
      link
      title
    }
  }
`

export const ParagraphText = graphql`
  fragment ParagraphText on DrupalParagraphText {
    id
    title
    textRich {
      processed
    }
  }
`

export const ParagraphHeroText = graphql`
  fragment ParagraphHeroText on DrupalParagraphHeroText {
    id
    intro
    text
    title
  }
`

export const ParagraphImage = graphql`
  fragment ParagraphImage on DrupalParagraphImage {
    id
    image {
      gatsbyImage {
        childImageSharp {
          gatsbyImageData(width: 1024)
        }
      }
    }
  }
`

export const ParagraphCodeBlock = graphql`
  fragment ParagraphCodeBlock on DrupalParagraphCodeBlock {
    title
    code
    language
    showLineNumbers
  }
`
