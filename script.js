
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
const studentList = arrayStudents.map(student => {
    const newCard = document.createElement("div");
    newCard.setAttribute("class", "card");
    const profileImage = document.createElement("img");
    profileImage.setAttribute("src", student.image);
    profileImage.setAttribute("class", "profile-image");
    newCard.append(profileImage);
    const content = document.createElement("div");
    content.setAttribute("class", "content");
    content.innerHTML = `
        Name: ${student.sname} <br> 
        Address: ${student.address} <br>
        Class: ${student.class}
    `;
    newCard.append(content);
    const delButton = document.createElement("button");
    delButton.setAttribute("id", idx++);
    delButton.setAttribute("class", "delete-button");
    delButton.innerHTML = "Delete";
    delButton.addEventListener("click", function(event){
        event.preventDefault();
        console.log(event);
        const studentList = JSON.parse(localStorage.getItem("arrayStudents")).data;
        studentList.splice(event.target.id, 1);
        localStorage.setItem("arrayStudents",JSON.stringify({
            data: studentList,
        }))
        window.location.reload();
    })
    newCard.append(delButton);
    list.append(newCard);
    return {
        sname: student.sname,
        address: student.address,
        class: student.class,
        image: student.image,
        card: newCard
    }
});

function debounce(func, ms){
    let timeout;
    return function (){
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
};

function filter(e, studentList){
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
                <button id = ${index} class = "delete-button">Delete</button>
            </div>
            `
        else{
            return "";
        }
    }).join("");
    list.innerHTML = filteredList;
}

const searchInput = document.querySelector("#search");
let debouncedFilter = debounce(filter,1000);
searchInput.addEventListener("input",(e) => debouncedFilter(e, studentList))

console.log(arrayStudents);