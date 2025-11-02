// assets/js/property.js
import { fetchProperties } from "./api.js";

const propertyContainer = document.getElementById("property-container");

async function renderProperties() {
  const properties = await fetchProperties();
  if (!properties.length) {
    propertyContainer.innerHTML = "<p>No properties available.</p>";
    return;
  }

  propertyContainer.innerHTML = properties
    .map(prop => {
      const imageUrl = prop.images.length ? prop.images[0] : "/assets/images/placeholder.jpg";
      return `
        <div class="property-card">
          <img src="${imageUrl}" alt="${prop.title}" />
          <h3>${prop.title}</h3>
          <p>${prop.description}</p>
          <p><strong>Contact:</strong> ${prop.phone}</p>
        </div>
      `;
    })
    .join("");
}

renderProperties();
