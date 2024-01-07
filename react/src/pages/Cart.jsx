import { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useTranslation } from "react-i18next";
import { serverURL } from "../helpers/ApiProvider";

function Cart() {
  const [items, setItems] = useState([]);
  const { keycloak, initialized } = useKeycloak();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = () => {
      fetch(
        `${serverURL}/orders/${keycloak.idTokenParsed.preferred_username}`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => setItems(res.orderDetails.sort((a, b) => a.id - b.id)));
    };
    setLoading(true);
    fetchCart();
    setLoading(false);
  }, []);

  const handleChange = (productId, quantity, index) => {
    console.log(index);
    const body = {
      items: [
        {
          id: productId,
          quantity: quantity,
        },
      ],
    };

    fetch(`${serverURL}/orders/${keycloak.idTokenParsed.preferred_username}`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keycloak.token}`,
      },
      body: JSON.stringify(body),
    });

    if (index !== -1) {
      if (quantity !== 0) {
        const updatedProducts = [...items];
        updatedProducts[index] = {
          ...updatedProducts[index],
          quantity: quantity,
        };
        console.log(updatedProducts);
        setItems(updatedProducts);
      } else if (quantity === 0) {
        console.log("CHUJ");
        const updatedProducts = items.filter(
          (_, itemIndex) => itemIndex !== index
        );
        console.log(updatedProducts);
        setItems(updatedProducts);
      }
    }
  };

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
  if (items.length === 0) {
    return (
      <div className="flex justify-center items-start mt-4">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{t("Cart.empty")}</h2>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto flex justify-center items-center mt-8">
      <table className="table">
        <thead>
          <tr>
            <th>{t("Cart.name")}</th>
            <th>{t("Cart.amount")}</th>
            <th></th>
            <th>{t("Cart.price")}</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} className="hover">
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  className="btn btn-accent"
                  onClick={() =>
                    handleChange(item.product.id, item.quantity - 1, index)
                  }
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
              </td>
              <td>{item.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-accent"
                  onClick={() =>
                    handleChange(item.product.id, item.quantity + 1, index)
                  }
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </td>
              <td>
                <button
                  className="btn "
                  onClick={() => handleChange(item.product.id, 0, index)}
                >
                  {t("Cart.delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
