import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Form = ({}) => {
  let navigate = useNavigate();
  let { productId } = useParams();
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const [amountValid, setAmountValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setId(productId);
    const init = () => {
      fetch("http://localhost:8080/api/products/" + productId, {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setAmount(data.stockQuantity);
          setPrice(data.price);
        });
    };
    if (productId) {
      init();
    }
  }, []);

  const validateAmount = (amount) => {
    if (amount === undefined || amount == null || amount === "") {
      return false;
    }

    const regExp = /^[0-9]+$/;
    return regExp.test(amount);
  };

  const onAmountChange = (amount) => {
    setAmount(amount);
    setAmountValid(validateAmount(amount));
  };

  const validateName = (name) => {
    if (name === undefined || name == null || name === "") {
      return false;
    } else {
      return true;
    }
  };

  const onNameChange = (name) => {
    setName(name);
    setNameValid(validateName(name));
  };

  const validatePrice = (price) => {
    if (price === undefined || price == null || price === "") {
      return false;
    }

    const regExp = /^\d+(\.\d{1,2})?$/;
    return regExp.test(price);
  };

  const onPriceChange = (price) => {
    setPrice(price);
    setPriceValid(validatePrice(price));
  };

  const save = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        stockQuantity: amount,
        price: price,
      }),
    });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={save} className="w-full max-w-xs">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("Form.productName")}</span>
            {nameValid === false && (
              <span className="label-text-alt text-error">
                {t("Form.nameError")}
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder={t("Form.name")}
            className="input input-bordered w-full max-w-xs"
            name="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("Form.productAmount")}</span>
            {amountValid === false && (
              <span className="label-text-alt text-error">
                {t("Form.amountError")}
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder={t("Form.amount")}
            name="amount"
            className="input input-bordered w-full max-w-xs"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("Form.productPrice")}</span>
            {priceValid === false && (
              <span className="label-text-alt text-error">
                {t("Form.priceError")}
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder={t("Form.price")}
            name="price"
            className="input input-bordered w-full max-w-xs"
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
          />
        </label>
        <button
          className="btn btn-primary w-full mt-6"
          type="submit"
          disabled={!priceValid || !amountValid || !nameValid}
        >
          {t("Form.submitButton")}
        </button>
      </form>
    </div>
  );
};

export default Form;
