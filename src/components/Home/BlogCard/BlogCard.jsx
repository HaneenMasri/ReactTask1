import styles from "./BlogCard.module.css";

function BlogCard({ title, description, image }) //props from home 
 {
  return (
    <div className={styles.blogItem}>
      <div
        className={styles.img}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default BlogCard;
