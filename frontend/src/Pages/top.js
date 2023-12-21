
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import AffichageTop from "../Components/AffichageTop";
import { useParams } from "react-router";
import Commentaires from "../Components/Commentaires";

function Top() {

    // Je récupère l'ID du top dans l'URL
    const { topId } = useParams();

    return(
        <>
            <div>
                <Header/>
                
                <AffichageTop IDTop={topId}/>
                <Commentaires IDTop={topId}/>

                <Footer SelectedIcon={"1"}/>
            </div>      
        </>

        
        
    )
}

export default Top;