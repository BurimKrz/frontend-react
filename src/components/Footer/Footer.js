import React from "react";
import logo from "../Navigation/logo.png";
import "./footer.css";
import { Newsletter } from "./Newsletter";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return(
    <div id="container">
      <footer className="footer-distributed" id="footer">
        <div className="footer-left">
          <img src={logo} className="logoFooter" alt="logo"></img>

          <p className="footer-company-name">Protecht © 2023</p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>{t("footer.St.Uke Bytyqi Nr.7")}</span>
              <span>{t("footer.Prizren, Kosovo")}</span>
              <span>ZIP : 20000</span>
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+383 49 123 123</p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:info@protecht.ch">{t("footer.Email support")}</a>
            </p>
          </div>
          <div>
            <i className="fa fa-envelope"></i>

            <p>info@protecht.ch</p>
          </div>
        </div>

        <div className="footer-right">
          <ul className="list-unstyled">
            <p className="footer-links">
              <li>
                <a href="/Support">{t("footer.Contact Support")}</a>
              </li>
              <br></br>
              <li>
                <a href="/" className="link-1">
                  {t("footer.Home")}
                </a>
              </li>
              <br></br>

              <li>
                <a href="/profile"> {t("navbar.Profile")}</a>
              </li>
              <br></br>

              <li>
                <a href="/account"> {t("navbar.Account")}</a>
              </li>
              <br></br>
              <li>
                <a href="/corporate"> {t("navbar.Corporate")}</a>
              </li>
            </p>
          </ul>
        </div>
        <div className="footer-newsletter">
          <Newsletter />
        </div>
      </footer>
    </div>
  ) 
};

export default Footer;