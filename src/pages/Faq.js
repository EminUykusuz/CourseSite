import React, { useState, useRef, useEffect } from "react";
// React kütüphanesinden gerekli hook'lar (useState, useRef, useEffect) ve React bileşenleri import ediliyor.

export default function FaqPage() {
    const [openQuestion, setOpenQuestion] = useState(null);
    // `openQuestion` state'i, hangi sorunun açık olduğunu takip etmek için kullanılıyor. Başlangıçta `null` olarak ayarlanmış.

    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };
    // `toggleQuestion` fonksiyonu, bir sorunun açık/kapalı durumunu değiştirmek için kullanılıyor.
    // Eğer tıklanan soru zaten açık ise kapatıyor, değilse açıyor.

    const questions = [
        {
            question: "Soru 1: Lorem ipsum?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id massa ac eros tincidunt ultrices.",
        },
        {
            question: "Soru 2: React nedir?",
            answer: "React, kullanıcı arayüzleri oluşturmak için kullanılan bir JavaScript kütüphanesidir.",
        },
        {
            question: "Soru 3: useState ne işe yarar?",
            answer: "React bileşenlerinde durum (state) yönetimini sağlar.",
        },
        {
            question: "Soru 4: React Router nedir?",
            answer: "React uygulamalarında sayfa geçişlerini yönetmek için kullanılan bir kütüphanedir.",
        },
    ];
    // `questions` dizisi, her bir soru ve cevabı içeren bir liste. Bu liste, sık sorulan soruların içeriğini oluşturuyor.

    return (
        <div id="Faq" style={{ padding: "20px" }}>
            <h2 style={{ color: "white" }}>Sık Sorulan Sorular</h2>
            {questions.map((item, index) => (
                <AccordionItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openQuestion === index}
                    onClick={() => toggleQuestion(index)}
                />
            ))}
        </div>
    );
    // Ana bileşen: `FaqPage`. Sık sorulan soruların listesini oluşturuyor.
    // Her bir soru için `AccordionItem` bileşeni çağrılıyor ve gerekli props'lar (soru, cevap, açık/kapalı durumu, tıklama olayı) aktarılıyor.
}

// 👇 Alt bileşen: AccordionItem — animasyon burada gerçekleşiyor
function AccordionItem({ question, answer, isOpen, onClick }) {
    const contentRef = useRef(null);
    // `contentRef`, DOM elemanına doğrudan erişim sağlamak için kullanılıyor. Bu, animasyon için gerekli.

    useEffect(() => {
        if (isOpen && contentRef.current) {
            contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
        } else if (contentRef.current) {
            contentRef.current.style.maxHeight = "0px";
        }
    }, [isOpen]);
    // `useEffect`, `isOpen` değiştiğinde çalışıyor. Eğer soru açık ise, içeriğin yüksekliği otomatik olarak ayarlanıyor.
    // Eğer kapalı ise, yüksekliği sıfırlanıyor (animasyonlu bir şekilde).

    return (
        <div
            style={{
                marginBottom: "15px",
                borderRadius: "5px",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
            }}
        >
            <h5
                onClick={onClick}
                style={{
                    cursor: "pointer",
                    padding: "20px",
                    fontSize: "16px",
                    color: "white",
                    userSelect: "none",
                }}
            >
                {question}
            </h5>
            {/* // Soru başlığı. Tıklanabilir bir alan olarak tasarlanmış. Tıklandığında `onClick` fonksiyonu çalışıyor. */}

            <div
                ref={contentRef}
                style={{
                    maxHeight: "0px",
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                }}
            >
                <p
                    style={{
                        padding: "0 20px 10px 20px",
                        margin: 0,
                        color: "white",
                        fontSize: "15px",
                    }}
                >
                    {answer}
                </p>
                {/* // Soruya ait cevap. Başlangıçta görünmez (maxHeight: 0px) ve animasyonlu bir şekilde açılıp kapanıyor. */}
            </div>
        </div>
    );
    // `AccordionItem` bileşeni, her bir soru ve cevabı temsil ediyor. Açık/kapalı durumuna göre animasyonlu bir şekilde içerik gösteriliyor.
}