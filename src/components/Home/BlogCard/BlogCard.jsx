import { Link, Form, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./BlogCard.module.css";

function BlogCard({
  id,
  title,
  description,
}) {
  const location = useLocation();
  const { t } = useTranslation();

  // بما أن الإدخال أصبح موحداً، نستخدم القيم المباشرة مع وضع قيمة افتراضية في حال كانت فارغة
  const displayTitle = title || "";
  const displayDesc = description || "";

  return (
    <div className={styles.card}>
      <div className={styles.media}>
        <img
          className={styles.img}
          src={`https://picsum.photos/seed/${id}/400/300`}
          alt={displayTitle}
        />

        <div className={styles.iconBar}>
          <Link
            to={`/blog/${id}/edit${location.search}`}
            className={styles.iconBtn}
            aria-label={t("edit")}
            title={t("edit")}
          >
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l9.06-9.06.92.92L5.92 20.08zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
            </svg>
          </Link>

          <Form
            method="post"
            action={`/blog/${id}/delete${location.search}`}
          >
            <button
              type="submit"
              className={styles.iconBtn}
              aria-label={t("delete")}
              title={t("delete")}
              onClick={(e) => {
                if (!window.confirm(t("confirmDelete") || "Are you sure?")) {
                  e.preventDefault();
                }
              }}
            >
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 7h12l-1 14H7L6 7zm3-3h6l1 2H8l1-2zM9 9h2v10H9V9zm4 0h2v10h-2V9z" />
              </svg>
            </button>
          </Form>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{displayTitle}</h3>
        <p className={styles.desc}>{displayDesc}</p>
      </div>
    </div>
  );
}

export default BlogCard;