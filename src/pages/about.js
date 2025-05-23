
import styles from '../css/About.module.css';

export default function HomePage() {
    return (
        <>
         <section id='about' className={styles.about}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Merhaba 👋</h1>
                <h2 className={styles.subheading}>Geleceği birlikte şekillendiriyoruz.</h2>
                <p className={styles.description}>
                    Biz; teknolojiyi sadece bir araç olarak değil, bir değişim gücü olarak görüyoruz.
                    Amacımız, bireylerin ve kurumların dijital dünyadaki potansiyelini en üst düzeye çıkarmalarına yardımcı olmak.
                    Modern web çözümleri, kullanıcı dostu arayüzler ve performans odaklı sistemlerle dijital deneyimi bir adım öteye taşıyoruz.
                </p>

                <h3 className={styles.sectionTitle}>🌟 Vizyonumuz</h3>
                <p className={styles.description}>
                    Herkes için erişilebilir, hızlı ve etkili dijital platformlar üretmek. 
                    Sadece bugünün değil, yarının da ihtiyaçlarına cevap verebilecek çözümler geliştirmek.
                </p>

                <h3 className={styles.sectionTitle}>🚀 Misyonumuz</h3>
                <p className={styles.description}>
                    Teknolojiyi sadeleştirerek sunmak, dijitalleşme sürecini kolaylaştırmak ve her ölçekten kullanıcının teknolojiden faydalanmasını sağlamak.
                </p>

                <h3 className={styles.sectionTitle}>💡 Neden Biz?</h3>
                <ul className={styles.list}>
                    <li>Kullanıcı deneyimi odaklı tasarımlar</li>
                    <li>Mobil uyumlu ve performanslı uygulamalar</li>
                    <li>Güçlü, ölçeklenebilir altyapılar</li>
                    <li>Güncel teknolojilere entegre çözümler</li>
                    <li>Samimi, şeffaf ve güvenilir iş anlayışı</li>
                </ul>

                <p className={styles.description}>
                    Dijital dönüşüm artık bir lüks değil, zorunluluk. Ve biz bu dönüşümün tam merkezindeyiz.
                    Birlikte çalışarak daha güçlü, daha hızlı ve daha akıllı sistemler kurabiliriz.
                </p>
            </div>
        </section>
        </>
    );
}
