// properties.js
document.addEventListener("DOMContentLoaded", async () => {
  checkAuth();
  loadProperties();

  document.getElementById("propertyForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    try {
      await apiRequest("/properties", "POST", form, true);
      Swal.fire("Success", "Property added!", "success");
      e.target.reset();
      loadProperties();
    } catch (err) {
      Swal.fire("Error", "Failed to add property", "error");
    }
  });
});

async function loadProperties() {
  const container = document.getElementById("propertyList");
  container.innerHTML = "<p>Loading...</p>";
  try {
    const properties = await apiRequest("/properties");
    container.innerHTML = properties.map(p => `
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <h5>${p.title}</h5>
          <p>${p.description}</p>
          <p><b>Phone:</b> ${p.phone}</p>
          <button class="btn btn-danger btn-sm" onclick="deleteProperty(${p.id})">Delete</button>
        </div>
      </div>
    `).join("");
  } catch {
    container.innerHTML = "<p>Failed to load properties</p>";
  }
}

async function deleteProperty(id) {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "This will permanently delete the property.",
    icon: "warning",
    showCancelButton: true
  });
  if (confirm.isConfirmed) {
    await apiRequest(`/properties/${id}`, "DELETE");
    Swal.fire("Deleted", "Property removed", "success");
    loadProperties();
  }
}
