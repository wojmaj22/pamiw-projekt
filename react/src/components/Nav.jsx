import React, { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { themeChange } from "theme-change";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import i18n from "i18next";

const Nav = () => {
  const { keycloak, initialized } = useKeycloak();
  const { t } = useTranslation();

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <img width={24} height={24} src="/263142.png" alt="Shop" />
        <h2 className="text-xl">{t("Navbar.shop")}</h2>
      </div>
      <div className="navbar-center lg:flex">
        <a className="btn btn-ghost" href="/">
          {t("Navbar.products")}
        </a>
        {keycloak.authenticated && (
          <a className="btn btn-ghost" href="/order">
            {t("Navbar.cart")}
          </a>
        )}
        {keycloak.hasRealmRole("admin") && (
          <a className="btn btn-ghost" href="/form">
            {t("Navbar.add")}
          </a>
        )}
      </div>
      <div className="navbar-end">
        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller"
            data-toggle-theme="dark,light"
            data-act-class="ACTIVECLASS"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
        <ul>
          <li>
            {!keycloak.authenticated && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => keycloak.login()}
              >
                {t("Navbar.login")}
              </button>
            )}
          </li>
          <li>
            {!!keycloak.authenticated && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => keycloak.logout()}
              >
                {t("Navbar.logout")}
              </button>
            )}
          </li>
        </ul>
      </div>

      <div className="dropdown dropdown-end mr-4">
        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
          {t("Navbar.langSelect")}
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
        >
          <li>
            <button type="submit" onClick={() => i18n.changeLanguage("pl")}>
              Polski
            </button>
          </li>
          <li>
            <button type="submit" onClick={() => i18n.changeLanguage("en")}>
              English
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
