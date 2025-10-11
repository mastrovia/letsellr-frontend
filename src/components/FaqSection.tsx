import { useState } from "react";

const faqs = [
  {
    question: "How to find available properties ?",
    answer:
      "You can search for properties by location, category, or type. We list PGs, houses, apartments, commercial spaces, and land to match your needs.",
  },
  {
    question: "How do I book or reserve a property ?",
    answer:
      "Once you find a property you like, simply contact the owner or schedule a visit through the platform. Booking confirmation happens directly with the owner.",
  },
  {
    question: "Can I get help if I face any issues ?",
    answer:
      "Of course! Our support team is available to help with listing issues, chat problems, or any other concerns you face during your property search.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white md:py-10" id="faq">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-5 w-full ">
        <div className="md:w-full md:text-start text-center col-span-2 px-5 md:px-0 mb-8 flex flex-col gap-3">
          <h2 className="text-3xl font-bold text-gray-800 ">Frequently Asked Questions</h2>
          <p className="md:max-w-[70%]">Quick answers to help you search, list, or book properties with ease.</p>
        </div>

        <div className="space-y-4 col-span-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <span
                  className={`text-xl transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-45 text-blue-600" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40 opacity-100 p-4 pt-0" : "max-h-0 opacity-0 p-0"
                } overflow-hidden text-gray-600`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
