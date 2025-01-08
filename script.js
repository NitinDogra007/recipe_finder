const searchBox = document.querySelector('#search');
const container = document.querySelector('.recipes');
const closeModal = document.querySelector('.close-button');
const modal = document.querySelector('.modal');
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

// Render Recipe Cards
function renderData(recipeData) {
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

	/* // Attach click event for the modal
	card.addEventListener('click', () => {
		showModal(title, ingredients, instructions);
	}); */

	// Create modal dynamically for each card
	const modal = document.createElement('dialog');
	modal.classList.add('modal');
	modal.innerHTML = `
    <div class="modal-content">
        <h3>${title}</h3>
        <p><strong>Ingredients:</strong></p>
        <ul>
            ${ingredients
							.split('|')
							.map((ingredient) => `<li>${ingredient.trim()}</li>`)
							.join('')}
        </ul>
        <p><strong>Instructions:</strong></p>
        <ol>
            ${instructions
							.split('.')
							.filter((instruction) => instruction.trim() !== '') // Remove empty entries after splitting
							.map((instruction) => `<li>${instruction.trim()}</li>`)
							.join('')}
        </ol>
        <button class="close-button">Close</button>
    </div>
`;

	// Append card and modal to the container
	container.appendChild(card);
	document.body.appendChild(modal); // Assuming modal is appended to the body

	const openModal = card.querySelector('.open-button');
	const closeModal = modal.querySelector('.close-button');

	openModal.addEventListener('click', () => {
		modal.showModal();
	});

	closeModal.addEventListener('click', () => {
		modal.close();
	});
}
