export default function ContactPage() {
    return (
        <>
            
            <div id='contact'>
               
               
               
                <h1>Contact</h1>

          <div className="contact-container">
              
                <ul className="contact-list">
                    <li><p style={{font:"19px", }}>İletişim</p></li>
                    <li><p> telefon numaram: 0532 123 45 67</p></li>
                    <li><p>instagram: @eminuyksz</p></li>
                    <li> <p> x: @eminuyksz</p></li>

                </ul>
                   
                <form className="contact-form">
                    <div>
                        <label htmlFor="name">Adınız:</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="message">Mesajınız:</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>
                    <button type="submit">Gönder</button>
                </form>
                      
                </div>
                
            </div>
        </>
    );
}
