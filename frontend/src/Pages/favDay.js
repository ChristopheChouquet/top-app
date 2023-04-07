//import axios from "axios";
import { useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

function FavDay() {
    useEffect(() => {

        /* axios({
            method: 'get',
            url: 'http://localhost:5000/favday'
        }).then((response) => {
            setUser(response.data);
        }).catch((error) => {  
            console.error(error);
        });  */

        //Gestion des icons du footer
        const footerIconSelector = document.querySelector('#footer > div > div > a:nth-child(3)');
        const selectAllSVGElement = footerIconSelector.querySelectorAll('*');
        selectAllSVGElement.forEach((element) => {
            element.classList.remove('stroke-tertiary-300');
            element.classList.add('stroke-primary');
        });

    }, []);

    return(
        <>
            <Header/>
            <div className="bg-primary h-screen">
                <h1 className="pt-20 text-center text-tertiary-100 font-black">FAV DAY EN COURS</h1>
            </div>
            <Footer/>
        </>
    )
    
}
export default FavDay;