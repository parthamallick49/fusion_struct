// blogs.js
document.addEventListener("DOMContentLoaded", async () => {
  checkAuth();
  loadBlogs();

  document.getElementById("blogForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    try {
      await apiRequest("/blogs", "POST", form, true);
      Swal.fire("Success", "Blog added successfully!", "success");
      e.target.reset();
      loadBlogs();
    } catch (err) {
      Swal.fire("Error", "Unable to add blog", "error");
    }
  });
});

async function loadBlogs() {
  const container = document.getElementById("blogList");
  container.innerHTML = "<p>Loading...</p>";
  try {
    const blogs = await apiRequest("/blogs");
    container.innerHTML = blogs.map(blog => `
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <h5>${blog.title}</h5>
          <p>${blog.description}</p>
          <button class="btn btn-danger btn-sm" onclick="deleteBlog(${blog.id})">Delete</button>
        </div>
      </div>
    `).join("");
  } catch {
    container.innerHTML = "<p>Failed to load blogs</p>";
  }
}

async function deleteBlog(id) {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This will permanently delete the blog.",
    icon: "warning",
    showCancelButton: true
  });
  if (confirm.isConfirmed) {
    await apiRequest(`/blogs/${id}`, "DELETE");
    Swal.fire("Deleted", "Blog removed", "success");
    loadBlogs();
  }
}
