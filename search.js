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

let debouncedFilter = debounce(filter,1000);

export {debouncedFilter};