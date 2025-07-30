"use client";
import {useContext} from 'react';
import { seoContextObj } from "../../layout";

import { useState,useEffect,useMemo } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Preloader from "../../../components/Preloader";
import { Key } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import tripBanner from "../../../public/assets/images/banner/tripBanner.png";

  


export default function CategoryPage({ params }) {

    let {categories, companyData, packageData:tempPackageData,allPageMetadata} = useContext(seoContextObj);
  
    const { category } = params; // Access the dynamic category parameter
   
    const [packageData,setPackageData]=useState([]);
    const [originalPackageData,setOriginalPackageData]=useState();
    const [isLoading,setIsLoading]=useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [subCategoryName,setSubCategoryName]=useState([]);
    const [selectedSubCategoryName,setSelectedSubCategoryName]=useState([]);
    const router = useRouter();
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
   const [selectedPrice, setSelectedPrice] = useState({ min: 0, max: 0 });
   const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
   const [currentPage,setCurrentPage]=useState(1);
   const itemPerPage=5;
   const [totalPage, setTotalPage] = useState(0);

   const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return packageData?.slice(startIndex, endIndex);
  }, [currentPage, packageData, itemPerPage]);
    if (!category) {
        return <p>Loading...</p>; // Handle cases where the parameter is not yet available
    }

  
  

    function fetchPackageData() {
       
        let subCategoryName = [];
       
            
            let data =tempPackageData;
         
         
    
            // Process data based on category
            if (category === "trips") {
                data = data?.reverse();
            } else {
                data = data?.filter(item => item.categoryId.slugName === category).reverse();
            }
    
            // Set package data
            setOriginalPackageData(data);
            setPackageData(data);
           

    
            // Calculate price range
            const prices = data?.map(pkg => Number(pkg.packagePrice));
            const min = data?.length ? Math.min(...prices) : 0;
            const max = data?.length ? Math.max(...prices) : 0;
    
            setPriceRange({ min, max });
            setSelectedPrice({ min, max });
    
            // Extract subcategories
            data?.forEach((trip) => {
                if (trip.subCategoryId?.name && !subCategoryName.includes(trip.subCategoryId.name)) {
                    subCategoryName.push(trip.subCategoryId.name);
                }
            });
    
            setSubCategoryName(subCategoryName);
            setTotalPage(Math.ceil(packageData?.length / itemPerPage));
    
        } 
    
    
      useEffect(()=>{
        fetchPackageData();

    
      },[category]);
     

      useEffect(() => {
        const applyFilters = () => {
            if (!originalPackageData) return;
            
            let filtered = originalPackageData.filter(pkg => {
                const price = Number(pkg.packagePrice);
                return price >= selectedPrice.min && 
                       price <= selectedPrice.max &&
                       (selectedSubCategoryName.length === 0 || 
                        selectedSubCategoryName.includes(pkg.subCategoryId?.name)) &&
                       pkg.title.toLowerCase().includes(searchQuery.toLowerCase());
            });
    
            setPackageData(filtered);
        };
    
        applyFilters();
    }, [selectedPrice, selectedSubCategoryName, originalPackageData, searchQuery]);



      function handleNavigation(slug){
        
        router.push("/trip/"+slug);

      }
      function handleSearch(event){
        event.preventDefault();
        
        if(event.target.value.length>0){
            
      let filteredPackages = originalPackageData.filter((item) =>{
        return item.title.toLowerCase().includes(event.target.value.toLowerCase())
      }
    );

    setPackageData(filteredPackages)

}else{
    setPackageData(originalPackageData);
}
}



  
function handleSelectedCategoryName(name) {
    setSelectedSubCategoryName(prev => 
        prev.includes(name) 
            ? prev.filter(sub => sub !== name) 
            : [...prev, name]
    );
}

function filterSubCategoriesByPackage(selectedSubCategories) {
    if (selectedSubCategories.length === 0) {
        setPackageData(originalPackageData);
        return;
    }
    const filtered = originalPackageData.filter(trip => 
        selectedSubCategories.includes(trip.subCategoryId?.name)
    );
    setPackageData(filtered);
}

useEffect(() => {
    filterSubCategoriesByPackage(selectedSubCategoryName);
}, [selectedSubCategoryName]);

useEffect(() => {
   
    setCurrentPage(1); 
    setTotalPage(Math.ceil(packageData?.length / itemPerPage));
  }, [packageData]);

