
function roleOfUser(roles) {
    let role = "";
    for (let temp of roles) {
        role += temp.name;
        if (roles.length > 1) {
            role += " ";
        }
    }
    return role;
}


async function navInfoAdmin() {
    const response = await fetch('http://localhost:8080/api/user')
    const authUser = await response.json()

    const infoUsername = document.getElementById("infoUsername")
    infoUsername.innerHTML = authUser.username

    const infoRoles = document.getElementById("infoRoles")
    infoRoles.innerHTML = authUser.roles.at(0).name
}


let res = navInfoAdmin()
console.log(res.catch() + ' - Данные о том кто зашел выведены')


const allUsersBody = document.getElementById('allUsersBody')
let result = ''
const url = 'http://localhost:8080/api/users'


const usersRows = (users) => {
    users.forEach(user => {
        result += `<tr id="row${user.id}">
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.age}</td>
                            <td>${roleOfUser(user.roles)}</td>
                            <td><a class="btnEdit btn btn-primary">Edit</a></td>
                            <td><a class="btnDelete btn btn-danger">Delete</a></td>
                       </tr>`
    })
    allUsersBody.innerHTML = result
}

async function getUsers() {
    try {
        const response = await fetch('http://localhost:8080/api/users')
        const users = await response.json()
        await usersRows(users)
    } catch (e) {
        console.error(e)
    }
}


res = getUsers()
console.log(res + ' - Таблица пользователей выведена')

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        //closest() позволяет перемещаться по DOM, пока мы не получим элемент, соответствующий заданному селектору.
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

const urlRoles = 'http://localhost:8080/api/roles'
const selectEdit = document.getElementById('editRoles')
const selectDelete = document.getElementById('deleteRoles')
const selectNew = document.getElementById('newRoles')


async function getEditRoles() {
    const responseRoles = await fetch(urlRoles)
    const allRoles = await responseRoles.json()
    for (let i = 0; i < allRoles.length; i++) {
        let text = allRoles[i].name.replace("ROLE_", "");
        // получаем значение для элемента, stringify() для преобразования объектов в JSON
        let json = JSON.stringify(allRoles[i])
        // создаем новый элемента, где text будет помещен между ><, а json в option
        selectEdit.options[i] = new Option(text, json)
    }
}


async function getDeleteRoles() {
    const responseRoles = await fetch(urlRoles)
    const allRoles = await responseRoles.json()
    for (let i = 0; i < allRoles.length; i++) {
        let text = allRoles[i].name.replace("ROLE_", "");
        // получаем значение для элемента, stringify() для преобразования объектов в JSON
        let json = JSON.stringify(allRoles[i])

        selectDelete.options[i] = new Option(text, json)
    }
}


async function getNewRoles() {
    const responseRoles = await fetch(urlRoles)
    const allRoles = await responseRoles.json()
    for (let i = 0; i < allRoles.length; i++) {
        let text = allRoles[i].name.replace("ROLE_", "");
        // получаем значение для элемента, stringify() для преобразования объектов в JSON
        let json = JSON.stringify(allRoles[i])

        selectNew.options[i] = new Option(text, json)
    }
}

const editUser = document.getElementById('editUser')
const modalEditBootstrap = new bootstrap.Modal(editUser)
const editId = document.getElementById('editId')
const editName = document.getElementById('editName')
const editAge = document.getElementById('editAge')
const editEmail = document.getElementById('editEmail')
const editPassword = document.getElementById('editPassword')

let idUser = 0
let idHACK = 0


on(document, 'click', '.btnEdit', async e => {
    const fila = e.target.parentNode.parentNode
    console.log(fila)
    idUser = fila.children[0].innerHTML
    idHACK = fila.children[0].innerHTML
    const nameForm = fila.children[1].innerHTML
    const ageForm = fila.children[3].innerHTML
    const emailForm = fila.children[4].innerHTML
    const passwordForm = fila.children[5].innerHTML
    editId.value = idUser
    editName.value = nameForm
    editAge.value = ageForm
    editEmail.value = emailForm
    editPassword.value = passwordForm
    res = getEditRoles()
    modalEditBootstrap.show()
})


