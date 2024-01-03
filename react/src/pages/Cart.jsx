import { useState, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useTranslation } from "react-i18next";

function Cart() {
  const [items, setItems] = useState([]);
  const { keycloak, initialized } = useKeycloak();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = () => {
      fetch(
        `http://20.101.96.88:80/api/orders/${keycloak.idTokenParsed.preferred_username}`,
        {
          cache: "no-store",
        }
      )
        .then((res) => res.json())
        .then((res) => setItems(res.orderDetails.sort((a, b) => a.id - b.id)));
    };
    setLoading(true);
    fetchCart();
    setLoading(false);
  }, []);

  const handleChange = (productId, quantity) => {
    const body = {
      items: [
        {
          id: productId,
          quantity: quantity,
        },
      ],
    };
    fetch(
      `http://20.101.96.88:80/api/orders/${keycloak.idTokenParsed.preferred_username}`,
      {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((res) => setItems(res.orderDetails.sort((a, b) => a.id - b.id)));
    if (quantity == 0) {
      window.location.reload();
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
          {items.map((item) => (
            <tr key={item.id} className="hover">
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  className="btn btn-accent"
                  onClick={() =>
                    handleChange(item.product.id, item.quantity - 1)
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
                    handleChange(item.product.id, item.quantity + 1)
                  }
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </td>
              <td>
                <button
                  className="btn "
                  onClick={() => handleChange(item.product.id, 0)}
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
