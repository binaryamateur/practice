
console.log("Hello world")

// localStorage.clear();

let init = {
    data: [
        {
            sname: "Souvik Patra",
            address: "7/4, Shivaji Road",
            class: "12 E",
            image: "example_image.jpeg"
        },
        {
            sname: "Prince Kumar",
            address: "Naugachia, Bihar",
            class: "10 C",
            image: "example_image.jpeg"
        },
        {
            sname: "Animesh Choudhary",
            address: "Bhopal, MP",
            class: "9 A",
            image: "example_image.jpeg"
        },
        {
            sname: "Janit Lodha",
            address: "24, Chittorgarh, Rajasthan",
            class: "10 D",
            image: "example_image.jpeg"
    }]
};


if(localStorage.getItem("arrayStudents") == undefined){
    localStorage.setItem("arrayStudents", JSON.stringify(init))
}
console.log(localStorage.getItem("arrayStudents"));

const list = document.querySelector(".list");

const arrayStudents = JSON.parse(localStorage.getItem("arrayStudents")).data;

let idx = 0;

let handleEvent = function(e){
    console.log(e.id)
    const studentList = JSON.parse(localStorage.getItem("arrayStudents")).data;
    studentList.splice(e.id, 1);
    localStorage.setItem("arrayStudents",JSON.stringify({
        data: studentList,
    }))
    window.location.reload();
}

window.handleEvent = handleEvent;

const studentList = arrayStudents.map((student,index) => {
    return `
        <div class = "card">
            <img src = ${student.image} class = "profile-image"/>
            <div class = "content">
                Name: ${student.sname} <br> 
                Address: ${student.address} <br>
                Class: ${student.class}
            </div>
            <button id = ${index} class = "delete-button" onClick = "handleEvent(this)">Delete</button>
        </div>
        `;
}).join("");

list.innerHTML = studentList;

function debounce(func, ms){
    let timeout;
    return function (){
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
};

function filter(e){
    const studentList = JSON.parse(localStorage.getItem("arrayStudents")).data;
    const input = e.target.value.toLowerCase();
    const list = document.querySelector(".list");
    const filteredList = studentList.map((student, index) => {
        console.log(student);
        const show = student.sname.toLowerCase().includes(input) || student.address.toLowerCase().includes(input) || student.class.toLowerCase().includes(input);
        console.log(index, show);
        if(show)
            return `
            <div class = "card">
                <img src = ${student.image} class = "profile-image"/>
                <div class = "content">
                    Name: ${student.sname} <br> 
                    Address: ${student.address} <br>
                    Class: ${student.class}
                </div>
                <button id = ${index} class = "delete-button" onClick = "handleEvent(this)">Delete</button>
            </div>
            `;
        else{
            return "";
        }
    }).join("");
    list.innerHTML = filteredList;
    document.querySelector("#search").classList.remove("show-loader");
}

const searchInput = document.querySelector("#search");
let debouncedFilter = debounce(filter,1000);
searchInput.addEventListener("input",(e) => {
    document.querySelector("#search").classList.add("show-loader");    
    debouncedFilter(e);
})

console.log(arrayStudents);