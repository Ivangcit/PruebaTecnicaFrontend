const loadProductsButton = document.getElementById('loadProductsButton');
const productsContainer = document.getElementById('productsContainer');

loadProductsButton.addEventListener('click', fetchProducts);

async function fetchProducts() {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    productsContainer.innerHTML = '<p class="text-danger">Failed to load products. Please try again later.</p>';
  }
}

function renderProducts(products) {
  productsContainer.innerHTML = '';

  products.slice(0, 41).forEach(product => {
    const col = document.createElement('div');
    col.className = 'col';


    const description = product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description;

    col.innerHTML = `
          <div class="card shadow-sm h-100">
             <img src="${product.images[0]}" class="bd-placeholder-img card-img-top" width="100%" height="225" alt="${product.title}" style="object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${description}</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary view-btn">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-body-secondary">$ ${product.price}</small>
              </div>
            </div>
          </div>
        `;

    const viewBtn = col.querySelector('.view-btn');
    viewBtn.addEventListener('click', () => {
      const modal = new bootstrap.Modal(document.getElementById('productModal'));
      document.getElementById('productModalLabel').innerText = product.title;
      document.getElementById('modalDescription').innerText = product.description;
      document.getElementById('modalCategory').innerText = `Category: ${product.category.name}`;

      const modalImages = document.getElementById('modalImages');
      modalImages.innerHTML = '';


      if (product.images.length > 1) {
        for (let i = 0; i < Math.min(product.images.length, 3); i++) {
          const img = document.createElement('img');
          img.src = product.images[i];
          img.className = 'img-fluid rounded';
          img.style.maxWidth = '200px';
          img.alt = product.title;
          modalImages.appendChild(img);
        }
      }

      modal.show();
    });

    productsContainer.appendChild(col);
  });
}
