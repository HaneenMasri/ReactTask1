import { redirect } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddEditBlog from "./pages/AddEditBlog";
import store from "./configs/store-config";
import { startLoading, stopLoading } from "./store/loaderSlice";

import { 
  getBlogsFromServer, 
  getBlogByIdFromServer, 
  addBlogToServer, 
  updateBlogInServer, 
  deleteBlogFromServer 
} from "./Services/BlogsService";

export async function homeLoader({ request }) {
  store.dispatch(startLoading());
  try {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get("page");
    const currentPage = pageParam ? Number(pageParam) : 1;//إذا ما كتب المستخدم رقم الصفحة، نعتبره الصفحة 1

    const fetchedBlogs = await getBlogsFromServer();

    const allBlogs = [...fetchedBlogs].sort((a, b) => b.createdAt - a.createdAt);

    const blogNumInPage = 6;
    const totalBlogs = allBlogs.length;
    const totalPages = Math.max(1, Math.ceil(totalBlogs / blogNumInPage));//18/6=3
    //Math.max(1, ...) to ensure at least 1 page

    const safePage = currentPage < 1 || isNaN(currentPage)
      ? 1
      : currentPage > totalPages
      ? totalPages
      : currentPage;

    const start = (safePage - 1) * blogNumInPage; //حساب بداية الصفحة (1-1)*6=0
    const blogs = allBlogs.slice(start, start + blogNumInPage);//(0,6)

    return {
      blogs,
      pagination: { currentPage: safePage, totalPages },
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

export async function addBlogAction({ request }) {
  store.dispatch(startLoading());
  try {
    const formData = await request.formData();
    const data = {
      title: String(formData.get("title") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      createdAt: Date.now(), 
    };

    await addBlogToServer(data);

    return redirect("/?page=1");
  } finally {
    store.dispatch(stopLoading());
  }
}
export async function editBlogAction({ request, params }) {
  store.dispatch(startLoading());
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";//بنقرا رقم الصفحة من الرابط 

    const formData = await request.formData();//بناخد على الداتا من الفورم
    const data = {
      title: String(formData.get("title") || "").trim(),
      description: String(formData.get("description") || "").trim(),
    };

    await updateBlogInServer(params.id, data);//ترسل PATCH أو PUT request للسيرفر لتحديث 
    // البيانات

    return redirect(`/?page=${page}`);
  } finally {
    store.dispatch(stopLoading());
  }
}

export async function deleteBlogAction({ request, params }) {
  store.dispatch(startLoading());
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    await deleteBlogFromServer(params.id);

    return redirect(`/?page=${page}`);
  } finally {
    store.dispatch(stopLoading());
  }
}

// Routes 
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "blog/new", element: <AddEditBlog />, action: addBlogAction },
      {
        path: "blog/:id/edit",
        element: <AddEditBlog />,
        loader: editBlogLoader,
        action: editBlogAction,
      },
      { path: "blog/:id/delete", action: deleteBlogAction },
    ],
  },
];

export default routes;