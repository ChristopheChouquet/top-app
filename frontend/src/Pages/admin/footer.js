import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function FooterAdmin() {

    // initialisation de l'objet navigate
    const navigate = useNavigate(); 


    //Gestion de la connexion user
    function logout() {  

    // Récupérer tous les cookies
        var cookies = document.cookie.split(";");

    // supprimer les cookies
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        
        axios({
            method: 'post',
            url: 'http://localhost:5000/logout'
        }).then(function (response) {
            navigate('/login');
        }).catch(() => { 
            
        }); 
    }


    return(
        <footer id="footer" className='bg-tertiary-100 fixed bottom-0 w-screen'>
            <div className='p-2.5 pr-0 flex items-center'>

              <div className="bg-tertiary-200 rounded-2xl flex justify-between items-center w-4/5 py-2.5 px-8">
                <NavLink to='/admin/users'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-tertiary-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                </NavLink>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-tertiary-300" onClick={logout}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                </svg>

                <NavLink to='/admin/favday'>
                  <svg version="1.1" id="linkFavday" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48.3 40.8" strokeWidth={1.5} className="w-6 h-6" fill="none">
                      <line className="stroke-tertiary-300" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="1" y1="13.2" x2="47.3" y2="13.2"/>
                      <line className="stroke-tertiary-300" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  x1="35" y1="7.2" x2="35" y2="1"/>
                      <line className="stroke-tertiary-300" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  x1="13.3" y1="1" x2="13.3" y2="7.2"/>
                      <path className="stroke-tertiary-300" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  d="M39.3,39.8h2.1c3.2,0,5.9-2.6,5.9-5.9V10c0-3.2-2.6-5.9-5.9-5.9H6.9C3.6,4.1,1,6.8,1,10v23.9
                        c0,3.2,2.6,5.9,5.9,5.9h23"/>
                      <line className="stroke-tertiary-300" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"  x1="40.1" y1="31.8" x2="8.1" y2="31.8"/>
                      <line className="stroke-tertiary-300" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="33.8" y1="25.9" x2="14.5" y2="25.9"/>
                      <line className="stroke-tertiary-300" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="27.5" y1="20" x2="20.8" y2="20"/>
                  </svg>
                </NavLink>
              </div> 

              <div className="w-1/5 flex justify-center">
                <NavLink to='/topcreate'>
                  <svg xmlns="http://www.w3.org/2000/svg" id="linkTopCreate" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="bg-secondary text-secondary rounded-full h-12 stroke-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </NavLink>
              </div>          
            </div>  
        </footer>
        
    )
}

export default FooterAdmin;