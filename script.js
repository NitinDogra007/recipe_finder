const searchBox = document.querySelector('#search');
const container = document.querySelector('.recipes');
const closeModal = document.querySelector('.close-button');
const modal = document.querySelector('.modal');

let recipe = ''; // Declare a variable to store the search value

// Event Listener for Search Box Input
searchBox.addEventListener('change', async (e) => {
	recipe = e.target.value.trim(); // Store the trimmed value in the recipe variable
	console.log('Search query:', recipe);

	// Clear previous search results before fetching new data
	container.innerHTML = '';

	// Only fetch data if recipe is not empty
	if (recipe) {
		try {
			await fetchData(recipe);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	// Clear the search box after search
	e.target.value = '';
});

async function fetchData(query) {
	const response = await fetch(
		`https://api.api-ninjas.com/v1/recipe?query=${query}`,
		{
			headers: {
				'X-Api-Key': 'UmYVBUS2MZW3xMP6+JNGrA==IwhxvYj45FLAlX84',
			},
		}
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch data. Status: ${response.status}`);
	}

	const data = await response.json();
	console.log(data);

	// Render each recipe data
	data.forEach((item) => {
		renderRecipeCard(item);
	});
}

// Render Recipe Cards
function renderRecipeCard(recipeData) {
	const { title, ingredients, instructions } = recipeData;

	// Create card dynamically
	const card = document.createElement('article');
	card.classList.add('card');
	card.innerHTML = `
        <img
            class="recipe-img"
            src="images/sky.jpg"
            alt="${title}"
        />
        <div class="recipe-info">
            <h3 class="recipe-name">${title}</h3>
            <button class='open-button'>Open</button>
        </div>
    `;

	// Create Modal for Recipe Details
	const modal = createModal(title, ingredients, instructions);

	// Append Recipe Card and Modal to Container
	container.appendChild(card);
	document.body.appendChild(modal);

	const openModalButton = card.querySelector('.open-button');
	const closeModalButton = modal.querySelector('.close-button');

	openModalButton.addEventListener('click', () => {
		modal.showModal();
	});

	closeModalButton.addEventListener('click', () => {
		modal.close();
	});
}

// Create Modal Dynamically
function createModal(title, ingredients, instructions) {
	const modal = document.createElement('dialog');
	modal.classList.add('modal');
	modal.innerHTML = `
	  <div class="modal-content">
		<h3 class="modal-title">${title}</h3>
		<p><strong>Ingredients:</strong></p>
		<ul class="modal-ingredients">
		  ${ingredients
				.split('|')
				.map((ingredient) => `<li>${ingredient.trim()}</li>`)
				.join('')}
		</ul>
		<p><strong>Instructions:</strong></p>
		<ol class="modal-instructions">
		  ${instructions
				.split('.')
				.filter((instruction) => instruction.trim() !== '')
				.map((instruction) => `<li>${instruction.trim()}</li>`)
				.join('')}
		</ol>
		<button class="close-button">Close</button>
	  </div>
	`;
	return modal;
}
