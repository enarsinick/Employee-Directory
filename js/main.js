// ----------------------------------------------------
// DECLARING VARIABLES
// ----------------------------------------------------
const url = 'https://randomuser.me/api/?results=12&inc=name,picture,email,location,cell,dob&nat=gb';
const container = document.getElementById('content-container');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalContainer = document.getElementById('modal-wrapper');
const modalWrapper = document.getElementById('modal-wrapper').childNodes;
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
                <div class="employee-image" data-index="${index}">
                    <img class="employee-image-inner" src="${img}" data-index="${index}">
                </div>
                <div class="employee-text" data-index="${index}">
                    <p class="employee-name" data-index="${index}">${firstName} ${lastName}</p>
                    <p class="employee-location" data-index="${index}">${locationCity}</p>
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

// Listen for click on employee container and displays corresponding modal window
document.addEventListener('click', event => {
    const target = event.target.className;
    const targetIndex = event.target.getAttribute('data-index');
    const modalWindow = document.getElementsByClassName('modal-' + targetIndex)[0];
    if (
        target === 'employee-container' || 
        target === 'employyee-image' ||
        target === 'employee-image-inner' ||
        target === 'employee-text' ||
        target === 'employee-name' ||
        target === 'employee-location'
        ) {
        modalWindow.style.display = 'block';
        overlay.style.display = 'flex';
    } 
});

// Listening for clicks on black overlay of popup and closes modal window
overlay.addEventListener('click', target => {
    if (event.target.className === 'overlay') {
        overlay.style.display = 'none';
        for (let i = 0; i < modalWrapper.length; i++) {
            if (modalWrapper[i].nodeName == 'DIV') {
                if (modalWrapper[i].style.display == 'block') {
                    modalWrapper[i].style.display = 'none';
                }
            }
        }
    }
});


// ----------------------------------------------------
// Initialise the page
// ----------------------------------------------------
fetchData(url)
    .then(response => generateHTML(response.results));
