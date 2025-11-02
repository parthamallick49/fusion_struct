// For testing without backend
const propertyContainer = document.getElementById("property-container");

const dummyProperties = [
  {
    id: 1,
    title: "Luxury Apartment in Banani",
    description: "3BHK luxury apartment near Banani Lake. Fully furnished.",
    phone: "01711-123456",
    images: ["/assets/images/sample1.jpg"],
  },
  {
    id: 2,
    title: "Commercial Space in Gulshan",
    description: "Modern commercial floor available for rent.",
    phone: "01822-654321",
    images: ["/assets/images/sample2.jpg"],
  },
  {
    id: 3,
    title: "Mirpur 1, Building 2",
    description: "Affordable housing in Mirpur 1.",
    phone: "01999-332211",
    images: ["/assets/images/sample3.jpg"],
  },
];

function renderProperties() {
  propertyContainer.innerHTML = dummyProperties
    .map(
      (prop) => `
    <div class="property-card">
      <img src="${prop.images[0]}" alt="${prop.title}" />
      <div class="property-info">
        <h3>${prop.title}</h3>
        <p>${prop.description}</p>
        <p><strong>Contact:</strong> ${prop.phone}</p>
      </div>
    </div>
  `
    )
    .join("");
}

renderProperties();
