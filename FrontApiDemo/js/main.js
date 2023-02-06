

let addButton = document.getElementById('add')
let updateButton = document.getElementById('update')

addButton.addEventListener('click' , addUser)


function fetchAPI() {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => fetchUsers(data))

    

}
fetchAPI()




function fetchUsers (data) {
    let elementUI = ``
    for (let i = 0 ; i < data.length ; i++) {
        elementUI += ` 
        <tr>
        <td>${data[i].name}</td>
        <td>${data[i].email}</td>
        <td>${data[i].password}</td>
        <td>
            <button onClick={deletedClick(${data[i].id})} class="btn btn-danger">Delete</button>
            <button onClick={updateUser(${data[i].id})} id="updateClick" class="btn btn-success">Update</button>
        </td>
    </tr>
        `
    }

    document.getElementById('tbody').innerHTML = elementUI
}



function deletedClick (id) {
    fetch("http://localhost:3000/deleteUser", {
method: "DELETE",
body: JSON.stringify({id}),
headers: {
    "Content-type": "application/json; charset=UTF-8"
}
})
.then(response => response.json())
.then(json => console.log(json));
fetchAPI()
}

function clearCache () {
    let productName = document.getElementById('productName')
    let productPrice = document.getElementById('productPrice')
    let productDesc = document.getElementById('productDesc')

    productName.value = ""
    productPrice.value = ""
    productDesc.value = ""
}


function addUser () {
    
    let productName = document.getElementById('productName').value
    let productPrice = document.getElementById('productPrice').value
    let productDesc = document.getElementById('productDesc').value
    

    let productObj = {
        name : productName,
        email : productPrice,
        password : productDesc
    }


    fetch("http://localhost:3000/addUser", {
        method: "POST",
        body: JSON.stringify(productObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })
        .then(response => response.json())
        .then(json => console.log(json));
        fetchAPI()
        clearCache()
}



function updateUser (id) {
    let add = document.getElementById('add')
    let update = document.getElementById('update')
    add.style.display = 'none'
    update.style.display = 'block'

    window.scrollTo({
        top: 0,
        behavior : "smooth"
    })
    console.log(id)
    updateButton.addEventListener('click', () => addUpdateUser(id) )

}


function addUpdateUser (id) {
    console.log(id)
    let updateName = document.getElementById('productName').value
    let updatePrice = document.getElementById('productPrice').value
    let updateDesc = document.getElementById('productDesc').value
    

    let productObj = {
        id : id,
        name : updateName,
        email : updatePrice,
        password : updateDesc
    }    

    fetch("http://localhost:3000/updateUser", {
        method: "PUT",
        body: JSON.stringify(productObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })
        .then(response => response.json())
        .then(json => console.log(json));
        fetchAPI()
        let add = document.getElementById('add')
        let update = document.getElementById('update')
        add.style.display = 'block'
        update.style.display = 'none'
        clearCache()
     
} 


