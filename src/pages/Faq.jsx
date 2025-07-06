import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const faqList = [
  {
    question: "Bilet neçəyədir?",
    answer:
      "Biletin qiyməti həftənin günündən, vaxtından və formatından asılı olaraq dəyişə bilər. Bu səbəbdən ana səhifədəki cədvəldən istədiyiniz filmə keçid edərək aktual qiymətlərlə tanış ola bilərsiniz.",
  },
  {
    question: '"Love seats" nədir?',
    answer:
      'Bu, sevgililər üçün nəzərdə tutulmuş ikili oturacaqlardır. Bir "love seats"in qiymətinə iki yer əldə edirsiniz.',
  },
  {
    question: "Mənim yaşım filmin yaş reytinqinə uyğun deyilsə, ona baxa bilərəm?",
    answer:
      'Azərbaycan Respublikasının "Kinematoqrafiya haqqında" Qanununun 40.2.2-2-ci maddəsinə görə, yaş təsnifatı təmin edilmədən və müvafiq yaş kateqoriyasına uyğun işarələnmədən informasiya məhsullarının yayımı qadağandır. Bu qanunvericilik aktlarına əsasən, kinoteatrlar filmlərin yaş məhdudiyyətlərinə riayət etməli və yaşa uyğun olmayan şəxslərin müvafiq filmlərə baxmasına icazə verməməlidirlər. Yalnız valideynin müşayiəti ilə mümkündür.',
  },
  {
    question: "Özümüzlə yemək gətirə bilərik?",
    answer:
      "Biz kinoteatrın əmlakına, o cümlədən oturacaqlara və xalçaya ləkə sala biləcək məhsullara, eləcə də onların keyfiyyətinə görə məsuliyyəti daşıya bilmədiyimiz üçün kinoteatrdan kənarda alınmış qida məhsulları ilə zala girişə icazə vermirik. Kinobarımızda satılan bütün məhsullar sertifikatlaşdırılıb və tam təhlükəsizdir.",
  },
  {
    question: "Sizdə endirimlər varmı?",
    answer:
      'Bəli, var. Bununla bağlı ətraflı məlumatı saytımızdakı "Aksiya" bölməsindən əldə edə bilərsiniz.',
  },
];

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-[#373737] text-white px-6 py-30">
      <div className="max-w-[93%] mx-auto">
        <h2 className="text-3xl font-semibold mb-8">FAQ</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {faqList.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div key={index} className="border-b border-gray-500 pb-4 text-[#d9dadb]">
                <div
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => toggleAnswer(index)}
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <button
                    className={`text-white text-sm mt-1 transform transition-transform duration-300 ${
                      isActive ? "rotate-45" : ""
                    }`}
                  >
                    <FaPlus />
                  </button>
                </div>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isActive ? "mt-2 opacity-100 scale-100 max-h-[200px]" : "opacity-0 scale-95 max-h-0"
                  }`}
                >
                  <p className="text-sm text-[#d9dadb] font-semibold">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Faq;
