import { NavLink } from 'react-router-dom';
import avatar from './images/avatar.png';  


export default function HomePage() {
    return (
        <>
            
            <div id='home'>

                <img src={avatar} alt="User"  style={{float:"center"}}/>
                <h1>Udemy ile kariyerinizi geliştirin</h1>  
                <h1>İhtiyacınız olan tüm yetkinlikler tek bir yerde</h1>
                <p>
                
                Kritik yetkinliklerden teknik konulara kadar çeşitli alanları kapsayan Udemy, profesyonel gelişiminizi destekler.
                </p>
                
            </div>
        </>
    );
}
