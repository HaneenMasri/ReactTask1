// src/loaders/blogLoaders.js
import store from "../configs/store-config";
import { startLoading, stopLoading } from "../store/loaderSlice";
import { getBlogsFromServer, getBlogByIdFromServer } from "../services/BlogsService";
import { redirect } from "react-router-dom";

// Loader لصفحة الهوم مع Pagination
export async function homeLoader({ request }) {
  store.dispatch(startLoading());
  try {
    const url = new URL(request.url);
    const currentPage = Number(url.searchParams.get("page")) || 1;
    const lang = url.searchParams.get("lang") || "en";

    const blogs = await getBlogsFromServer();

    const filtered = blogs
      .filter(blog => blog.lang === lang)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const perPage = 6;
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const page = Math.min(Math.max(currentPage, 1), totalPages);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return { 
      blogs: paginated, 
      pagination: { currentPage: page, totalPages } 
    };
  } catch (error) {
    console.error("Loader Error:", error);
    return { blogs: [], pagination: { currentPage: 1, totalPages: 1 } };
  } finally {
    store.dispatch(stopLoading());
  }
}

export async function editBlogLoader({ params, request }) {
  store.dispatch(startLoading());
  try {
    const blog = await getBlogByIdFromServer(params.id);
    if (!blog) {
      const url = new URL(request.url);
      const page = url.searchParams.get("page") || "1";
      return redirect(`/?page=${page}`);
    }
    return { blog };
  } finally {
    store.dispatch(stopLoading());
  }
}
