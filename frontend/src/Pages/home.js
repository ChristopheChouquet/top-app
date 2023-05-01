
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import AffichageTops from "../Components/AffichageTops";

function Home() {


    return(
        <>
            <div>
                <Header/>
                
                <AffichageTops/>

                <Footer SelectedIcon={"1"}/>
            </div>      
        </>

        
        
    )
}

export default Home;