editUser.addEventListener('submit', async e => {
    e.preventDefault()
    const options = selectEdit.selectedOptions
    const values = Array.from(options).map(({value}) => value)
    const roleListJSON = '[' + values + ']'
    //для преобразования JSON обратно в объект
    const roleList = JSON.parse(roleListJSON);
    const editUser = {}
    editUser.id = idUser
    editUser.name = editName.value
    editUser.age = editAge.value
    editUser.username = editEmail.value
    editUser.password = editPassword.value
    editUser.roles = roleList

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(editUser)
    })
    document.getElementById('row' + idUser).innerHTML = `<td>${editUser.id}</td>
                            <td>${editUser.name}</td>
                            <td>${editUser.age}</td>
                            <td>${editUser.email}</td>
                            <td>${roleOfUser(editUser.roles)}</td>
                            <td><a class="btnEdit btn btn-primary">Edit</a></td>
                            <td><a class="btnDelete btn btn-danger">Delete</a></td>`
    console.log(editUser)
    modalEditBootstrap.hide()
})

const deleteUser = document.getElementById('deleteUser')
const modalDeleteBootstrap = new bootstrap.Modal(deleteUser)
const deleteId = document.getElementById('deleteId')
const deleteName = document.getElementById('deleteName')
const deleteAge = document.getElementById('deleteAge')
const deleteEmail = document.getElementById('deleteEmail')
const deletePassword = document.getElementById('deletePassword')



on(document, 'click', '.btnDelete', e => {
    const fila = e.target.parentNode.parentNode
    idUser = fila.children[0].innerHTML
    const nameForm = fila.children[1].innerHTML
    const ageForm = fila.children[3].innerHTML
    const emailForm = fila.children[4].innerHTML
    const passwordForm = fila.children[5].innerHTML
    deleteId.value = idUser
    deleteName.value = nameForm
    deleteAge.value = ageForm
    deleteEmail.value = emailForm
    deletePassword.value = passwordForm
    res = getDeleteRoles()
    modalDeleteBootstrap.show()
})


deleteUser.addEventListener('submit', async e => {
    const fila = document.getElementById('row' + idUser)
    fila.parentElement.removeChild(fila)

    await fetch(url + "/" + idUser, {
        method: 'DELETE'
    })
})


const newUser = document.getElementById('newUser')
const newName = document.getElementById('newName')
const newAge = document.getElementById('newAge')
const newEmail = document.getElementById('newEmail')
const newPassword = document.getElementById('newPassword')

res = getNewRoles()



newUser.addEventListener('submit', async e => {
    e.preventDefault()
    const options = selectNew.selectedOptions
    const values = Array.from(options).map(({value}) => value)
    const roleListJSON = '[' + values + ']'
    const roleList = JSON.parse(roleListJSON)
    const newUser = {}
    newUser.name = newName.value
    newUser.age = newAge.value
    newUser.email = newEmail.value
    newUser.password = newPassword.value
    newUser.roles = roleList
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newUser)
    })

    let idTTT = await response.json()

    document.getElementById('allUsersBody').innerHTML += `<tr id="row${newUser.id}">
                            <td>${idTTT}</td>
                            <td>${newUser.name}</td>
                            <td>${newUser.age}</td>
                            <td>${newUser.email}</td>
                            <td>${roleOfUser(newUser.roles)}</td>
                            <td><a class="btnEdit btn btn-primary">Edit</a></td>
                            <td><a class="btnDelete btn btn-danger">Delete</a></td>
                       </tr>`



    document.getElementById('tab-1').className = 'tab-pane active'

    document.getElementById('newUser').className = 'tab-pane text-center'

})