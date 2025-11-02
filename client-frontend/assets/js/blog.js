// // assets/js/blog.js
// // const API_BASE = 'https://backend.fusionstructengineering.com';
//  const BASE_URL = "http://localhost:5000/api";
// async function fetchBlogs() {
//   try {
//     const response = await fetch(`${API_BASE}/api/blogs`);
//     if (!response.ok) throw new Error(`Failed to fetch blogs: ${response.status}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {

//     console.error(error);
//     return [];
//   }
// }

// document.addEventListener('DOMContentLoaded', async () => {
//   const blogContainer = document.getElementById('blog-container');
//   if (!blogContainer) return console.error('blog-container element not found');

//   const blogs = await fetchBlogs();

//   if (!blogs.length) {
//     blogContainer.innerHTML = '<p style="text-align:center;">No blogs available at the moment.</p>';
//     return;
//   }

//   blogContainer.innerHTML = blogs.map(blog => {
//     const imageUrl = blog.image.length ? `${API_BASE}${blog.image[0]}` : '/assets/images/placeholder.jpg';
//     const createdDate = new Date(blog.created_at).toLocaleDateString();
//     return `
//       <div class="blog-card">
//         <img src="${imageUrl}" alt="${blog.title}">
//         <h3>${blog.title}</h3>
//         <p>${blog.description}</p>
//         <span>${createdDate}</span>
//       </div>
//     `;
//   }).join('');
// });

// export { fetchBlogs };










async function loadHTML(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return await res.text();
}

document.addEventListener("DOMContentLoaded", async () => {
  const blogContainer = document.getElementById("blog-container");
  if (!blogContainer) return console.error("blog-container not found");

  // Load the card template
  const cardTemplate = await loadHTML("components/cards.html");

  // Dummy blogs with long descriptions
  const dummyBlogs = [
    {
      title: "Designing Modern Infrastructure",
      description: "Learn how FusionStruct optimizes real estate structures for efficiency and sustainability. In this blog, we dive deep into modern construction methods, innovative material usage, energy-efficient designs, and how technology helps us plan and execute large-scale projects. This article is ideal for engineers, architects, and enthusiasts who want to understand the future of building modern infrastructure.",
      image: "assets/images/blog1.jpg"
    },
    {
      title: "Smart Urban Development",
      description: "The future of city planning is intelligent. Smart urban development uses IoT, AI, and sustainable practices to create cities that are livable, efficient, and eco-friendly. This blog explores case studies, technological trends, and the impact of urban innovation on communities. Whether you're a policy maker or a resident, understanding smart cities is key to shaping a better urban future.",
      image: "assets/images/blog2.jpg"
    },
    {
      title: "Engineering the Future",
      description: "At FusionStruct, we bring precision and innovation to every project. This article highlights engineering breakthroughs, problem-solving methodologies, and how we leverage advanced analytics to optimize building performance. From foundation to finishing, we ensure projects are structurally sound, aesthetically appealing, and sustainable for generations to come.",
      image: "assets/images/blog3.jpg"
    }
  ];

  // Maximum characters to show in card
  const MAX_LENGTH = 150;

  // Render cards dynamically
  blogContainer.innerHTML = dummyBlogs
    .map((blog, index) => {
      const shortDescription = blog.description.length > MAX_LENGTH 
        ? blog.description.slice(0, MAX_LENGTH) + "..." 
        : blog.description;

      return cardTemplate
        .replace(/Dummy Blog Title/g, blog.title)
        .replace(/This is a sample description.*?API./g, shortDescription)
        .replace(/assets\/images\/placeholder.jpg/g, blog.image)
        .replace(/DUMMY_ID/g, index);
    })
    .join("");
});
