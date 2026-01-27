//src/services/BlogsService.js
const BLOGS_URL = "http://localhost:3000/blogs";

export async function getBlogsFromServer() {
  const response = await fetch(`${BLOGS_URL}?_sort=createdAt&_order=desc`);
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return await response.json();
}
export async function getBlogByIdFromServer(id) {
  const response = await fetch(`${BLOGS_URL}/${id}`);
  if (!response.ok) return null;
  return await response.json();
}

export async function addBlogToServer(blogData) {
  const response = await fetch(BLOGS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },//نخبر السيرفر أن البيانات ستكون بصيغة JSON.
    body: JSON.stringify({ 
      ...blogData, 
      createdAt: Date.now() 
    }), 
  });
  if (!response.ok) throw new Error("Failed to add blog");
  return await response.json();
}

export async function updateBlogInServer(id, blogData) {
  const response = await fetch(`${BLOGS_URL}/${id}`, {
    method: "PATCH", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blogData),
  });
  if (!response.ok) throw new Error("Failed to update blog");
  return await response.json();
}

export async function deleteBlogFromServer(id) {
  const response = await fetch(`${BLOGS_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete blog");
}