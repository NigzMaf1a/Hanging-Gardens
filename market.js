import { getProducts } from "./produce";

export async function openAir() {
    // Array to store selected products
    let selectedProducts = [];

    // Function to display produce and allow selection
    async function postProduce() {
        const postContainer = document.getElementById('post'); // Container to display products

        try {
            // Fetch the unsold products from the backend
            const response = await fetch('getProductEndpoint.php', {
                method: 'GET',
            });

            const products = await response.json();

            // Clear any existing content in the 'post' container
            postContainer.innerHTML = '';

            if (products.length > 0) {
                // Loop through each product and create a div for each
                products.forEach(product => {
                    // Create a new div for the product
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product'); // Add a class for styling

                    // Create and append a p element for each field in the product
                    const productInfo = `
                        <p><strong>Product ID:</strong> ${product.ProductID}</p>
                        <p><strong>Farmer ID:</strong> ${product.FarmerID}</p>
                        <p><strong>Type:</strong> ${product.Type}</p>
                        <p><strong>Quality:</strong> ${product.Quality}</p>
                        <p><strong>Price:</strong> ${product.Price}</p>
                        <p><strong>Sale Status:</strong> ${product.SaleStatus}</p>
                        <label>
                            <input type="checkbox" class="product-checkbox" data-product-id="${product.ProductID}" data-price="${product.Price}" />
                            Select
                        </label>
                    `;

                    productDiv.innerHTML = productInfo;

                    // Append the div to the container
                    postContainer.appendChild(productDiv);
                });
            } else {
                postContainer.innerHTML = '<p>No unsold products found.</p>';
            }
        } catch (error) {
            console.error("Error:", error);
            postContainer.innerHTML = '<p>Error loading products.</p>';
        }
    }

    // Call postProduce to load products and allow selection
    await postProduce();

    // Function to collect the selected products
    async function tray() {
        // Get all checked checkboxes
        const selectedCheckboxes = document.querySelectorAll('.product-checkbox:checked');

        // Create an array of selected products based on the checked checkboxes
        selectedProducts = [];
        selectedCheckboxes.forEach(checkbox => {
            const productId = checkbox.getAttribute('data-product-id');
            const price = parseInt(checkbox.getAttribute('data-price'));

            selectedProducts.push({ productId, price });
        });

        // Return the selected products
        return selectedProducts;
    }

    // Function to calculate the total price of selected products
    async function pay4Produce() {
        const selectedProduce = await tray(); // Get the selected products from tray
        const totalAmount = selectedProduce.reduce((sum, product) => sum + product.price, 0); // Sum the prices
        return totalAmount;
    }

    // Example usage: Calculate total price for selected produce
    const totalAmount = await pay4Produce();
    console.log("Total amount for selected produce:", totalAmount);
}



export async function addProduce(FarmerID) {
    const productDetails = {
        farmerID: FarmerID,
        type: document.getElementById("productType").value,  // Assuming there's an input field with this id
        quality: document.getElementById("productQuality").value,  // Assuming there's an input field with this id
        price: parseInt(document.getElementById("productPrice").value),  // Assuming there's an input field with this id
    };

    // Validate input
    if (!productDetails.type || !productDetails.quality || isNaN(productDetails.price)) {
        alert("Please fill in all the fields correctly.");
        return;
    }

    try {
        const response = await fetch('postProductEndpoint.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productDetails),
        });

        const result = await response.json();

        if (result.success) {
            alert("Product added successfully. Product ID: " + result.productID);
            // Optionally, reset the form or do further processing
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while adding the product.");
    }
}

export async function kibanda() {
    // Call the tray function to get the selected products
    const selectedProduce = await tray();

    // Get the profit rate input field
    const profitInput = document.getElementById('profitRate');
    if (!profitInput) {
        console.error('Input field with id "profitRate" not found.');
        return;
    }

    // Parse the profit rate from the input field
    const profitRate = parseFloat(profitInput.value);
    if (isNaN(profitRate)) {
        console.error('Invalid profit rate. Please enter a valid number.');
        return;
    }

    // Function to collect selected products from checkboxes
    function basket() {
        const selectedCheckboxes = document.querySelectorAll('.product-checkbox:checked');
        const basketItems = [];

        selectedCheckboxes.forEach((checkbox) => {
            const productId = checkbox.getAttribute('data-product-id');
            const price = parseFloat(checkbox.getAttribute('data-price'));
            basketItems.push({ productId, price });
        });

        return basketItems;
    }

    // Loop through the selectedProduce array
    selectedProduce.forEach((produce) => {
        // Calculate the price with profit
        const priceWithProfit = produce.price * profitRate;

        // Create a new div element
        const div = document.createElement('div');
        div.classList.add('product-item'); // Add a class for styling or identification

        // Create a checkbox for the product
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('product-checkbox');
        checkbox.setAttribute('data-product-id', produce.productId);
        checkbox.setAttribute('data-price', priceWithProfit.toFixed(2));
        div.appendChild(checkbox);

        // Create a paragraph element for the product ID
        const productIdParagraph = document.createElement('p');
        productIdParagraph.textContent = `Product ID: ${produce.productId}`;
        div.appendChild(productIdParagraph);

        // Create a paragraph element for the price with profit
        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `Price with Profit: ${priceWithProfit.toFixed(2)}`;
        div.appendChild(priceParagraph);

        // Append the div to a container in the DOM (assume there is a container with the id 'product-container')
        const container = document.getElementById('product-container');
        if (container) {
            container.appendChild(div);
        } else {
            console.warn('Container with id "product-container" not found.');
        }
    });

    // You can call the basket function here or elsewhere in the code
    // const selectedBasket = basket();
    // console.log(selectedBasket);
}
