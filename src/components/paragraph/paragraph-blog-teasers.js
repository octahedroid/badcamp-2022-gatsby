import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Teasers from "../teasers";

export default function ParagraphBlogTeasers() {

    // Remove this line
    return (<></>)

    // Uncomment below this line
    // return (
    //     <StaticQuery
    //         query={graphql`
    //         {
    //             allDrupalNodeArticle {
    //                 nodes {
    //                     id
    //                     title
    //                     created
    //                     path
    //                     body {
    //                         summary
    //                     }
    //                     author {
    //                         displayName
    //                         picture {
    //                             gatsbyImage {
    //                                 childImageSharp {
    //                                     gatsbyImageData(layout: FIXED, width: 48, height: 48)
    //                                 }
    //                             }
    //                         }
    //                     }
    //                     image {
    //                         gatsbyImage {
    //                             childImageSharp {
    //                                 large: gatsbyImageData(width: 1240)
    //                                 small: gatsbyImageData(width: 760)
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //   `}
    //         render={data => <Teasers nodes={data.allDrupalNodeArticle.nodes} />}
    //     />
    // )
}
