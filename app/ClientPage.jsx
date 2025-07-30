"use client"
import {useContext} from "react";
import { seoContextObj } from "./layout";
import Head from "next/head";

import AboutSection from "../components/AboutSection";
import BannerSection from "../components/BannerSection";
import DealsSection from "../components/DealsSection";
import FeatureSection from "../components/FeatureSection";
import FunfactSection from "../components/FunfactSection";
import MapSection from "../components/MapSection";
import NewsSection from "../components/NewsSection";
import PlaceSection from "../components/PlaceSection";
import TourSection from "../components/TourSection";
import VideoSection from "../components/VideoSection";
import { useState,useEffect} from "react";
import Preloader from "../components/Preloader";
import axios from "axios";
import Swal from "sweetalert2";
// export let  metadata = {
//   title: "Tour & Travel",
//   description: "Tour & Travel",
// };
export default function ClientPage() {
  const title = "Best Tour & Travel Packages | Explore the World";
  const description = "Discover amazing travel deals and destinations.";
  const image = "https://example.com/featured-image.jpg";
  const url = "https://yourwebsite.com";
 let {packageData:renamePackageData}=useContext(seoContextObj);
 const [packageData,setPackageData]=useState(renamePackageData);

 

 const [isLoading,setIsLoading]=useState(false);
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  //  async function fetchPackageData() {
  //     setIsLoading(true);
  //     try {
  //       let response =await  axios.get(`${SERVER_URL}/api/trip-packages`);
    

  //       setPackageData(response.data.reverse());
  //     } catch (error) {
      
  //       Swal.fire({
  //         icon:"error",
  //         text:error?.response?.data?.message || "Something went wrong"
  //       })
  //     }finally{
  //       setIsLoading(false);
  //     }
  //   }
  //   useEffect(()=>{
  //     fetchPackageData();
  
  //   },[]);
  
   function sendData(){
   
    
    
    return packageData;
   }

  

  return (
    <>
    {isLoading===true? <Preloader/> :<>
      {/* <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head> */}

      <BannerSection />
      <FeatureSection />
      {/* <AboutSection /> */}
      <TourSection sendData={sendData} />
      <DealsSection />
      <PlaceSection />
      <MapSection />
      <NewsSection packageData={packageData}/>
      <FunfactSection />
      <VideoSection />
      
      </>
    }
    </>
  );
}