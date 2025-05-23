import { useRouteError } from "react-router-dom";
import './ErrorBoundary.css';

export default function ErrorBoundary() {
  const error = useRouteError();
  
  return (
    <div className="error-boundary">
      <h2>Bir hata oluştu!</h2>
      <p className="error-message">
        {error.statusText || error.message}
      </p>
      <p className="error-status">
        Hata kodu: {error.status || "Bilinmiyor"}
      </p>
      <div className="error-actions">
        <a href="/" className="home-button">Ana Sayfa</a>
        <button 
          onClick={() => window.location.reload()} 
          className="reload-button"
        >
          Sayfayı Yenile
        </button>
      </div>
    </div>
  );
}