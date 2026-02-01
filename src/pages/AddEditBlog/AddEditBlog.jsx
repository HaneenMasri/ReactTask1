import { useForm } from "react-hook-form";
import { useNavigate, useLoaderData, useNavigation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./AddEditBlog.module.css";
import Loader from "../../components/Layout/Loader";
import { addBlogToServer, updateBlogInServer } from "../../services/BlogsService";

function AddEditBlog() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const loaderData = useLoaderData();
  const blog = loaderData?.blog || null;
  const isEditMode = !!blog;

  const schema = yup.object().shape({
    title: yup
      .string()
      .required(t("validation.titleRequired"))
      .max(50, t("validation.titleMax"))
      .test("no-arabic", t("validation.noArabic"), (v) => !v || !/[ء-ي]/.test(v))
      .test("no-special-chars", t("validation.noSpecialChars"), (v) => !v || /^[A-Za-z\s]+$/.test(v))
      .test("capital-first", t("validation.capitalFirst"), (v) => !v || /^[A-Z]/.test(v)),
    description: yup
      .string()
      .required(t("validation.descRequired"))
      .max(1000, t("validation.descMax"))
      .test("no-arabic", t("validation.noArabic"), (v) => !v || !/[ء-ي]/.test(v))
      .test("no-special-chars", t("validation.noSpecialChars"), (v) => !v || /^[A-Za-z\s]+$/.test(v)),
  });

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "onChange",
    defaultValues: blog || { title: "", description: "" },
    resolver: yupResolver(schema),
  });

  const showForm = navigation.state === "idle";

  const onSubmit = async (data) => {
    const blogData = {
      title: data.title.trim(),
      description: data.description.trim(),
      lang: "en",
    };

    try {
      if (isEditMode) {
        await updateBlogInServer(blog.id, blogData);
      } else {
        await addBlogToServer(blogData);
      }
      navigate("/?lang=en&page=1");
    } catch (error) {
      console.error("Failed to save blog:", error);
    }
  };

  return (
    <main className={styles.container}>
      {!showForm && <Loader />}

      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>{t("title")}</label>
            <input
              id="title"
              className={`${styles.input} ${errors.title && styles.inputError}`}
              {...register("title")}
            />
            {errors.title && <p className={styles.error}>{errors.title.message}</p>}
          </div>
          <div className={styles.field}>


            
            <label htmlFor="description" className={styles.label}>{t("description")}</label>
            <textarea
              id="description"
              rows={6}
              className={`${styles.textarea} ${errors.description && styles.inputError}`}
              {...register("description")}
            />
            {errors.description && <p className={styles.error}>{errors.description.message}</p>}
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submit} disabled={!isValid}>
              {isEditMode ? t("edit") : t("add")}
            </button>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate("/")}>
              {t("cancel")}
            </button>
          </div>
        </form>
      )}
    </main>
  );
}

export default AddEditBlog;
