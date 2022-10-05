import React from "react";
import Container from "../components/container";
import Header from "../components/header";
import Footer from "../components/footer";
import Title from "../components/field/title";

export default function Demo() {
  return (
    <Container>
      <Header />
        <article className="prose prose-lg max-w-6xl mx-auto">
          <Title>BADCamp 2022</Title>
          <h2>Decoupling Drupal using GraphQL & Gatsby: A Crash Course</h2>
        </article>
      <Footer />
    </Container>
  );
}
