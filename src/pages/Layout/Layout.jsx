// src/pages/Layout/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import styles from "./Layout.module.css";
import Loader from "../../components/Layout/Loader";

function Layout() {
  const location = useLocation();
  const { t } = useTranslation();

  
let pageTitle = t("home");

  if (location.pathname === "/blog/new") pageTitle = t("addBlog");
  else if (location.pathname.includes("/edit")) pageTitle = t("editBlog");

  return (
    <>
      <Header />
      <Loader />

      <main className={styles.main}>
        <h2 className={styles.pageTitle}>{pageTitle}</h2>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;
