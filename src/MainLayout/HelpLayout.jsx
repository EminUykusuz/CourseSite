import { Outlet, NavLink } from "react-router-dom";
import "../css/helpLayout.css"; // CSS dosyasını ayrıca tanımlarsan güzel olur

export default function HelpLayout() {
  return (
  
    <div id="help-layout">
      <header className="help-header">
        <h1>Yardım Merkezi</h1>
        <p className="help-subtitle">
          Sorun mu yaşıyorsun? Merak etme, buradayız.
        </p>
      </header>

      <nav className="help-nav">
        <ul>
          <li>
            <NavLink to="contact">📬 Bize Ulaşın</NavLink>
          </li>
          <li>
            <NavLink to="faq">❓ Sıkça Sorulanlar</NavLink>
          </li>
        </ul>
      </nav>

      <section className="help-details">
        <h2>Destek Konuları</h2>
        <ul>
          <li>🔧 Hesap ayarlarıyla ilgili yardım</li>
          <li>🔐 Şifre sıfırlama ve güvenlik</li>
          <li>💳 Ödeme sorunları ve fatura işlemleri</li>
          <li>📱 Mobil cihazlarla ilgili sorunlar</li>
          <li>🧾 Hizmet kullanım koşulları</li>
          <li>📦 Sipariş, teslimat ve iade süreçleri</li>
        </ul>
      </section>

      <footer className="help-footer">
        <p>
          Daha fazla yardıma mı ihtiyacın var? İletişim sayfasını ziyaret et, biz senin için buradayız.
        </p>
      </footer>

      <Outlet />
    </div>
  );

}
