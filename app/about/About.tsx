import React from "react";
import { styles } from "../styles/style";
import { FaRegLightbulb } from "react-icons/fa";

const About = () => {
  return (
    <div className="mt-20 ">
      <div className={`absolute inset-0`}></div>
      <br />
      <h1
        style={{ fontSize: "35px", color: "white" }}
        className={`${styles.title}`}
      >
        What is{" "}
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          <span
            style={{
              fontWeight: 500,
              fontSize: "35px",
              background: "-webkit-linear-gradient(#57e2e0, #920ad7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            KnowledgeFlow
          </span>{" "}
          <FaRegLightbulb
            style={{ fontSize: "35px", color: "#f39c12", marginLeft: "10px" }}
          />
        </span>
      </h1>
      <br />

      <div className="w-[95%] 800px:w-[85%] m-auto max-w-[75%] relative z-10">
        <p style={{ color: "#fff", fontSize: "18px" }}>
          KnowledgeFlow is a cutting-edge platform that revolutionizes the way
          individuals learn and acquire knowledge. With a user-centric design
          and advanced features, KnowledgeFlow aims to empower both educators
          and students in their educational journey. Our platform offers a wide
          array of functionalities tailored to meet the diverse needs of modern
          education. Educators can seamlessly create and manage courses,
          incorporating multimedia content, interactive elements, and
          assessments to enhance the learning experience.
          <br />
          <br />
          For students, KnowledgeFlow provides a dynamic learning environment
          where they can explore various subjects, engage in collaborative
          activities, and track their progress in real-time. Our personalized
          learning paths suggest tailored courses and resources based on
          individual preferences, ensuring a customized educational experience.
          <br />
          <br />
          One of the standout features of KnowledgeFlow is its focus on soft
          skills development. In addition to technical courses, our platform
          offers a comprehensive range of soft skills courses, covering
          communication, leadership, problem-solving, and more. We believe that
          fostering these essential skills is crucial for success in today's
          competitive job market.
          <br />
          <br />
          KnowledgeFlow is more than just a learning management system; it's a
          vibrant community where learners can connect, collaborate, and grow
          together. With features like collaborative learning spaces,
          communication hubs, and social integration, we foster a sense of
          belonging and engagement among our users.
        </p>
        <br />
        <span
          className=""
          style={{
            fontFamily: "Brush Script MT, Brush Script Std, cursive",
            fontSize: "30px",
            color: "#f39c12",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Pranaymhatre-
        </span>
        <h5
          style={{
            color: "#f39c12",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Founder of KnowledgeFlow
        </h5>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
