import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { serverURL } from "../helpers/ApiProvider";

const Card = ({ products, loading, onDelete }) => {
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

  const handleAdd = async (id) => {
    const dataToSend = {
      items: [
        {
          id: id,
          quantity: 1,
        },
      ],
    };
    await fetch(
      `${serverURL}/orders/${keycloak.idTokenParsed.preferred_username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keycloak.token}`,
        },
        body: JSON.stringify(dataToSend),
      }
    );
  };

  return (
    <div className="p-4 ">
      <ul className="responsive-list flex flex-wrap justify-center gap-4">
        {products.map((product) => (
          <div key={product.id} className="card w-96 bg-base-400 shadow-xl m-2">
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
                    onClick={() => onDelete(product.id)}
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
