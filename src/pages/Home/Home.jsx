import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loaderSlice";
import styles from "./Home.module.css";
import BlogCard from "../../components/Home/BlogCard";
import Pagination from "../../components/Home/Pagination";

function Home() {
  // جلب البيانات القادمة من الـ Loader
  const { blogs, pagination } = useLoaderData();
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch(startLoading());
    const timer = setTimeout(() => {
      dispatch(stopLoading());
      setReady(true); // تفعيل عرض المحتوى بعد انتهاء التحميل
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={styles.container}>
      {ready && (
        <>
          <section className={styles.cardsGrid}>
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                description={blog.description}
              />
            ))}
          </section>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        </>
      )}
    </main>
  );
}

export default Home;