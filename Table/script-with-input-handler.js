async function getDataFromRemoteURL (url) {

  const response = await fetch(url)

  const responseBody = await response.json()
  return responseBody
}

async function getPeople() {

  let peopleArray = []

  try {
    let nextResponse = null
    const response = await getDataFromRemoteURL(`https://swapi.co/api/people`)

    peopleArray = peopleArray.concat(response.results)
    
    while (peopleArray.length < response.count) {
      const nextUrl = nextResponse ? nextResponse.next : response.next
      if (nextUrl !== null) {
        nextResponse = await getDataFromRemoteURL(nextUrl)
        peopleArray = peopleArray.concat(nextResponse.results)
      }
    }
    return peopleArray
  } catch (error) {
    console.log(error)
  }
}

function insertIntoHTML (people) {

  let htmlString = ''

  for (let index = 0; index < people.length; index++) {
    const person = people[index];
    htmlString += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${person.name}</td>
        <td>${person.gender}</td>
        <td>${person.birth_year}</td>
      </tr>
    `
  }
  document.querySelector('tbody').insertAdjacentHTML('beforeend', htmlString)
}

function handleInputEmail (event) {

  const inputValue = event.target.value
  const trElement = document.querySelectorAll('tbody tr')
  for (let index = 0; index < trElement.length; index++) {
    const element = trElement[index];
    let displayRow = false

    const tdElement = element.querySelectorAll('td')
    for (let index = 0; index < tdElement.length; index++) {

      const element = tdElement[index].innerText;

      displayRow = displayRow || element.toLowerCase().includes(inputValue.toLowerCase())

    }
    trElement[index].classList.toggle('d-none', !displayRow)
  }
}

async function init() {

  const people = await getPeople()
  insertIntoHTML(people)

}

init()

document.getElementById('search-entry').addEventListener('input', handleInputEmail)
