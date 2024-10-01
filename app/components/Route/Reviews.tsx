import { styles } from "@/app/styles/style";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import ReviewCard from "../Review/ReviewCard";

const Reviews = () => {
  const [isVisible, setIsVisible] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      profession: "Software Engineer |Harvard University",
      comment:
        "Great course! Really helped me improve my skills. The instructor was knowledgeable and provided clear explanations throughout the course. I especially liked the hands-on exercises, which allowed me to apply what I learned in real-world scenarioourse. I especially liked the hands-on exercises, which allowed me to apply what I learned in real-world scenarioourse. I especially liked the hands-on exercises, which allowed me to apply what I learned in real-world scenarioourse. I especially liked the hands-on exercises, which allowed me to apply what I learned in real-world scenarios.",
    },
    {
      name: "Alice Smith",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      profession: "Graphic Designer |Stanford University",
      comment:
        "Excellent content and very well explained. The course covered a wide range of topics and provided valuable insights into graphic design principles. I would highly recommend it to anyone looking to enhance their design skills.Excellent content and very well explained. The course covered a wide range of topics and provided valuable insights into graphic design principles. I would highly recommend it to anyone looking to enhance their design skills.Excellent content and very well explained. The course covered a wide range of topics and provided valuable insights into graphic design principles. I would highly recommend it to anyone looking to enhance their design skills.",
    },
    {
      name: "Michael Brown",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      profession: "Data Analyst |University of Cambridge",
      comment:
        "I learned a lot from this course. Highly recommended! The instructor did a fantastic job of breaking down complex concepts into easy-to-understand lessons. The course projects were challenging but rewarding, and they helped me solidify my understanding of data analysis techniques.I learned a lot from this course. Highly recommended! The instructor did a fantastic job of breaking down complex concepts into easy-to-understand lessons. The course projects were challenging but rewarding, and they helped me solidify my understanding of data analysis techniques.",
    },
    {
      name: "Emily Johnson",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      profession: "Marketing Manager |Oxford University",
      comment:
        "Amazing instructor and great course material. I was impressed by the depth of coverage on marketing strategies and tactics. The real-world examples provided valuable insights into how to apply these concepts in a business context. Overall, an enriching learning experience!",
    },
    {
      name: "David Wilson",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      profession: "Web Developer |Princeton University",
      comment:
        "The course exceeded my expectations. Thank you! I've taken many web development courses before, but this one stands out for its comprehensive coverage of modern web technologies. T .",
    },
    {
      name: "Sarah Lee",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      profession: "Product Manager |University of Cambridge",
      comment:
        "Very informative and well-structured course. The curriculum was well-paced, and each topic was covered in-depth. I appreciated the practical tips and advice shared by the instructor, which I can apply directly toinformative and well-structured course. The curriculum was well-paced, and each topic was covered in-depth. I appreciated the practical tips and advice shared by the instructor, which I can apply directly to my work as a product manager. Overall, an excellent learning resource!",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const reviewsElement = document.getElementById("reviews");
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
    <>
      <div
        ref={reviewsRef}
        id="reviews"
        className={`w-[90%] 800px:w-[85%] m-auto flex flex-row 800px:flex-row mb-20 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div className="w-full 800px:w-[50%]">
          <Image
            className={`${isVisible ? "fade-in" : ""}`}
            src="/assets/animated1.png"
            alt="business"
            width={600}
            height={200}
          />
        </div>

        <div className="800px:w-[50%] w-full pl-20 pt-40">
          <h3
            style={{ fontSize: "35px", fontWeight: 500 }}
            className={`${styles.title} 800px:!text-[40px] ${
              isVisible ? "fade-in" : ""
            }`}
          >
            Our Students Are{" "}
            <span
              style={{
                fontWeight: 400,
                fontSize: "35px",
                background: "-webkit-linear-gradient(#57e2e0, #920ad7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Strength
            </span>{" "}
            <br />
            See What They Say About Us
          </h3>
          <br />
          <p
            style={{ fontWeight: 400 }}
            className={`${styles.lable} ${isVisible ? "fade-in" : ""}`}
          >
            At the Knowledge Flow Platform, we're committed to empowering
            learners and facilitating seamless knowledge exchange. Our platform
            is designed to provide an enriching learning experience, offering a
            wide range of resources and tools to support your educational
            journey. Whether you're a student, educator, or lifelong learner,
            our platform fosters an environment where knowledge flows freely,
            enabling you to unlock your full potential. Join us and immerse
            yourself in a world of limitless learning opportunities.
          </p>
        </div>
        <br />
        <br />
      </div>
      <div
        className={`grid grid-cols-1 gap-[25px] mb-12 border-0 grid-xl1 grid-lg1 grid-md1 md:[&>*nth-child(3)]:!mt-[-60px] md:[&>*nth-child(6)]:!mt-[-40px] ${
          isVisible ? "fade-in" : ""
        } `}
      >
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </>
  );
};

export default Reviews;
