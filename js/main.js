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
    let html;

    // Loop and create main HTML content
    data.map(employee => {

        // Declaring varibales 
        const firstName = employee.name.first;
        const lastName = employee.name.last;
        const img = employee.picture.large;
        const email = employee.email;
        const locationStreet = employee.location.street;
        const locationCity = employee.location.city;
        const locationState = employee.location.state;
        const locationPostcode = employee.location.postcode;
        const phone = employee.cell;

        // Adds the HTML to the page
        container.innerHTML += `
            <div class="employee-container">
                <div class="employee-image">
                    <img src="${img}">
                </div>
                <div class="employee-text">
                    <p>${firstName} ${lastName}</p>
                    <p>${email}</p>
                    <p>${locationCity}</p>
                <div>    
            </div> 
        `;
    });
};

// ----------------------------------------------------
// Initialise the page
// ----------------------------------------------------
fetchData(url)
    .then(response => generateHTML(response.results));
