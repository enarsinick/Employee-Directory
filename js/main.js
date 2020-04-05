// ----------------------------------------------------
// DECLARING VARIABLES
// ----------------------------------------------------
const url = 'https://randomuser.me/api/?results=12&inc=name,picture,email,location,cell,dob&nat=gb';
const container = document.getElementById('content-container');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalContainer = document.getElementById('modal-wrapper');
const overlay = document.getElementById('overlay');

// ----------------------------------------------------
// FETCH FUNCTION
// ----------------------------------------------------

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('Looks like there was an error', error))
}; 

// ----------------------------------------------------
// FUNCTIONS
// ----------------------------------------------------

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
} 

function generateHTML(data) {
    
    // Loop and create main HTML content
    data.map((employee, index) => {

        // Declaring varibales 
        const firstName = employee.name.first;
        const lastName = employee.name.last;
        const img = employee.picture.large;
        const locationCity = employee.location.city;

        // Adds the HTML to the page
        container.innerHTML += `
            <div class="employee-container" data-index="${index}">
                <div class="employee-image">
                    <img src="${img}">
                </div>
                <div class="employee-text">
                    <p>${firstName} ${lastName}</p>
                    <p class="employee-location">${locationCity}</p>
                </div>    
            </div> 
        `;
    });

    // Loop through and create modal content
    data.map((employee, index) => {

        // Declaring varibales 
        const firstName = employee.name.first;
        const lastName = employee.name.last;
        const img = employee.picture.large;
        const email = employee.email;
        const locationStreetNumber = employee.location.street.number;
        const locationStreetName = employee.location.street.name;
        const locationCity = employee.location.city;
        const locationState = employee.location.state;
        const locationPostcode = employee.location.postcode;
        const phone = employee.cell;
        const birthday = employee.dob.date;

        modalContainer.innerHTML += `
            <div id="modal-window" class="modal-window modal-${index}">
                <div class="modal-content">
                    <img class="modal-image" src="${img}">
                    <h3>${firstName} ${lastName}</h3>
                    <p>${email}</p>
                    <p>${locationState}</p>
                    <span class="modal-line"></span>
                    <p>${phone}</p>
                    <p>${locationStreetNumber} ${locationStreetName}, ${locationCity}, ${locationState}, ${locationPostcode}</p>
                    <p>Birthday: ${birthday}</p> 
                </div>
            </div>
        `;
    });
};

// ----------------------------------------------------
// Event listeners
// ----------------------------------------------------

container.addEventListener('click', event => {
    if (event.target.className === 'employee-container') {
        const targetIndex = event.target.getAttribute('data-index');
        const modalWindow = document.getElementsByClassName('modal-' + targetIndex)[0];
        modalWindow.style.display = 'block';
        overlay.style.display = 'flex';
    }
});

// ----------------------------------------------------
// Initialise the page
// ----------------------------------------------------
fetchData(url)
    .then(response => generateHTML(response.results));
