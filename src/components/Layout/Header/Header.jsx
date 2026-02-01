import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";
import { useNavigate, useLocation } from "react-router-dom"; 

function Header() {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
    setIsLangOpen(false);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("lang", lng);
    searchParams.set("page", "1");
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>{t("blog")}</div>

      <div className={styles.navContainer}>
        <div className={styles.langDropdown}>
          <button
            className={styles.langBtn}
            onClick={() => setIsLangOpen(!isLangOpen)}
          >
            {i18n.language.toUpperCase()}
            <span className={styles.arrow}></span>
          </button>

          {isLangOpen && (
            <div className={styles.langMenu}>
              <button onClick={() => changeLanguage("ar")}>{t("arabic")}</button>
              <button onClick={() => changeLanguage("en")}>{t("english")}</button>
            </div>
          )}
        </div>

        <input type="checkbox" id="menu-toggle" className={styles.toggle} />
        <label htmlFor="menu-toggle" className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </label>

        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined}>
            {t("home")}
          </NavLink>
          <NavLink to="/blog/new" className={({ isActive }) => isActive ? styles.active : undefined}>
            {t("addBlog")}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
