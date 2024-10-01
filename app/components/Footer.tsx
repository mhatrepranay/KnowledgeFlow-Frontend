import React from "react";
import Link from "next/link";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="border border-[#ffffff1c] " />
      <br />
      <div className="w-95% pl-10 mt-0 800px:w-full 800px:max-w-[85%] mx-auto ">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <h1
              className="font-bold mb-4"
              style={{ color: "#A6E22E", fontSize: "25px", fontWeight: 500 }}
            >
              About
            </h1>
            <ul>
              <li className="pb-2">
                <Link href="/about" style={{ color: "#9BD439" }}>
                  Our Story
                </Link>
              </li>
              <li className="pb-2">
                <Link href="/privacy-policy" style={{ color: "#A6E22E" }}>
                  Privacy Policy
                </Link>
              </li>
              <li className="pb-2">
                <Link href="/FAQ" style={{ color: "#6FBA82" }}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h1
              className="font-bold mb-4"
              style={{ color: "#64DFDF", fontSize: "25px", fontWeight: 500 }}
            >
              Quick Links
            </h1>
            <ul>
              <li className="pb-2">
                <Link href="/courses" style={{ color: "#6ED5EB" }}>
                  Courses
                </Link>
              </li>
              <li className="pb-2">
                <Link href="/profile" style={{ color: "#73C6B6" }}>
                  My Account
                </Link>
              </li>
              <li className="pb-2">
                <Link href="/courses-dashboard" style={{ color: "#83A4D4" }}>
                  Courses Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h1
              className="font-bold mb-4"
              style={{ color: "#FF5E78", fontSize: "25px", fontWeight: 500 }}
            >
              Social Links
            </h1>
            <ul>
              <li className="pb-2">
                <Link href="/youtube" style={{ color: "#FF8C94" }}>
                  <FaYoutube className="inline-block mr-2" size={20} />
                  YouTube
                </Link>
              </li>
              <li className="pb-2">
                <Link href="/instagram" style={{ color: "#FFB4B9" }}>
                  <FaInstagram className="inline-block mr-2" size={20} />
                  Instagram
                </Link>
              </li>
              <li className="pb-2">
                <Link href="/facebook" style={{ color: "#FFDEE4" }}>
                  <FaFacebook className="inline-block mr-2" size={20} />
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h1
              className="font-bold mb-4"
              style={{ color: "#FFA738", fontSize: "25px", fontWeight: 500 }}
            >
              Contact Info
            </h1>
            <p className="pb-2 cursor-pointer ">
              <p style={{ color: "#FFB454" }}>Call Us : 8087155191</p>
            </p>
            <p className="pb-2 cursor-pointer">
              <p style={{ color: "#FFCC6B" }}>
                Address: 456 Elm Street, Springfield, USA
              </p>
            </p>
            <p className="pb-2 cursor-pointer">
              <p style={{ color: "#FFE088" }}>
                Email: @knowledgeFlow@gmail.com
              </p>
            </p>
          </div>
        </div>
        <br />
        <p className="text-center mt-8" style={{ color: "#A6E22E" }}>
          Copyright &copy; {new Date().getFullYear()} KnowledgeFlow | All rights
          reserved.
        </p>
      </div>
      <br />
      <br />
    </footer>
  );
};

export default Footer;
