import React from "react";
import { styles } from "../styles/style";
import { FaRegLightbulb } from "react-icons/fa";

const Policy = () => {
  return (
    <div className="mt-20 pb-20">
      <div className={`absolute inset-0`}></div>
      <br />

      <h1
        style={{ fontSize: "35px", color: "white" }}
        className={`${styles.title}`}
      >
        KnowledgeFlow Platform{" "}
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
            Terms and Conditions
          </span>
        </span>
      </h1>
      <br />

      <div className="w-[95%] 800px:w-[85%] m-auto max-w-[75%] relative z-10">
        <p style={{ color: "#fff", fontSize: "18px" }}>
          Please read these Terms and Conditions ("Terms", "Terms and
          Conditions") carefully before using the KnowledgeFlow Platform
          operated by KnowledgeFlow.
          <br />
          <br />
          Your access to and use of the Service is conditioned on your
          acceptance of and compliance with these Terms. These Terms apply to
          all visitors, users, and others who access or use the Service.
          <br />
          <br />
          By accessing or using the Service you agree to be bound by these
          Terms. If you disagree with any part of the terms then you may not
          access the Service.
          <br />
          <br />
          <strong style={{ color: "#f39c12" }}>Termination</strong>
          <br />
          We may terminate or suspend access to our Service immediately, without
          prior notice or liability, for any reason whatsoever, including
          without limitation if you breach the Terms.
          <br />
          <br />
          All provisions of the Terms which by their nature should survive
          termination shall survive termination, including, without limitation,
          ownership provisions, warranty disclaimers, indemnity and limitations
          of liability.
          <br />
          <br />
          <strong style={{ color: "#f39c12" }}>Governing Law</strong>
          <br />
          These Terms shall be governed and construed in accordance with the
          laws of [Your Country], without regard to its conflict of law
          provisions.
          <br />
          <br />
          Our failure to enforce any right or provision of these Terms will not
          be considered a waiver of those rights. If any provision of these
          Terms is held to be invalid or unenforceable by a court, the remaining
          provisions of these Terms will remain in effect. These Terms
          constitute the entire agreement between us regarding our Service, and
          supersede and replace any prior agreements we might have between us
          regarding the Service.
        </p>
      </div>
    </div>
  );
};

export default Policy;
