// ----------------------------------------------------
// DECLARING VARIABLES
// ----------------------------------------------------
const url = 'https://randomuser.me/api/?results=12&inc=name,picture,email,location,cell,dob&nat=gb';
const container = document.getElementById('page-container');


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
        console.log(data.results[i]);
        html = `
            <div class="employee-container">
                <img src="${data.results[i].picture.large}">
                <div>
                    <p>${data.results[i].name.first} ${data.results[i].name.last}</p>
                    <p>${data.results[i].email}</p>
                    <p>${data.results[i].location.city}</p>
                <div>
            </div>
        `;
        container.innerHTML += html;
    }
};