// function handleCurrentPage(){
//     indexOfLastItem=currentPage*itemPerPage;
//     indexOfFirstItem=indexOfLastItem-itemPerPage;
//     currentItems=packageData.slice(indexOfFirstItem,indexOfLastItem);

// }



    return (
        <>
        {/* <!-- Page Title --> */}
       
        {isLoading===true?<Preloader/>: <> 
       
      
       

<section class="page-title style-two centred" style={{ backgroundImage: `url(${tripBanner.src})`,height:"300px",width:"100%",backgroundSize:"cover",backgroundPosition:"center" }}>
            <div class="auto-container">
                <div class="content-box">
                    <h1>Tours Details</h1>
                    <p>Discover your next great adventure</p>
                </div>
                {/* <div class="form-inner">
                    <form action="" method="post" class="booking-form clearfix">
                        <div class="form-group">
                            <input type="text" name="service" placeholder="Where to?" required="" />
                        </div>
                        <div class="form-group input-date">
                            <i class="far fa-angle-down"></i>
                            <input type="text" name="date" placeholder="When?" id="datepicker" />
                        </div>
                        <div class="form-group">
                            <div class="select-box">
                                <select class="wide">
                                    <option data-display="Travel Type">Travel Type</option>
                                    <option value="1">Adventure Tours</option>
                                    <option value="2">City Tours</option>
                                    <option value="3">Couple Tours</option>
                                    <option value="4">Group Tours</option>
                                </select>
                            </div>
                        </div>
                        <div class="message-btn">
                            <button type="submit" class="theme-btn"><i class="far fa-search"></i>Find Now</button>
                        </div>
                    </form>
                </div> */}
            </div>
        </section>
       
        <section class="tours-page-section">
            <div class="auto-container">
                <div class="row clearfix">
                    <div class="col-lg-8 col-md-12 col-sm-12 content-side">
                        <div class="item-shorting clearfix">
                            <div class="left-column pull-left">
                                <h3>Showing {packageData?.length} Results</h3>
                            </div>
                           
                        </div>
                        <div class="wrapper list">
                            <div class="tour-grid-content">
                                <div class="row clearfix">
                                    <div class="col-lg-6 col-md-6 col-sm-12 tour-block">
                                        <div class="tour-block-one">
                                            <div class="inner-box">
                                                <figure class="image-box">
                                                    <img src="assets/images/tour/tour-1.jpg" alt="" />
                                                    <a href="tour-details"><i class="fas fa-link"></i></a>
                                                </figure>
                                                <div class="lower-content">
                                                    <div class="rating"><span><i class="fas fa-star"></i>8.0 Superb</span></div>
                                                    <h3><a href="tour-details">Moscow Red City Land</a></h3>
                                                    <h4>$160.00<span> / Per person</span></h4>
                                                    <ul class="info clearfix">
                                                        <li><i class="far fa-clock"></i>5 Days</li>
                                                        <li><i class="far fa-map"></i>G87P, Birmingham</li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor amet consectetur adipiscing sed.</p>
                                                    <div class="btn-box">
                                                        <a href="tour-details">See Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 tour-block">
                                        <div class="tour-block-one">
                                            <div class="inner-box">
                                                <figure class="image-box">
                                                    <img src="assets/images/tour/tour-2.jpg" alt="" />
                                                    <a href="tour-details"><i class="fas fa-link"></i></a>
                                                </figure>
                                                <div class="lower-content">
                                                    <div class="rating"><span><i class="fas fa-star"></i>8.0 Superb</span></div>
                                                    <h3><a href="tour-details">Moscow Red City Land</a></h3>
                                                    <h4>$170.00<span> / Per person</span></h4>
                                                    <ul class="info clearfix">
                                                        <li><i class="far fa-clock"></i>5 Days</li>
                                                        <li><i class="far fa-map"></i>G87P, Birmingham</li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor amet consectetur adipiscing sed.</p>
                                                    <div class="btn-box">
                                                        <a href="tour-details">See Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 tour-block">
                                        <div class="tour-block-one">
                                            <div class="inner-box">
                                                <figure class="image-box">
                                                    <img src="assets/images/tour/tour-3.jpg" alt="" />
                                                    <a href="tour-details"><i class="fas fa-link"></i></a>
                                                </figure>
                                                <div class="lower-content">
                                                    <div class="rating"><span><i class="fas fa-star"></i>8.0 Superb</span></div>
                                                    <h3><a href="tour-details">Moscow Red City Land</a></h3>
                                                    <h4>$170.00<span> / Per person</span></h4>
                                                    <ul class="info clearfix">
                                                        <li><i class="far fa-clock"></i>5 Days</li>
                                                        <li><i class="far fa-map"></i>G87P, Birmingham</li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor amet consectetur adipiscing sed.</p>
                                                    <div class="btn-box">
                                                        <a href="tour-details">See Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 tour-block">
                                        <div class="tour-block-one">
                                            <div class="inner-box">
                                                <figure class="image-box">
                                                    <img src="assets/images/tour/tour-8.jpg" alt="" />
                                                    <a href="tour-details"><i class="fas fa-link"></i></a>
                                                </figure>
                                                <div class="lower-content">
                                                    <div class="rating"><span><i class="fas fa-star"></i>8.0 Superb</span></div>
                                                    <h3><a href="tour-details">Moscow Red City Land</a></h3>
                                                    <h4>$190.00<span> / Per person</span></h4>
                                                    <ul class="info clearfix">
                                                        <li><i class="far fa-clock"></i>5 Days</li>
                                                        <li><i class="far fa-map"></i>G87P, Birmingham</li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor amet consectetur adipiscing sed.</p>
                                                    <div class="btn-box">
                                                        <a href="tour-details">See Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 tour-block">
                                        <div class="tour-block-one">
                                            <div class="inner-box">
                                                <figure class="image-box">
                                                    <img src="assets/images/tour/tour-9.jpg" alt="" />
                                                    <a href="tour-details"><i class="fas fa-link"></i></a>
                                                </figure>
                                                <div class="lower-content">
                                                    <div class="rating"><span><i class="fas fa-star"></i>8.0 Superb</span></div>
                                                    <h3><a href="tour-details">Moscow Red City Land</a></h3>
                                                    <h4>$150.00<span> / Per person</span></h4>
                                                    <ul class="info clearfix">
                                                        <li><i class="far fa-clock"></i>5 Days</li>
                                                        <li><i class="far fa-map"></i>G87P, Birmingham</li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor amet consectetur adipiscing sed.</p>
                                                    <div class="btn-box">
                                                        <a href="tour-details">See Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 tour-block">
                                        <div class="tour-block-one">
                                            <div class="inner-box">
                                                <figure class="image-box">
                                                    <img src="assets/images/tour/tour-10.jpg" alt="" />
                                                    <a href="tour-details"><i class="fas fa-link"></i></a>
                                                </figure>
                                                <div class="lower-content">
                                                    <div class="rating"><span><i class="fas fa-star"></i>8.0 Superb</span></div>
                                                    <h3><a href="tour-details">Moscow Red City Land</a></h3>
                                                    <h4>$180.00<span> / Per person</span></h4>
                                                    <ul class="info clearfix">
                                                        <li><i class="far fa-clock"></i>5 Days</li>
                                                        <li><i class="far fa-map"></i>G87P, Birmingham</li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor amet consectetur adipiscing sed.</p>
                                                    <div class="btn-box">
                                                        <a href="tour-details">See Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 tour-block">
                                        <div class="tour-block-one">
                                            <div class="inner-box">
                                                <figure class="image-box">
                                                    <img src="assets/images/tour/tour-11.jpg" alt="" />
                                                    <a href="tour-details"><i class="fas fa-link"></i></a>
                                                </figure>
                                                <div class="lower-content">
                                                    <div class="rating"><span><i class="fas fa-star"></i>8.0 Superb</span></div>
                                                    <h3><a href="tour-details">Moscow Red City Land</a></h3>
                                                    <h4>$145.00<span> / Per person</span></h4>
                                                    <ul class="info clearfix">
                                                        <li><i class="far fa-clock"></i>5 Days</li>
                                                        <li><i class="far fa-map"></i>G87P, Birmingham</li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor amet consectetur adipiscing sed.</p>
                                                    <div class="btn-box">
                                                        <a href="blog-details">See Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 tour-block">
                                        <div class="tour-block-one">
                                            <div class="inner-box">
                                                <figure class="image-box">
                                                    <img src="assets/images/tour/tour-12.jpg" alt="" />
                                                    <a href="tour-details"><i class="fas fa-link"></i></a>
                                                </figure>
                                                <div class="lower-content">
                                                    <div class="rating"><span><i class="fas fa-star"></i>8.0 Superb</span></div>
                                                    <h3><a href="tour-details">Moscow Red City Land</a></h3>
                                                    <h4>$160.00<span> / Per person</span></h4>
                                                    <ul class="info clearfix">
                                                        <li><i class="far fa-clock"></i>5 Days</li>
                                                        <li><i class="far fa-map"></i>G87P, Birmingham</li>
                                                    </ul>
                                                    <p>Lorem ipsum dolor amet consectetur adipiscing sed.</p>
                                                    <div class="btn-box">
                                                        <a href="tour-details">See Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tour-list-content list-item">
                                {currentItems?.length==0 && <div style={{width:"300px",height:"200px",marginLeft:"auto",marginRight:"auto", fontWeight:"bolder",fontSize:"24px",marginTop:"10px",marginBottom:"20px"}}>No matching results found</div>}
                             {currentItems?.map((item)=>{
                                 return <div class="tour-block-two">
                                 <div class="inner-box">
                                     <figure class="image-box" style={{width:"190px",height:"227px"}}>
                                         <img src={`${SERVER_URL}/${item.packageImage}`} alt="" style={{objectFit:"contain"}}/>
                                         <Link href="#" onClick={(event)=>{
                                            event.preventDefault();
                                            handleNavigation(item.titleSlug);


                                         }}><i class="fas fa-link"></i></Link>
                                     </figure>
                                     <div class="content-box">
                                         <div class="rating"><span><i class="fas fa-star"></i>8.0 Superb</span></div>
                                         <h3> <Link href="#" onClick={(event)=>{
                                            event.preventDefault();
                                            handleNavigation(item?.titleSlug);


                                         }}>{item.title}</Link></h3>
                                         <h4>{item.packagePrice!=="" && <>₹ {item.packagePrice}<span> / Per person</span>
                                          </>
                                            }
                                         </h4>
                                         {/* <p>Lorem ipsum dolor amet consectetur adipiscing sed do eiusmod tempor incididunt.</p> */}
                                         <div class="btn-box">
                                         <Link href="#" onClick={(event)=>{
                                            event.preventDefault();
                                            handleNavigation(item?.titleSlug);


                                         }}>See Details</Link>
                                         </div>
                                     </div>
                                 </div>
                             </div>

                             })
                               
                            }
                               
                                
                            </div>
                        </div>
                        <div class="pagination-wrapper">
                            <ul class="pagination clearfix">
                                {/* {
                                Array.from({ length: totalPage }, (_, index) => index + 1).map((page) =>{
                                <li key={page}><a href="#" class={currentPage === page ? "current" : ""} onClick={(event)=>{
                                    event.preventDefault()
                                    setCurrentPage(page)

                                }}>{page}</a></li>
                                })
                               
                               } */}


{Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
            <li key={page}>
                <a 
                    href="#" 
                    className={currentPage === page ? "current" : ""} 
                    onClick={(event) => {
                        event.preventDefault();
                        setCurrentPage(page);
                    }}
                >
                    {page}
                </a>
            </li>
        ))}

                                {/* <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#"><i class="icon-Right-Arrow"></i></a></li> */}
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                        <div class="default-sidebar tour-sidebar ml-20">
                            <div class="sidebar-widget sidebar-search">
                                <div class="widget-title">
                                    <h3>Search</h3>
                                </div>
                                <div action="destination-details.html" method="post" class="search-form">
                                    <div class="form-group">
                                        <input type="search" name="search-field" placeholder="Search" required=""  
                    onChange={handleSearch}/>
                                        {/* <button type="submit"><i class="fas fa-search"></i></button> */}
                                    </div>
                                </div>
                            </div>
                            <div class="sidebar-widget category-widget">
                                <div class="widget-title">
                                    <h3>Category</h3>
                                </div>
                                <div class="widget-content">
                                    <ul class="category-list clearfix">
                                        
                                      

