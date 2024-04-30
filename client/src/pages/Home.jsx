import React from "react";
import Dream from "../components/homePage/Dream";
import Plan from "../components/homePage/Plan";
import Tool from "../components/homePage/Tool";
import Synergy from "../components/homePage/Synergy";
import "./Home.css";
import Footer from "../components/homePage/Footer";

export default function Home() {
  return (
    <div className="home">
      <Dream />
      <Plan />
      <Tool />
      <Synergy />
      <Footer />
    </div>
  );
}
