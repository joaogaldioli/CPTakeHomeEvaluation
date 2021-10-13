// Global variables. Data is the array that will store read JSON content
// categories is the list of unique categories found in that JSON
// searchBar and filterBox are references to HTML elements representing
// the searchBar and the filter.
var data = [];
var categories = [];
const searchBar = document.getElementById("searchBar");
const filterBox = document.getElementById("filterBox");

// Event Listener for the Search Bar.
searchBar.addEventListener('keyup', (e) => {
    const target = e.target.value;
    const matches = data.filter(medication => {
        return medication.name.toLowerCase().includes(target.toLowerCase());
    });
    displayMedications(matches);
});

// Event Listener for the Filter Select Box.
filterBox.addEventListener('click', (e) => {
    const target = e.target.value;
    const matches = data.filter(medication => {
        var option = document.getElementById('Categories');
        console.log(option.selectedIndex);
        // If selected index is ALL CATEGORIES, then display all the data.
        if(option.selectedIndex == 0) {
            return data;
        }
        return medication.category.toLowerCase().includes(target.toLowerCase());
    });
    displayMedications(matches);
});

// Function that reads input file and fills out data array.
function readData() {
    document.getElementById("medication_file").addEventListener("change", function() {
        var file_to_read = document.getElementById("medication_file").files[0];
        var fileread = new FileReader();
        fileread.onload = function(e) {
            var content = e.target.result;
            var intern = JSON.parse(content);
            data = intern;
            addCategories("ALL CATEGORIES");
            displayMedications(data);
        };
        fileread.readAsText(file_to_read);
        });
}

// Displays all medications that were extracted from JSON file by generating HTML code.
// @param: data = The medication data that was obtained from the JSON file.
function displayMedications(data) {
    let htmlString = '';
    for(let i = 0; i < data.length; ++i) {
        htmlString += '<tr>';
        htmlString += `<td>${data[i]["category"]}</td>`;
        addCategories(data[i]["category"]);
        htmlString += `<td>${data[i]["name"]}</td>`;
        htmlString += `<td>${data[i]["dose"]}</td>`;
        htmlString += `<td>${data[i]["description"]}</td>`;
        htmlString += `<td>${data[i]["cost"]}</td>`;
        htmlString += '</tr>';
    }
    document.getElementById('tuples').innerHTML = htmlString;
    generateCategories(categories);
}

// Adds categories to filter selector.
// @param: category = category associated with that tuple.
function addCategories(category) {
    // Checks if category for this tuple is already there.
    for(let i = 0; i < categories.length; ++i) {
        if(categories[i] == category) {
            return;
        }
    }
    categories.push(category);
}

// Generates HTML options values for select box for all the categories.
function generateCategories() {
    htmlString = '';
    for(let i = 0; i < categories.length; ++i) {
        htmlString += `<option value="${categories[i]}">${categories[i]}</option>`;
    }
    document.getElementById('Categories').innerHTML = htmlString;
}

readData();