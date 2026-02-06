let role = "";
let cart = [];

let menuItems = [
    {
        name: "Andhra Chicken Dum Biryani",
        price: 250,
        image: "https://images.unsplash.com/photo-1604908177225-1f3c0b5f7f5a"
    },
    {
        name: "Fish Fry",
        price: 220,
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
    },
    {
        name: "Prawn Fry",
        price: 260,
        image: "https://images.unsplash.com/photo-1625943555419-56a2cb596640"
    },
    {
        name: "Mutton Biryani",
        price: 320,
        image: "https://images.unsplash.com/photo-1628294895950-9805252327c1"
    },
    {
        name: "Chicken 65",
        price: 200,
        image: "https://images.unsplash.com/photo-1600628422019-4bbf4d0b1b16"
    },
    {
        name: "Paneer Biryani",
        price: 210,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
    },
    {
        name: "Veg Dum Biryani",
        price: 170,
        image: "https://images.unsplash.com/photo-1626509653291-88d6caa9c6b3"
    }
];

function login() {
    const u = username.value;
    const p = password.value;

    if (u === "admin" && p === "admin123") role = "admin";
    else if (u === "customer" && p === "cust123") role = "customer";
    else {
        loginMsg.innerText = "❌ Wrong credentials!";
        return;
    }

    loginBox.classList.add("hidden");
    app.classList.remove("hidden");

    if (role === "admin") {
        adminPanel.classList.remove("hidden");
        renderAdminMenu();
    } else {
        customerPanel.classList.remove("hidden");
        cartSection.classList.remove("hidden");
        renderMenu();
    }
}

function logout() {
    location.reload();
}

function renderAdminMenu() {
    adminMenu.innerHTML = "";
    menuItems.forEach((item, i) => {
        adminMenu.innerHTML += `
            <li>
                ${item.name} - ₹${item.price}
                <button onclick="editItem(${i})">✏️</button>
                <button onclick="deleteItem(${i})">🗑️</button>
            </li>`;
    });
}

function addItem() {
    if (!itemName.value || !itemPrice.value || !itemImage.value) return;

    menuItems.push({
        name: itemName.value,
        price: Number(itemPrice.value),
        image: itemImage.value
    });

    itemName.value = "";
    itemPrice.value = "";
    itemImage.value = "";

    renderAdminMenu();
}

function editItem(i) {
    const item = menuItems[i];
    const name = prompt("Food name:", item.name);
    const price = prompt("Price:", item.price);
    const image = prompt("Image URL:", item.image);

    if (name && price && image) {
        menuItems[i] = { name, price: Number(price), image };
        renderAdminMenu();
        renderMenu();
    }
}

function deleteItem(i) {
    menuItems.splice(i, 1);
    renderAdminMenu();
    renderMenu();
}

function renderMenu() {
    menu.innerHTML = "";
    menuItems.forEach(item => {
        menu.innerHTML += `
            <div class="item">
                <img src="${item.image}">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <button onclick="addToCart('${item.name}', ${item.price})">Add 🍽️</button>
            </div>`;
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    funnyMsg.innerText = getFunnyText();
    renderCart();
}

function renderCart() {
    let total = 0;
    cart.innerHTML = "";
    document.getElementById("cart").innerHTML = "";

    cart.forEach(i => {
        total += i.price;
        document.getElementById("cart").innerHTML +=
            `<li>${i.name} - ₹${i.price}</li>`;
    });

    document.getElementById("total").innerText = total;
}

function getFunnyText() {
    const texts = [
        "😋 Good choice! Your stomach approves.",
        "🔥 That dish is famous!",
        "🍗 Chef says: excellent taste!",
        "🤤 Smells amazing already!",
        "🥳 Party in your plate!"
    ];
    return texts[Math.floor(Math.random() * texts.length)];
}