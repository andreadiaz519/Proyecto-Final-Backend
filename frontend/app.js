const API_URL = "http://localhost:3000/products";

const authSection = document.getElementById("authSection");
const dashboardSection = document.getElementById("dashboardSection");

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const createBtn = document.getElementById("createBtn");

const productsContainer = document.getElementById("productsContainer");

let token = "";
let editProductId = null;

// =========================
// REGISTRO
// =========================

registerBtn.addEventListener("click", async () => {

  try {

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
    name,
    email,
    password,
}),
    });

    const data = await response.json();

    if (response.ok) {

      alert("✅ Usuario registrado");

    } else {

      alert(data.mensaje || "Error al registrar");
    }

  } catch (error) {

    console.log(error);
  }
});

// =========================
// LOGIN
// =========================

loginBtn.addEventListener("click", async () => {

  try {

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {

      token = data.token;

      alert("✅ Login exitoso");

      authSection.classList.add("hidden");

      dashboardSection.classList.remove("hidden");

      getProducts();

    } else {

      alert(data.mensaje || "Credenciales incorrectas");
    }

  } catch (error) {

    console.log(error);
  }
});

// =========================
// LOGOUT
// =========================

logoutBtn.addEventListener("click", () => {

  token = "";

  authSection.classList.remove("hidden");

  dashboardSection.classList.add("hidden");
});

// =========================
// CREAR / EDITAR
// =========================

createBtn.addEventListener("click", async () => {

  try {

    const nombre = document.getElementById("nombre").value;

    const marca = document.getElementById("marca").value;

    const precio = document.getElementById("precio").value;

    const categoria = document.getElementById("categoria").value;

    const stock = document.getElementById("stock").value;

    const productData = {
      nombre,
      marca,
      precio,
      categoria,
      stock,
    };

    // EDITAR

    if (editProductId) {

      const response = await fetch(`${API_URL}/${editProductId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {

        alert("✅ Producto actualizado");

        editProductId = null;

        createBtn.textContent = "Crear producto";

        clearInputs();

        getProducts();

      } else {

        alert(data.mensaje);
      }

    } else {

      // CREAR

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {

        alert("✅ Producto creado");

        clearInputs();

        getProducts();

      } else {

        alert(data.mensaje);
      }
    }

  } catch (error) {

    console.log(error);
  }
});

// =========================
// OBTENER PRODUCTOS
// =========================

async function getProducts() {

  try {

    const response = await fetch(API_URL);

    const products = await response.json();

    productsContainer.innerHTML = "";

    products.forEach((product) => {

      productsContainer.innerHTML += `
      
        <div class="product">

          <div class="product-info">

            <div class="product-emoji">
              💄
            </div>

            <h3>${product.nombre}</h3>

            <p><strong>Marca:</strong> ${product.marca}</p>

            <p><strong>Precio:</strong> $${product.precio}</p>

            <p><strong>Categoría:</strong> ${product.categoria}</p>

            <p><strong>Stock:</strong> ${product.stock}</p>

            <div class="buttons">

              <button onclick="editProduct(
                '${product._id}',
                '${product.nombre}',
                '${product.marca}',
                '${product.precio}',
                '${product.categoria}',
                '${product.stock}'
              )">
                ✏ Editar
              </button>

              <button class="delete-btn" onclick="deleteProduct('${product._id}')">
                🗑 Eliminar
              </button>

            </div>

          </div>

        </div>

      `;
    });

  } catch (error) {

    console.log(error);
  }
}

// =========================
// ELIMINAR
// =========================

async function deleteProduct(id) {

  if (!confirm("¿Eliminar producto?")) return;

  try {

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {

      alert("🗑 Producto eliminado");

      getProducts();

    } else {

      alert(data.mensaje);
    }

  } catch (error) {

    console.log(error);
  }
}

// =========================
// EDITAR
// =========================

function editProduct(id, nombre, marca, precio, categoria, stock) {

  document.getElementById("nombre").value = nombre;

  document.getElementById("marca").value = marca;

  document.getElementById("precio").value = precio;

  document.getElementById("categoria").value = categoria;

  document.getElementById("stock").value = stock;

  editProductId = id;

  createBtn.textContent = "Guardar cambios";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// =========================
// LIMPIAR
// =========================

function clearInputs() {

  document.getElementById("nombre").value = "";

  document.getElementById("marca").value = "";

  document.getElementById("precio").value = "";

  document.getElementById("categoria").value = "";

  document.getElementById("stock").value = "";
}