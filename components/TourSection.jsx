"use client";
import Image from "next/image";
import Link from "next/link";
import { Clock, Map, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import { useRouter } from "next/navigation";


export default function TourSection(props) {
  

  const [packageData,setPackageData]=useState({popular:[],trending:[],offer:[]});
 
 
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
      const router = useRouter();
  
  async function fetchPackageData(){
    
    let tagName={popular:[],trending:[],offer:[]}
    
        let response=props.sendData();
      
     let  data=response;

     data?.forEach((item)=>{
    
      if(item.tripTagName==="popular"){
      

       
        tagName.popular.length!==3 && tagName.popular.push(item);
        
      }else if(item.tripTagName==="trending"){
        tagName.trending.length!==3 && tagName.trending.push(item);
      }else if(item.tripTagName==="offer"){
        tagName.offer.length!==3 && tagName.offer.push(item);
      }

     })
   
      setPackageData(tagName);

    

    }
  
  useEffect(()=>{
    fetchPackageData();

  },[])
  const handleNavigation = (slug) => {
    router.push(`/trip/${slug}`);
  };

  return (
    <>
      <section className="tour-section bg-color-1">
        <div
          className="pattern-layer"
          style={{ backgroundImage: "url(/assets/images/shape/shape-4.png)" }}
        ></div>
        <div className="auto-container">
      

          <div className="sec-title text-center" style={{display:"flex",gap:"20px",justifyContent:"center"}}>
            
            <h2>Our Most Popular Adventures</h2>
            <Link href="/trip/events/popular" className="theme-btn-two">
              View All
            </Link>
          </div>
          <div className="row clearfix">
          
              {packageData?.popular?.map((trip)=>{
return    <div className="col-lg-4 col-md-6 col-sm-12 tour-block">
<div
 className="tour-block-one wow fadeInUp animated animated"
 data-wow-delay="00ms"
 data-wow-duration="1500ms"
>
 <div className="inner-box">
   <figure className="image-box">
     <Image
       src={`${SERVER_URL}/${trip?.packageImage}`}
       alt=""
       width={370}
       height={270}
     />
     <Link href={`/api/trip-packages/slug/${trip.titleSlug}`} as={`/api/trip-packages/slug/${trip.titleSlug}`} onClick={(event)=>{
        event.preventDefault();
        handleNavigation(trip.titleSlug);

       }}>
       <i className="fas fa-link"></i>
     </Link>
   </figure>
   <div className="lower-content" style={{height:"350px"}}>
     <div className="rating">
       <span>
         <Star size={24} color={"gold"} /> 8.0 Superb
       </span>
     </div>
     <div style={{height:"60px",}}>
     <h3 style={{fontSize:"16px",wordSpacing:'1px',fontWeight:"600",letterSpacing:"1px"}}>
     <Link href={`/api/trip-packages/slug/${trip.titleSlug}`} as={`/api/trip-packages/slug/${trip.titleSlug}`} onClick={(event)=>{
        event.preventDefault();
        handleNavigation(trip.titleSlug);

       }}>
        
         {trip.title.length>50? trip.title.slice(0, 50) + "..." : trip.title}
       </Link>
     </h3>
     </div>
     <h4 style={{marginBottom:"4px",marginTop:"15px"}}>
    {trip.packagePrice!=="" &&<> ₹ {trip.packagePrice}<span> / Per person</span>
    </>
    
    }
     </h4>
     <ul className="info clearfix">
       <li>
         <Clock size={24} />
          <span>
         { trip.numberOfDays=="" && trip.numberOfNights==""? " Ask Expert": `${trip.numberOfNights}N - ${trip.numberOfDays}D`
          }
          </span>
       </li>
       <li>
         <Map size={24} /> <span style={{textTransform:"uppercase"}}>{trip.country}</span>
       </li>
     </ul>
   
     <div className="btn-box">
       <Link href={`/api/trip-packages/slug/${trip.titleSlug}`} as={`/api/trip-packages/slug/${trip.titleSlug}`} onClick={(event)=>{
        event.preventDefault();
        handleNavigation(trip.titleSlug);

       }}>
        Book Now
       </Link>
     </div>
   </div>
 </div>
</div>
</div>
              })
             
             }
           
          
          </div>
        </div>

        



        <div className="auto-container" style={{marginTop:"40px"}}>
         

<div className="sec-title text-center" style={{display:"flex",gap:"20px",justifyContent:"center"}}>
         
            <h2>Our Most Trending Adventures</h2>
            <Link href="/trip/events/trending" className="theme-btn-two">
              View All
            </Link>
          </div>
          <div className="row clearfix">
          
              {packageData?.trending?.map((trip)=>{
return    <div className="col-lg-4 col-md-6 col-sm-12 tour-block">
<div
 className="tour-block-one wow fadeInUp animated animated"
 data-wow-delay="00ms"
 data-wow-duration="1500ms"
>
 <div className="inner-box">
   <figure className="image-box">
     <Image
       src={`${SERVER_URL}/${trip?.packageImage}`}
       alt=""
       width={370}
       height={270}
     />
     <Link href={`/api/trip-packages/slug/${trip.titleSlug}`} as={`/api/trip-packages/slug/${trip.titleSlug}`} onClick={(event)=>{
        event.preventDefault();
        handleNavigation(trip.titleSlug);

       }}>
       <i className="fas fa-link"></i>
     </Link>
   </figure>
   <div className="lower-content" style={{height:"350px"}}>
     <div className="rating">
       <span>
         <Star size={24} color={"gold"} /> 8.0 Superb
       </span>
     </div>
     <div style={{height:"60px",}}>
     <h3 style={{fontSize:"16px",wordSpacing:'1px',fontWeight:"600",letterSpacing:"1px"}}>
     <Link href={`/api/trip-packages/slug/${trip.titleSlug}`} as={`/api/trip-packages/slug/${trip.titleSlug}`} onClick={(event)=>{
        event.preventDefault();
        handleNavigation(trip.titleSlug);

       }}>
           {trip.title.length>50? trip.title.slice(0, 50) + "..." : trip.title}
       </Link>
     </h3>
     </div>
     <h4 style={{marginBottom:"4px",marginTop:"15px"}}>
    {trip.packagePrice!=="" &&<> ₹ {trip.packagePrice}<span> / Per person</span>
    </>
    
    }
     </h4>
     <ul className="info clearfix">
       <li>
       <Clock size={24} />
       <span>
         { trip.numberOfDays==0 && trip.numberOfNights==0? " Ask Expert": `${trip.numberOfNights}N - ${trip.numberOfDays}D`
          }
          </span>
       </li>
       <li>
         <Map size={24} /> <span style={{textTransform:"uppercase"}}>{trip.country}</span>
       </li>
     </ul>
   
     <div className="btn-box">
       <Link href={`/api/trip-packages/slug/${trip.titleSlug}`} as={`/api/trip-packages/slug/${trip.titleSlug}`} onClick={(event)=>{
        event.preventDefault();
        handleNavigation(trip.titleSlug);

       }}>
         See Details
       </Link>
     </div>
   </div>
 </div>
</div>
</div>
              })
             
             }
           
          
          </div>

          
        </div>


        

        <div className="auto-container" style={{marginTop:"40px"}}>
         

         <div className="sec-title text-center" style={{display:"flex",gap:"20px",justifyContent:"center"}}>
                  
                     <h2>Our Most Offered Adventures</h2>
                     <Link href="/trip/events/trending" className="theme-btn-two">
                       View All
                     </Link>
                   </div>
                   <div className="row clearfix">
                   
                       {packageData?.offer?.map((trip)=>{
         return    <div className="col-lg-4 col-md-6 col-sm-12 tour-block">
         <div
          className="tour-block-one wow fadeInUp animated animated"
          data-wow-delay="00ms"
          data-wow-duration="1500ms"
         >
          <div className="inner-box">
            <figure className="image-box">
              <Image
                src={`${SERVER_URL}/${trip?.packageImage}`}
                alt=""
                width={370}
                height={270}
              />
              <Link href={`/api/trip-packages/slug/${trip.titleSlug}`} as={`/api/trip-packages/slug/${trip.titleSlug}`} onClick={(event)=>{
                 event.preventDefault();
                 handleNavigation(trip.titleSlug);
         
                }}>
                <i className="fas fa-link"></i>
              </Link>
            </figure>
            <div className="lower-content" style={{height:"350px"}}>
              <div className="rating">
                <span>
                  <Star size={24} color={"gold"} /> 8.0 Superb
                </span>
              </div>
              <div style={{height:"60px",}}>
              <h3 style={{fontSize:"16px",wordSpacing:'1px',fontWeight:"600",letterSpacing:"1px"}}>
              <Link href={`/api/trip-packages/slug/${trip.titleSlug}`} as={`/api/trip-packages/slug/${trip.titleSlug}`} onClick={(event)=>{
                 event.preventDefault();
                 handleNavigation(trip.titleSlug);
         
                }}>
                  {trip.title.length>50? trip.title.slice(0, 50) + "..." : trip.title}
                </Link>
              </h3>
              </div>
              <h4 style={{marginBottom:"4px",marginTop:"15px"}}>
    {trip.packagePrice!=="" &&<> ₹ {trip.packagePrice}<span> / Per person</span>
    </>
    
    }
     </h4>
              <ul className="info clearfix">
                <li>
                  <Clock size={24} />
                  
                  <span>
         { trip.numberOfDays==0 && trip.numberOfNights==0? " Ask Expert": `${trip.numberOfNights}N - ${trip.numberOfDays}D`
          }
          </span>
                </li>
                <li>
                  <Map size={24} /> <span style={{textTransform:"uppercase"}}>{trip.country}</span>
                </li>
              </ul>
            
              <div className="btn-box">
                <Link href={`/api/trip-packages/slug/${trip.titleSlug}`} as={`/api/trip-packages/slug/${trip.titleSlug}`} onClick={(event)=>{
                 event.preventDefault();
                 handleNavigation(trip.titleSlug);
         
                }}>
                  See Details
                </Link>
              </div>
            </div>
          </div>
         </div>
         </div>
                       })
                      
                      }
                    
                   
                   </div>
         
                   
                 </div>
         



        

      </section>

    
    </>
  );
}
