const ele = document.querySelector("form");
ele.addEventListener("submit", function(e){
    e.preventDefault();
    const sname = document.querySelector("#sname").value;
    const address = document.querySelector("#address").value;
    const sclass = document.querySelector("#class").value;
    let arrayStudents = JSON.parse(localStorage.getItem("arrayStudents")).data;
    arrayStudents.push({
        sname: sname,
        address: address,
        class: sclass,
        image: "example_image.jpeg"
    });
    localStorage.setItem("arrayStudents",JSON.stringify({data: arrayStudents}))
    console.log(arrayStudents);
    window.location.href = "index.html";
})

const back = document.querySelector("#back").addEventListener("click", function(){
    window.location.href = "index.html";
})