async function getAllBands() {
    // Fetch all data from the rest API
    const response = await fetch('http://localhost:3000/bands');
    // convert data to JSON
    const data = await response.json();
    // Display the data 
    showBands(data);
}

function showBands(bands) {
    // Create html for eatch band
    let html ='';
    for(let {name, genre} of bands){
        html += `<p>${name} - ${genre}</p>`;
    }
    //show html in browser
    document.querySelector('#bands').innerHTML = html;
}

async function addBand() {
    // Attach event listener to from
    document.getElementById('bandForm').addEventListener('submit', async(event)=> {
        //prevent default behaviour of forms
        event.preventDefault();

        //Get namd and genre from inout fields
        const name = document.getElementById('bandName').value;
        const genre = document.getElementById('bandGenre').value;

        //create object to send thru POST request
        const band = {
            name: name,
            genre: genre
        };

        //The POST request
        const response = await fetch('http://localhost:3000/bands', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(band)
        });
        // Convert response
        const result = await response.json();
        // Log result
        console.log(result);
        // Show bands again
        getAllBands();

    });
}
getAllBands();
addBand();