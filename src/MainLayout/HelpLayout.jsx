import {Outlet} from "react-router-dom"; // Outlet, alt bileşenlerin yerleştirileceği yerdir
import {NavLink,} from "react-router-dom"; // Link, sayfalar arasında geçiş yapmak için kullanılır
import ContactPage from "../pages/ContactPage";
export default function HelpLayout() {
    return(
        <div id ="help-layout">
            <h1>Help </h1>
    <ul style={{listStyleType: "none" }}>
        <li><p style={{font:"19px", }}>Yardım</p></li>
        <li><p>Yardım Saçlarımı Seviyorum</p></li>
        <li><p>Yardım sayfasına hoş geldiniz. Burada size yardımcı olacağız.</p></li>
        <li> <p>Herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin.</p></li>
            
            <nav>
            <h3>
            <NavLink to="contact">Contact</NavLink>

            </h3>   
            <h3>
            <NavLink to="Faq" >Sorular</NavLink>
            </h3> 
            </nav>
           
            </ul><footer>
            
           {/* // <ContactPage></ContactPage>  böylede bir gösterme şeklide vardır ama app.jsden yapılan kısım daha geçerli ve toplu durmasını sağlar. */}
            
            
            </footer>
            

            
            

            <Outlet/> {/* Outlet, alt bileşenlerin yerleştirileceği yerdir */}
        
        </div>
    );
}