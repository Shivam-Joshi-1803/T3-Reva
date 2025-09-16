import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StyleSwitcher from "./components/StyleSwitcher";
import LandingPage from "./components/LandingPage"; 

interface ApiResponse {
  page?: {
    mainNavigation?: any[];
    footerNavigation?: any[];
    content?: {
      colPos0?: any[]; 
      colPos2?: any[];
    };
  };
  content?: {
    colPos0?: any[]; 
    colPos2?: any[];
  };
}

const App: React.FC = () => {
  const [data, setData] = useState<ApiResponse>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://t3-reva.t3planet.de/", {
          method: "GET",
          cache: "no-store" as RequestCache,
        });
        const json = await response.json();

        console.log("From App →", json);

        setData(json);
      } catch (error) {
        console.error("Error fetching API data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div id="wifi-loader">
        <svg viewBox="0 0 86 86" className="circle-outer">
          <circle r="40" cy="43" cx="43" className="back"></circle>
          <circle r="40" cy="43" cx="43" className="front"></circle>
          <circle r="40" cy="43" cx="43" className="new"></circle>
        </svg>
        <svg viewBox="0 0 60 60" className="circle-middle">
          <circle r="27" cy="30" cx="30" className="back"></circle>
          <circle r="27" cy="30" cx="30" className="front"></circle>
        </svg>
        <svg viewBox="0 0 34 34" className="circle-inner">
          <circle r="14" cy="17" cx="17" className="back"></circle>
          <circle r="14" cy="17" cx="17" className="front"></circle>
        </svg>
        <div data-text="Loading..." className="text"></div>
      </div>
    );
  }

  const heroContent =
    data?.page?.content?.colPos0 || data?.content?.colPos0 || [];

  const footerBlocks =
    data?.page?.content?.colPos2 || data?.content?.colPos2 || [];

  const footerNavigation = data?.page?.footerNavigation || [];

  return (
    <div>
      {/* Header */}
      <Header data={{ mainNavigation: data?.page?.mainNavigation || [] }} />

      {/*  Hero/Landing page */}
      <LandingPage content={{ colPos0: heroContent }} />

      {/*  Global Style Switcher */}
      <StyleSwitcher />

      {/* Footer with both blocks + navigation */}
      <Footer footerBlocks={footerBlocks} footerNavigation={footerNavigation} />
    </div>
  );
};

export default App;
