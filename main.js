// Sayfa yapısı
const registerTab = document.getElementById('register')
const candidatesTab = document.getElementById('candidates')
const changeTabBtn = document.querySelector('#changeTab')

let showList = 1
const changeTab = function () {
  showList = !showList
  if (showList == 0) {
    registerTab.style.display = 'none'
    candidatesTab.style.display = 'block'
  } else {
    registerTab.style.display = 'block'
    candidatesTab.style.display = 'none'
  }
}

// REGISTER FUNCTIONS
const addForm = document.getElementById('addForm')

const emailTxt = document.getElementById('applyEmail')
const fullnameTxt = document.getElementById('applyFullname')
const phoneTxt = document.getElementById('applyPhone')
const birthdayTxt = document.getElementById('applyBirthday')

let campApps
function initialApp() {
  campApps = getApps() ?? []
}
initialApp()
function getApps() {
  return JSON.parse(localStorage.getItem('campapps'))
}
function setApps(array) {
  localStorage.setItem('campapps', JSON.stringify(array))
}

addForm.addEventListener('submit', (e) => submitForm(e))

const submitForm = (event) => {
  event.preventDefault()
  if (
    emailTxt.value == '' ||
    fullnameTxt.value == '' ||
    phoneTxt.value == '' ||
    birthdayTxt.value == ''
  ) {
    alert('Lütfen bilgilerinizi giriniz.')
  } else {
    campApps.push(
      new NewApply(emailTxt.value, fullnameTxt.value, phoneTxt.value, birthdayTxt.value)
    )
    setApps(campApps)
    addForm.reset()
    renderList()
    alert('Başvurunuz iletildi.')
    console.table(getApps())
  }
}

class NewApply {
  constructor(email, fullname, phonenumber, birthday) {
    this.email = email
    this.fullname = fullname
    this.phonenumber = phonenumber
    this.birthday = moment(birthday, 'YYYY-MM-DD').format('DD/MM/YYYY')
    this.createdDate = moment().format('DD/MM/YYYY HH:MM')
  }
}

// GET / DELETE / ACCEPT FUNCTIONS
const tbodyList = document
  .getElementById('candidatesList')
  .getElementsByTagName('tbody')[0]

const renderList = function () {
  initialApp()
  tbodyList.innerHTML = ''
  for (let index = campApps.length - 1; index >= 0; index--) {
    let element = campApps[index]
    let rowTemplate = `
        <tr>
            <td>${index + 1}</td>
            <td>${element.fullname}</td>
            <td>${element.email}</td>
            <td>${element.phonenumber}</td>
            <td>${element.birthday}</td>
            <td>${element.createdDate}</td>
            <td><button class="btn btn-danger btn-sm" onclick="rejectBtn('${
              element.email
            }')">Reddet</button></td>
            <td><button class="btn btn-success btn-sm" id="acceptBtn" >Kabul Et</button></td>
        </tr>
        `
    tbodyList.innerHTML += rowTemplate
  }
}
renderList()

function rejectBtn(email) {
  let newApps = campApps.filter((a) => a.email != email)
  setApps(newApps)
  renderList()
  console.table(getApps())
}

const acceptBtn = document.getElementById('acceptBtn')
