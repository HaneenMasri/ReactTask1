// src/components/Home/BlogCard/BlogCard.jsx
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./BlogCard.module.css";
import { deleteBlogFromServer } from "../../../services/BlogsService";

function BlogCard({ id, title, description }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlogFromServer(id);
      navigate(0);
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.media}>
        <img
          className={styles.img}
          src={`https://picsum.photos/seed/${id}/400/300`}
          alt={title}
        />

        <div className={styles.iconBar}>
          <Link
            to={`/blog/${id}/edit`}
            className={styles.iconBtn}
            title={t("edit")}
          >
          <img
    src="https://cdn-icons-png.flaticon.com/128/1827/1827933.png"
    alt={t("edit")}
    className={styles.icon}
  />          
  </Link>

          <button
            type="button"
            className={styles.iconBtn}
            title={t("delete")}
            onClick={handleDelete}
          >
                 <img
    src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
    alt={t("delete")}
    className={styles.icon}
  />
  
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
      </div>
    </div>
  );
}

export default BlogCard;
