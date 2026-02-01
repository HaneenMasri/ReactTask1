import axios from "axios";

const BLOGS_URL = "http://localhost:3000/blogs";

export async function getBlogsFromServer() {
  try {
    const response = await axios.get(`${BLOGS_URL}?_sort=createdAt&_order=desc`);
    return response.data;
  } catch {
    throw new Error("Failed to fetch blogs");
  }
}

export async function getBlogByIdFromServer(id) {
  try {
    const response = await axios.get(`${BLOGS_URL}/${id}`);
    return response.data;
  } catch  {
    return null;
  }
}
export async function addBlogToServer(blogData) {
  try {
    const response = await axios.post(BLOGS_URL, {
      ...blogData,
      createdAt: Date.now(),
    });
    return response.data;
  } catch{
    throw new Error("Failed to add blog");
  }
}

export async function updateBlogInServer(id, blogData) {
  try {
    const response = await axios.patch(`${BLOGS_URL}/${id}`, blogData);
    return response.data;
  } catch{
    throw new Error("Failed to update blog");
  }
}

export async function deleteBlogFromServer(id) {
  try {
    await axios.delete(`${BLOGS_URL}/${id}`);
  } catch  {
    throw new Error("Failed to delete blog");
  }
}
