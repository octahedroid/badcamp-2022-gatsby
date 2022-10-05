import React from "react";
import Teaser from '../components/teaser'

export default function Teasers({ nodes }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {nodes.map(node => {
            const author = {
              name: node.author.displayName,
              picture: node.author.picture.gatsbyImage.childImageSharp,
            }
            return (
              <Teaser
                key={node.id}
                title={node.title}
                coverImage={node.image.gatsbyImage.childImageSharp}
                date={node.created}
                author={author}
                slug={node.path}
                excerpt={node?.body?.summary}
              />
          )}
        )}
      </div>
    </section>
  )
}
