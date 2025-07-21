import React from "react";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="w-8/12 mx-auto text-secondary-content space-y-8 py-10 px-4">
      <Helmet>
        <title>About Us | TechLooma</title>
      </Helmet>
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          About TechLooma
        </h2>
        <p className="text-lg leading-relaxed font-medium ">
          <strong>TechLooma</strong> is your go-to platform for discovering,
          reviewing, and sharing the latest tech products and innovations.
          Whether you're a tech enthusiast, developer, or a consumer looking for
          trusted insights — TechLooma connects you with cutting-edge tools and
          communities.
        </p>

        <p className="text-base leading-relaxed mt-4">
          Our platform empowers creators and users to submit products, leave
          honest reviews, and engage with the tech community. From software
          solutions to hardware gadgets, we cover a wide range of technology
          designed to elevate your workflow and lifestyle.
        </p>

        <p className="text-base leading-relaxed mt-4">
          At TechLooma, we believe technology drives progress. Our mission is to
          provide a transparent, user-driven space that helps you discover tech
          products that truly fit your needs.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          Why Choose TechLooma?
        </h3>
        <ul className="space-y-2 pl-5 text-base list-disc ">
          <li>
            Discover and explore innovative tech products from diverse
            categories
          </li>
          <li>
            Read and write honest reviews to help the community make informed
            choices
          </li>
          <li>
            Submit your own products and gain exposure to a tech-savvy audience
          </li>
          <li>
            Engage with a passionate community of tech enthusiasts and
            professionals
          </li>
          <li>
            Enjoy a modern, secure, and user-friendly platform tailored for tech
            discovery
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