{subCategoryName.map((name, index) => (
                            <li class="custom-check-box" key={index}>
                                <div class="custom-controls-stacked">
                                    <label class="custom-control material-checkbox">
                                        <input
                                            type="checkbox"
                                            class="material-control-input"
                                            checked={selectedSubCategoryName.includes(name)}
                                            onChange={() => handleSelectedCategoryName(name)}
                                        />
                                        <span class="material-control-indicator"></span>
                                        <span class="description">{name}</span>
                                    </label>
                                </div>
                            </li>
                        ))}

                                      
                                    </ul>
                                </div>
                            </div>

                            <div class="sidebar-widget price-filter">
      <div class="widget-title">
        <h3>Price Range</h3>
      </div>
      <div class="range-slider clearfix">
        <div class="value-box clearfix">
          <div class="min-value pull-left">
            <p>₹ {selectedPrice.min}</p>
          </div>
          <div class="max-value pull-right">
            <p>₹ {selectedPrice.max}</p>
          </div>
        </div>
        <div class="price-range-slider">
          <Slider
            range
            min={priceRange.min}
            max={priceRange.max}
            value={[selectedPrice.min, selectedPrice.max]}
            onChange={([min, max]) => setSelectedPrice({ min, max })}
            trackStyle={[{ backgroundColor: "#00a8ff" }]}
            handleStyle={[
              { borderColor: "#00a8ff", boxShadow: "none" },
              { borderColor: "#00a8ff", boxShadow: "none" }
            ]}
          />
        </div>
      </div>
    </div>

                            {/* <div class="sidebar-widget price-filter">
                                <div class="widget-title">
                                    <h3>Price Range</h3>
                                </div>
                                <div class="range-slider clearfix">
                                    <div class="value-box clearfix">
                                        <div class="min-value pull-left">
                                            <p>$50.00</p>
                                        </div>
                                        <div class="max-value pull-right">
                                            <p>$100.00</p>
                                        </div>
                                    </div>
                                    <div class="price-range-slider"></div>
                                </div>
                            </div> */}
                            {/* <div class="sidebar-widget duration-widget">
                                <div class="widget-title">
                                    <h3>Durations</h3>
                                </div>
                                <div class="widget-content">
                                    <ul class="category-list clearfix">
                                        <li class="custom-check-box">
                                            <div class="custom-controls-stacked">
                                                <label class="custom-control material-checkbox">
                                                    <input type="checkbox" class="material-control-input" />
                                                    <span class="material-control-indicator"></span>
                                                    <span class="description">0 - 24 hours</span>
                                                </label>
                                            </div>
                                        </li>
                                        <li class="custom-check-box">
                                            <div class="custom-controls-stacked">
                                                <label class="custom-control material-checkbox">
                                                    <input type="checkbox" class="material-control-input" />
                                                    <span class="material-control-indicator"></span>
                                                    <span class="description">1 - 2 days</span>
                                                </label>
                                            </div>
                                        </li>
                                        <li class="custom-check-box">
                                            <div class="custom-controls-stacked">
                                                <label class="custom-control material-checkbox">
                                                    <input type="checkbox" class="material-control-input" />
                                                    <span class="material-control-indicator"></span>
                                                    <span class="description">2 - 3 days</span>
                                                </label>
                                            </div>
                                        </li>
                                        <li class="custom-check-box">
                                            <div class="custom-controls-stacked">
                                                <label class="custom-control material-checkbox">
                                                    <input type="checkbox" class="material-control-input" />
                                                    <span class="material-control-indicator"></span>
                                                    <span class="description">3 - 4 days</span>
                                                </label>
                                            </div>
                                        </li>
                                        <li class="custom-check-box">
                                            <div class="custom-controls-stacked">
                                                <label class="custom-control material-checkbox">
                                                    <input type="checkbox" class="material-control-input" />
                                                    <span class="material-control-indicator"></span>
                                                    <span class="description">4 - 5 days</span>
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                           
                            <div class="advice-widget">
                                <div class="inner-box" style={{ backgroundImage: 'url(assets/images/resource/advice-1.jpg);' }}>
                                    <div class="text">
                                        <h2>Get <br />25% Off <br />On New York Tours</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
        }
      
        
    </>
    
    );
}

export function generateMetadata(params){
    
    let {category}=params;
 


        return {
            title: "category",
            description: "Page description",
            keywords: ["blog", "nextjs", "seo"],
            openGraph: {
              title: "OG Title",
              description: "OG Description",
              images: ['https://example.com/image.png'],
            },
            twitter: {
              card: 'summary_large_image',
              title: 'Twitter Title',
            },
          };
   

  }