let handleDelete = function(e){
    console.log(e.id)
    const studentList = JSON.parse(localStorage.getItem("arrayStudents")).data;
    studentList.splice(e.id, 1);
    localStorage.setItem("arrayStudents",JSON.stringify({
        data: studentList,
    }))
    window.location.reload();
}

export {handleDelete};