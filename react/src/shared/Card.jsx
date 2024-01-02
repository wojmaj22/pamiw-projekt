import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Card = ({ products, loading }) => {
  const { t } = useTranslation();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl">{t("Card.loading")}</h2>
          <img src="/loader.gif" alt="loading" width="400" height="400" />
        </div>
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      await fetch("http://localhost:8080/api/products/" + id, {
        method: "DELETE",
        headers: {},
      });
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <div className="bg-gray-100 p-8">
      <ul className="responsive-list flex flex-wrap justify-center gap-4">
        {products.map((product) => (
          <div key={product.id} className="card w-96 bg-base-100 shadow-xl m-4">
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="text-gray-700 text-base">
                {t("Card.price")} {product.price}
              </p>
              <p className="text-gray-700 text-base">
                {t("Card.amount")} {product.stockQuantity}
              </p>
              <Link to={"/form/" + product.id} className="btn btn-primary">
                {t("Card.edit")}
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(product.id)}
              >
                {t("Card.delete")}
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Card;
