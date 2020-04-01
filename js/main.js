// ----------------------------------------------------
// DECLARING VARIABLES
// ----------------------------------------------------
const url = 'https://randomuser.me/api/?results=12&inc=name,picture,email,location,cell,dob&nat=gb';
const container = document.getElementById('content-container');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];



// ----------------------------------------------------
// FETCH FUNCTION
// ----------------------------------------------------
fetch(url)
    .then(response => response.json())
    .then(data => generateHTML(data))




// ----------------------------------------------------
// FUNCTIONS
// ----------------------------------------------------
function generateHTML(data) {
    let html;
    for (let i = 0; i < data.results.length; i++) {
        html = `
            <div class="employee-container">
                <div class="employee-image">
                    <img src="${data.results[i].picture.large}">
                </div>
                <div class="employee-text">
                    <p>${data.results[i].name.first} ${data.results[i].name.last}</p>
                    <p>${data.results[i].email}</p>
                    <p>${data.results[i].location.city}</p>
                <div>    
            </div> 
        `;
        container.innerHTML += html;
    }
};



// ----------------------------------------------------
// Event Listeners
// ----------------------------------------------------

// Listens for a click on the page container
container.addEventListener('click', event => {
    if (event.target.className === 'employee-container') {
        if (modal.style.display !== 'block') {
            modal.style.display = "block";
        }
    }
});

// Event listen for the close button on modal window
span.addEventListener('click', () => {
    modal.style.display = 'none';
});


