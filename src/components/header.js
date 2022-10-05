import React from "react"
import { Link } from "gatsby"

export default function Header() {

  const menus = [
    {
      id: 1,
      url: "/",
      title: "home",
    },
    {
      id: 2,
      url: "/blog",
      title: "blog",
    },
    {
      id: 3,
      url: "/about-us",
      title: "about us",
    },
  ]

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
        {`Drupal <3 Gatsby`}.
      </h1>
      <div className="text-center md:text-left text-lg mt-5 md:pl-8">
        <ul className="flex">
          {menus && menus?.map(function (item) {
            return (<li key={item.id} className="mr-6"><Link to={item.url}>{item.title}</Link></li>)
          })}
        </ul>
      </div>
    </section>
  )
}