import { debouncedFilter } from "./search.js";
import { handleDelete } from "./deleteHandler.js";
import { init } from "./constants.js";

// localStorage.clear();

if(localStorage.getItem("arrayStudents") == undefined){
    localStorage.setItem("arrayStudents", JSON.stringify(init))
}
console.log(localStorage.getItem("arrayStudents"));

const list = document.querySelector(".list");

const arrayStudents = JSON.parse(localStorage.getItem("arrayStudents")).data;

window.handleDelete = handleDelete;

const studentList = arrayStudents.map((student,index) => {
    return `
        <div class = "card">
            <img src = ${student.image} class = "profile-image"/>
            <div class = "content">
                Name: ${student.sname} <br> 
                Address: ${student.address} <br>
                Class: ${student.class}
            </div>
            <button id = ${index} class = "delete-button" onClick = "handleDelete(this)">Delete</button>
        </div>
        `;
}).join("");

list.innerHTML = studentList;

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input",(e) => {
    document.querySelector("#search").classList.add("show-loader");    
    debouncedFilter(e);
})