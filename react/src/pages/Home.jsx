import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "../shared/Pagination";
import Card from "../shared/Card";
import { useKeycloak } from "@react-keycloak/web";
import { serverURL } from "../helpers/ApiProvider";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    const delay = 100;
    const handleDelayEnd = () => {
      fetchProducts();
      setLoading(false);
    };
    const fetchProducts = () => {
      fetch(`${serverURL}/products?size=100&page=0`, {
        cache: "no-store",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          setProducts(data.content);
        });
    };
    setLoading(true);
    const timeoutId = setTimeout(handleDelayEnd, delay);

    //fetchPosts();
    return () => clearTimeout(timeoutId);
  }, []);

  const handleDelete = (id) => {
    try {
      fetch(`${serverURL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    // TODO - tutaj ręcznie zmienić listę products po prostu i powinno się przerenderować
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
  };

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Card
        products={currentProducts}
        loading={loading}
        onDelete={handleDelete}
      ></Card>
      <Pagination
        postsPerPage={productsPerPage}
        totalPosts={products.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
