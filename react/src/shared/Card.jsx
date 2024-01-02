import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const Card = ({ products, loading }) => {
  const { t } = useTranslation();
  const { keycloak, initialized } = useKeycloak();

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

  const handleAdd = (id) => {
    const dataToSend = {
      items: [
        {
          id: id,
          quantity: 1,
        },
      ],
    };
    fetch(
      `http://localhost:8080/api/orders/${keycloak.idTokenParsed.preferred_username}`,
      {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    );
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
              {keycloak.authenticated && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleAdd(product.id)}
                >
                  {t("Card.add")}
                </button>
              )}
              {keycloak.hasRealmRole("admin") && (
                <div className="flex flex-row justify-between space-x-2 ">
                  <Link
                    to={"/form/" + product.id}
                    className="btn btn-accent flex-1"
                  >
                    {t("Card.edit")}
                  </Link>
                  <button
                    className="btn btn-danger flex-1"
                    onClick={() => handleDelete(product.id)}
                  >
                    {t("Card.delete")}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Card;
