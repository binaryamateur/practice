
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
        sname: student.sname.toLowerCase(),
        address: student.address.toLowerCase(),
        class: student.class.toLowerCase(),
        card: newCard
    }
});


const searchInput = document.querySelector("#search");
searchInput.addEventListener("input",function(e){
    // console.log(e.target.value);
    console.log(studentList);
    const input = e.target.value.toLowerCase();
    studentList.forEach(student => {
        const show = student.sname.includes(input) || student.address.includes(input) || student.class.includes(input);
        if(!show){
            if(!student.card.classList.contains("hide")){
                student.card.classList.add("hide");
            }
        }
        else{
            if(student.card.classList.contains("hide")){
                student.card.classList.remove("hide");
            }
        }

    });
})


console.log(arrayStudents);