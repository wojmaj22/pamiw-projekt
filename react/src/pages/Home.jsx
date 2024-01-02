import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "../shared/Pagination";
import Card from "../shared/Card";
import { useKeycloak } from "@react-keycloak/web";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    const delay = 10;
    const handleDelayEnd = () => {
      fetchPosts();
      setLoading(false); // Zmiana stanu po zakończeniu opóźnienia
    };
    const fetchPosts = () => {
      fetch("http://localhost:8080/api/products?size=100&page=0", {
        cache: "no-store",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setProducts(data.content);
          return data;
        });
    };
    setLoading(true);
    const timeoutId = setTimeout(handleDelayEnd, delay);

    //fetchPosts();
    return () => clearTimeout(timeoutId);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {keycloak.authenticated && (
        <p>Zalogowany użytkownik: {keycloak.tokenParsed.preferred_username}</p>
      )}
      <Card products={currentProducts} loading={loading}></Card>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={products.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
