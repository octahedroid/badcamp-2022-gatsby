import React from "react";
import ReactHtmlParser from "react-html-parser";
import { GatsbyImage } from "gatsby-plugin-image";

export const htmlParser = (content, inlineImages = []) => {
    const options = {
        decodeEntities: true,
        transform: (htmlnode) => {
            if (htmlnode.type === "tag" && htmlnode.name === "img") {
                const inlineImage = inlineImages.find((inlineImage) => {
                    return htmlnode.attribs.src === inlineImage.remotePath;
                });

                if (inlineImage) {
                    return (
                        <GatsbyImage
                            alt=""
                            image={inlineImage.gatsbyImage.childImageSharp.gatsbyImageData}
                            className='mx-auto'
                        />
                    );
                }

                return;
            }
        },
    };

    return ReactHtmlParser(content, options);
};

export default htmlParser;
