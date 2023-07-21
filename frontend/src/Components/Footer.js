import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Footer({SelectedIcon}) {

  useEffect(() => {
    //On enlève les classes des icones du footer
    if (SelectedIcon !== null) {
      const footerIconSelector = document.querySelector(`#footer > div > div > a:nth-child(${SelectedIcon})`);
      const selectAllSVGElement = footerIconSelector.querySelectorAll('*');
      selectAllSVGElement.forEach((element) => {
          element.classList.remove('stroke-tertiary-300');
          element.classList.add('stroke-primary');
      });
    }
    

  // eslint-disable-next-line
  }, []);


    return(
        <footer id="footer" className='bg-tertiary-100 fixed bottom-0 w-screen mx-auto max-w-xl'>
            <div className='p-2.5 pr-0 flex items-center'>

              <div className="bg-tertiary-200 rounded-2xl flex justify-between items-center w-4/5 py-2.5 px-8">
                <NavLink to='/'>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 26.4 37"  className="w-6 h-6" fill="none">
                    <path className="stroke-tertiary-300" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M25.4,19v14.9c0,1.2-0.9,2.1-2.1,2.1H3.1C2,36,1,35.1,1,33.9V19"/>
                    <path className="stroke-tertiary-300" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M1,12.5l11-11c0.6-0.6,1.7-0.6,2.3,0l11,11"/>
                  </svg>
                </NavLink>

                <NavLink to='/recherche'>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 37 37" className="w-6 h-6" fill="none">
                    <circle className="stroke-tertiary-300" cx="23" cy="14.1" r="13.1"/>
                    <path className="stroke-tertiary-300"  d="M8,25.8l-6.3,6.3c-0.9,0.9-0.9,2.3,0,3.2c0.9,0.9,2.3,0.9,3.2,0l6.3-6.3"/>
                  </svg>
                </NavLink>

                <NavLink to='/favday'>
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
                  <svg xmlns="http://www.w3.org/2000/svg" id="linkTopCreate" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="bg-primary text-secondary rounded-full h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </NavLink>
              </div>          
            </div>  
        </footer>
        
    )
}

export default Footer;