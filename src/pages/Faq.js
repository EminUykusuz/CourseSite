import React, { useState, useRef, useEffect } from "react";
import "../css/faq.css"; // Yeni CSS dosyamız

export default function FaqPage() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

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

  return (
    <div id="faq-page">
      <h2 className="faq-title">Sık Sorulan Sorular</h2>
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
}

function AccordionItem({ question, answer, isOpen, onClick }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : "0px";
    }
  }, [isOpen]);

  return (
    <div className={`accordion-item ${isOpen ? "open" : ""}`}>
      <div className="accordion-question" onClick={onClick}>
        {question}
        <span className="accordion-icon">{isOpen ? "▲" : "▼"}</span>
      </div>
      <div className="accordion-answer" ref={contentRef}>
        <p>{answer}</p>
      </div>
    </div>
  );
}
