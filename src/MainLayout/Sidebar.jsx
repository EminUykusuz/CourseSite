import { useState } from "react";
import { NavLink } from "react-router-dom";

import "../App.css"; // CSS dosyasını içe aktarın

const items = ["home","build ", "cloud","mail","favorite",]; 

const Icon = ({ icon }) => (
    <span className="material-symbols-outlined">{icon}</span>
);

const Button = ({ item }) => (
    <button type="button">
        <Icon icon={item} />
        <p>{item}</p>
    </button>
);

const Header = () => (
    <header>
      
    </header>
);

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="burger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon icon={isOpen ? "menu_open" : "menu"} />
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="inner">
          <Header />
          <nav>
            {items.map((item) => (
              <Button key={item} item={item} />
            ))}
            <Button item="Settings" />
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
// Sidebar bileşeni burada dışa aktarılıyor
// Bu bileşeni kullanmak için MainLayout bileşeninde içe aktarabilirsiniz