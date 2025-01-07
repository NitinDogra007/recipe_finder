const searchBox = document.querySelector('#search');
const container = document.querySelector('.recipes');
let recipe = ''; // Declare a variable to store the search value

// Listen for changes in the search box
searchBox.addEventListener('change', async (e) => {
	recipe = e.target.value.trim(); // Store the trimmed value in the recipe variable
	console.log('Search query:', recipe);

	// Clear previous search results before fetching new data
	container.innerHTML = '';

	// Call fetchData when the recipe value changes
	if (recipe) {
		await fetchData(recipe);
	}

	e.target.value = '';
});

async function fetchData() {
	const response = await fetch(
		`https://api.api-ninjas.com/v1/recipe?query=${recipe}`,
		{
			headers: {
				'X-Api-Key': 'UmYVBUS2MZW3xMP6+JNGrA==IwhxvYj45FLAlX84',
			},
		}
	);

	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}

	const data = await response.json();
	console.log(data);

	data.map((item) => {
		renderData(item);
	});
	// renderData(data[0]);
}

function renderData(recipeData) {
	// Ensure recipeData contains the necessary properties, e.g., title, image, and description
	const { title, image_url, description } = recipeData;

	// Render the data to the container
	const cardHTML = `
    <article class="card">
        <img
            class="recipe-img"
            src="images/sky.jpg"
            alt="Delicious Egg Sandwich"
        />
        <div class="recipe-info">
            <h3 class="recipe-name">${title}</h3>
            <p class="recipe-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati, quibusdam.
            </p>
        </div>
    </article>
    `;

	// Append the cardHTML to the container's existing content
	container.innerHTML += cardHTML;
}
