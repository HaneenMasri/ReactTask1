// src/components/Layout/Loader/Loader.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Loader.module.css";

const MIN_MS = 2000; 

function Loader() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false); 
  const minEndRef = useRef(0);
  const hideTimerRef = useRef(null);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const showForMin = () => {
    clearHideTimer();
    setTimeout(() => setVisible(true), 0);
    minEndRef.current = Date.now() + MIN_MS;
  };

  const hideWhenMinDone = () => {
    clearHideTimer();
    const remaining = minEndRef.current - Date.now();
    hideTimerRef.current = setTimeout(() => {
      if (navigation.state === "idle") {
        setVisible(false);
      }
    }, Math.max(0, remaining));
  };

  useEffect(() => {
    minEndRef.current = Date.now() + MIN_MS;
    showForMin(); 
    hideWhenMinDone();
    return () => clearHideTimer();
  }, []);

  useEffect(() => {
    if (navigation.state === "submitting" || navigation.state === "loading") {
      showForMin();
    } else if (navigation.state === "idle") {
      hideWhenMinDone();
    }
  }, [navigation.state]);

  if (!visible) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.box}>
        <div className={styles.spinner} />
        <p className={styles.text}>{t("loadingBlogs")}</p>
      </div>
    </div>
  );
}

export default Loader;