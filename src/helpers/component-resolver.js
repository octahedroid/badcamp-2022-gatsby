import React from "react"

import ParagraphBlogTeaser from "../components/paragraph/paragraph-blog-teasers";
import ParagraphHeroCta from "../components/paragraph/paragraph-hero-cta";
import ParagraphImage from "../components/paragraph/paragraph-image";
import ParagraphText from "../components/paragraph/paragraph-text";
import ParagraphCodeBlock from "../components/paragraph/paragraph-code-block";

const resolve = (component) => {

    if (component.__typename.includes(`ParagraphBlogTeaser`)) {
        return (
            <ParagraphBlogTeaser />
        )
    }

    if (component.__typename.includes(`ParagraphHeroCta`)) {
        return (
            <ParagraphHeroCta 
                intro={component.intro}
                title={component.title}
                text={component.text}
                links={component.cta}
            />
        )
    }

    if (component.__typename.includes(`ParagraphImage`)) {
        return (
            <ParagraphImage 
                image={component.image.childImageSharp.gatsbyImageData}
            />
        )
    }

    if (component.__typename.includes(`ParagraphText`)) {
        return (
            <ParagraphText 
                title={component.title}
                text={component.textRich.processed}
            />
        )
    }

    if (component.__typename.includes(`ParagraphCodeBlock`)) {
        return (
            <ParagraphCodeBlock 
                title={component.title}
                code={component.code}
                language={component.language}
                showLineNumbers={component.showLineNumbers}
            />
        )
    }

    return <></>
}

export const componentResolver = (data = []) => {
    const components = []

    data.forEach((component) => {
        components.push(resolve(component))
    })

    return components
}

export default componentResolver;
