// Gather course list

const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');

// Eventlisteners

loadEventListeners();

function loadEventListeners() {
    // When a new course is added
    courses.addEventListener('click', buyCourse);

    // When the remove button is clicking
    shoppingCartContent.addEventListener('click', removeCourse);

    // Clear Cart Btn
    clearCartBtn.addEventListener('click', clearCart);

    // Document Ready
     document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}



// Functions
function buyCourse(e) {
    e.preventDefault();

    // use delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')) {
        // read the course values
        const course = e.target.parentElement.parentElement;

        // read the values
        getCourseInfo(course);
    }
}
// read the HTML info of selected course
function getCourseInfo(course) {
    // Create an object with course data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    // Insert into the shopping cart
    addIntoCart(courseInfo);
}
// Display the selected course into the shopping cart
function addIntoCart(course) {
    // create a <tr>
    const row = document.createElement('tr');

    // Build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100px>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    // Add to the shopping cart
    shoppingCartContent.appendChild(row);

    // Add course into Storage
    saveIntoStorage(course);
}

// Add the courses into the local storage

function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    // add the course into the array
    courses.push(course);

    // since storage only saves strings, we need to convert JSON into a string
    localStorage.setItem('courses', JSON.stringify(courses)
    );
}

// Get the contents from storage
function getCoursesFromStorage() {
    let courses;

    //if something exist on storage then we get value, otherwise create an empty array
    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

// remove course from the dom
function removeCourse(e) {
    let course, courseId;
    // Remove from the dom
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
    }
    console.log(course);
    // Remove from the local storage
    

}

// CLears the shopping cart
function clearCart() {
    // shoppingCartContent.innerHTML = '';

    // recommended way to code
    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    // Clear from local storage
    clearLocalStorage();
}

// Clears the whole local storage
function clearLocalStorage() {
    localStorage.clear();
}

// Loads when document is ready and print courses into the shopping cart

function getFromLocalStorage () {
    let coursesLS = getCoursesFromStorage();

    // LOOP through the courses and print into the cart
    coursesLS.forEach(function(course) {
        // create <tr> 
        const row = document.createElement('tr');

        // print the content
        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width=100px>
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    }
    );
}