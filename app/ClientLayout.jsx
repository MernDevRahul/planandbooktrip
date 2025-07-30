'use client';

import Footer from "../components/FooterSection";
import Header from "../components/HeaderSection";
import React from "react";
import "./custom.css";
import "./globals.css";
import * as Lucide from 'lucide-react';
import { fetchCategoriesAndCompanyProfile } from "./uitls/categoryAndCompanyprofiledata";
import { useEffect, useState } from "react";
import Preloader from "../components/Preloader";

export const seoContextObj = React.createContext(null);

export default function ClientLayout({ children }) {
  const [categories, setCategories] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [packageData, setPackageData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [allPageMetadata, setAllPageMetadata] = useState([]);

  useEffect(() => {
    fetchCategoriesAndCompanyProfile(setIsLoading, setCategories, setCompanyData, setPackageData, setAllPageMetadata);
  }, []);

  if (isLoading) {
    return (
      <seoContextObj.Provider value={{ categories, companyData, packageData, allPageMetadata }}>
        <html lang="en" suppressHydrationWarning>
          <body>
            <Preloader />
          </body>
        </html>
      </seoContextObj.Provider>
    );
  }

  return (
    <seoContextObj.Provider value={{ categories, companyData, packageData, allPageMetadata }}>
      <div>
        <Header />
        {children}
        <Footer companyData={companyData} categories={categories} />
      </div>
    </seoContextObj.Provider>
  );
}