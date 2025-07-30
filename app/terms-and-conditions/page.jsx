export const dynamic = 'force-dynamic';
import React from "react";
import Terms from "../../components/Terms";
import axios from "axios";

// export const metadata = {
//   title: "Terms and Services",
//   description: "Read our terms and services carefully.",
//   icons: {
//     icon: "assets/images/logo/jivyuv-logo.png", // 👈 Different favicon
//   },
// };

export async function generateMetadata() {


 
  try{
  const SERVER_URL= process.env.NEXT_PUBLIC_SERVER_URL;

let response=await axios.get(`${SERVER_URL}/api/getAllPagemeta`);
   let allMetaData=response.data;
  let metaData=allMetaData.find((item)=>{
  
      if(item.page==="terms-and-conditions"){
          return true;
      }else{
          return false;
      }
      });
if(metaData){
  return {
    title:`${metaData.title}`,
    description:`${metaData.description}`,
    keywords: metaData.metaKeywords,
    authors: [],
    openGraph: {
      title: `${metaData.ogTitle}`,
      description: `${metaData.ogDescription}`,
      url: `${metaData.canonicalUrl}`,
      siteName: `${metaData.ogSiteName}`,
      images: [
        {
          url: `${metaData.ogImageUrl}`,
          width: 800,
          height: 600,
          alt: '',
        },
      ],
      locale: `${metaData?.language}`,
      type: `${metaData.ogType}`,
    },
    twitter: {
      card: `${metaData?.twitterCard}`,
      title: `${metaData?.twitterTitle}`,
      site: `${metaData?.twitterSite}`,
      creator: `${metaData?.twitterCreator}`,
      description: `${metaData?.twitterDescription}`,
      images: [`${metaData?.twitterImage}`],
    },
  }
}
}catch(error){

  console.error("Error fetching metadata:", error);
  return {
    title: 'Error',
    description: 'Failed to fetch metadata.',
  };
}
}

const TermsAndServices = () => {

  return (
    <>
    
    <Terms></Terms>
    </>
  );
};

export default TermsAndServices;
