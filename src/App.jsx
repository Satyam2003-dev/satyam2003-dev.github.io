import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Notes from "./pages/Notes";
import About from "./pages/About";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";
export default function App() {
  return (
    <div id="top">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/" element={<Collection type="blog" />} />
          <Route path="/articles/" element={<Collection type="article" />} />
          <Route path="/notes/" element={<Notes />} />
          <Route path="/about/" element={<About />} />
          <Route path="/blog/:slug/" element={<Article type="blog" />} />
          <Route path="/articles/:slug/" element={<Article type="article" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}
