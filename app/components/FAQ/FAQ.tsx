import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [isVisible, setIsVisible] = useState(false);

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const reviewsElement = document.getElementById("faq");
      if (reviewsElement) {
        const scrollTop = window.scrollY;
        const reviewsOffset = reviewsElement.offsetTop;
        const windowHeight = window.innerHeight;

        if (scrollTop + windowHeight > reviewsOffset) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="faq"
      className={`w-[90%] 800px:w-[80%] m-auto mt-[120px] h-screen ${
        isVisible ? "fade-in" : ""
      }`}
    >
      <h1 style={{ fontSize: "35px" }} className={`${styles.title}`}>
        Frequently asked Questions
      </h1>
      <div className="mt-12">
        <dl className="space-y-8">
          {questions.map((q: any) => (
            <div
              key={q._id}
              className={`border-gray-200 pt-6 ${
                q._id !== questions[0]?._id ? "border-t" : ""
              }`}
            >
              <dt style={{ fontSize: "1.125rem" }}>
                <button
                  className="flex items-start justify-between w-full text-left focus:outline-none hover:bg-gray-200"
                  onClick={() => toggleQuestion(q._id)}
                >
                  <span>{q.question}</span>
                  <span className="ml-6 flex-shrink-0">
                    {activeQuestion === q._id ? (
                      <HiMinus className="h-6 w-6" />
                    ) : (
                      <HiPlus className="h-6 w-6" />
                    )}
                  </span>
                </button>
              </dt>
              {activeQuestion === q._id && (
                <dd className="mt-2 pr-12">
                  <p className="text-base font-Poppins ">{q.answer}</p>
                </dd>
              )}
            </div>
          ))}
        </dl>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default FAQ;
