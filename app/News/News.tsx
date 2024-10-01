import axios from "axios";
import React, { useState, useEffect } from "react";
import defaultImage from "../../public/assets/news.jpeg";
import "./about.css";
import { useInView } from "react-intersection-observer";
import { styles } from "../styles/style";

interface Article {
  title: string;
  description: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Google");
  const [page, setPage] = useState<number>(1);
  const pageSize = 8;

  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the fade-in effect only once
    threshold: 0.1, // Trigger when 10% of the element is visible
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<{ articles: Article[] }>(
          `https://newsapi.org/v2/everything?q=${selectedCategory}&from=2024-06-01&to=2024-06-02&sortBy=popularity&pageSize=${pageSize}&page=${page}&apiKey=4b43ffab6b144171aadcead4f8f10f2e`
        );
        setArticles(response.data.articles);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [selectedCategory, page]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setPage(1); // Reset page number when category changes
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="mt-20" ref={ref}>
      <h1
        style={{ textAlign: "center", marginBottom: "20px", fontSize: "35px" }}
      >
        {`${selectedCategory} News`}
      </h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div style={{ display: "inline-block" }}>
          <button
            onClick={() => handleCategoryClick("google")}
            className={`category-button ${
              selectedCategory === "Google" ? "active" : ""
            }`}
          >
            Google
          </button>
          <button
            onClick={() => handleCategoryClick("Artificial Intelligence")}
            className={`category-button ${
              selectedCategory === "artificial+intelligence" ? "active" : ""
            }`}
          >
            Artificial Intelligence
          </button>
          <button
            onClick={() => handleCategoryClick("Apple")}
            className={`category-button ${
              selectedCategory === "apple" ? "active" : ""
            }`}
          >
            Apple
          </button>
          <button
            onClick={() => handleCategoryClick("TCS")}
            className={`category-button ${
              selectedCategory === "tcs" ? "active" : ""
            }`}
          >
            TCS
          </button>{" "}
          <button
            onClick={() => handleCategoryClick("Tesla")}
            className={`category-button ${
              selectedCategory === "tesla" ? "active" : ""
            }`}
          >
            Tesla
          </button>{" "}
          <button
            onClick={() => handleCategoryClick("Microsoft")}
            className={`category-button ${
              selectedCategory === "microsoft" ? "active" : ""
            }`}
          >
            Microsoft
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center content horizontally
          borderRadius: "20px",
          width: "85%", // Restrict width to 75%
          margin: "0 auto", // Center align the container
        }}
      >
        {inView &&
          articles
            .filter((article) => article.title !== "[Removed]") // Filter out empty titles
            .map((article, index) => (
              <div
                key={index}
                className={`news-article fade-in`} // Apply fade-in class
                style={{
                  display: "flex",
                  flexDirection: "row-reverse", // Image on the right side
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "20px 0",
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
                }}
              >
                <div style={{ flex: 1 }}>
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
                    <img
                      src={defaultImage.src}
                      alt="Default"
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </div>

                <div
                  style={{
                    flex: 1,
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  <h2
                    style={{
                      color: "#333",
                      fontSize: "30px",
                      fontWeight: 600,
                    }}
                  >
                    {article.title}
                  </h2>
                  <p style={{ color: "#000", fontWeight: "500" }}>
                    {article.description}
                  </p>
                  <p style={{ color: "#555", fontWeight: "500" }}>
                    Published at:{" "}
                    {new Date(article.publishedAt).toLocaleString()}
                  </p>
                  <a
                    style={{ color: "#ff5454", fontWeight: 600 }}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More...
                  </a>
                </div>
              </div>
            ))}

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`${
              page == 1 ? "cursor-not-allowed " : ""
            } min-h-[45px] bg-[#0c3f61] w-[100px] mr-2 rounded-full `}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className={`min-h-[45px] bg-[#0c3f61] w-[100px] rounded-full`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
