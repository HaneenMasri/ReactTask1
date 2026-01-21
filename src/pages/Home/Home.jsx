import BlogCard from "../../components/Home/BlogCard";
import styles from "./Home.module.css";
import blogs from "../../mocks/blogs";

function Home() {

  return (
    <div className={styles.container}>
      <h1 className={styles.blogTitle}>BLOG</h1>

      <section className={styles.cardsGrid}>
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            description={blog.description}
            image={blog.image}
          />
        ))}
      </section>
    </div>
  );
}

export default Home;
