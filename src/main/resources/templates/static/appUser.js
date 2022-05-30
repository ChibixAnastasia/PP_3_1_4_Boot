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



    const test = document.getElementById("test")
    let abc = '<form action="/admin" method="GET">\n' +
        '       <button class="btn btn-link btn-lg btn-block" style="text-align: left" type="submit">Admin</button>\n' +
        '                </form>'
    if (infoRoles.innerText === 'ROLE_ADMIN')
    test.insertAdjacentHTML('afterbegin', abc)
}


let res = navInfoAdmin()
console.log(res.catch() + ' - Данные о том кто зашел выведены')

const bodyUser = document.getElementById("bodyUser")
let resultUser = ''

async function userInfo() {
    const response = await fetch('http://localhost:8080/api/user')
    const authUser = await response.json()
    resultUser = `<tr>
                            <td>${authUser.id}</td>
                            <td>${authUser.name}</td>
                            <td>${authUser.age}</td>
                            <td>${authUser.email}</td>
                            <td>${roleOfUser(authUser.roles)}</td>
                       </tr>`
    bodyUser.innerHTML = resultUser
}

res = userInfo()
console.log(res.catch() )