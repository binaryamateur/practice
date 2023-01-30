const ele = document.querySelector("form")
ele.addEventListener("submit", function(e){
    e.preventDefault();
    const sname = e.target.elements.sname.value;
    const address = e.target.elements.address.value;
    const sclass = e.target.elements.class.value;
    // console.log(localStorage);  
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