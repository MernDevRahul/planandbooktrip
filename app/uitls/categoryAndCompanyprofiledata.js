import axios from "axios"; // Add missing axios import
import Swal from "sweetalert2"; // Ensure Swal is imported
 // Add missing SERVER_URL definition
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export async function fetchCategoriesAndCompanyProfile(setIsLoading, setCategories, setCompanyData,setPackageData,setAllPageMetadata) {
    setIsLoading(true);

    try {
        // Fetch categories and company profile data concurrently
        const [categoriesResponse, companyProfileResponse,packageData,allMetadata] = await Promise.all([
            axios.get(`${SERVER_URL}/api/categories`),
            axios.get(`${SERVER_URL}/api/company-profile/67d7e08b75c754b93314d410`),
            axios.get(`${SERVER_URL}/api/trip-packages`),
            axios.get(`${SERVER_URL}/api/getAllPagemeta`),
           
            
        ]);

        // Update state with fetched data
        setCategories(()=>{
    return categoriesResponse.data;
        });
        // console.log(categoriesResponse.data)
        setCompanyData(()=>{
            return companyProfileResponse.data

        });
        // console.log("package data fetched",packageData.data)
        // let tempPackageData={...packageData.data.reverse()};
       
        // setAllPageMetadata(()=>{
        //     return allMetadata.data;
        // });
        setPackageData(()=>{
            
           return  (packageData.data.reverse());

        });
        
        setAllPageMetadata(()=>{
            
            return  (allMetadata.data);
 
         });

    
    } catch (error) {
        // console.error("Error fetching data:", error);
        Swal.fire({
            title: "Error",
            text: "Error fetching categories or company profile",
            icon: "error"
        });
    } finally {
        setIsLoading(false);
    }
}
