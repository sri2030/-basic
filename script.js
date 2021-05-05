const url =
  'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'

$(document).ready(function () {
  $.get(url, (response) => {
    response.forEach((item) => {
      addRows(item)
    })
  })
  $('#search-box').on('keyup', (e) => {
    e.preventDefault()
    let filter = e.target.value.toUpperCase()
    let rows = document.querySelector('#table-data table tbody').rows
    for (const row of rows) {
      row.classList.remove('match')
      let firstNameCol = row.cells[1].textContent.toUpperCase()
      row.cells[1].classList?.remove('filter')
      if (firstNameCol.includes(filter)) {
        row.style.display = ''
        row.classList.add('match')
        firstNameCol.includes(filter)
          ? row.cells[1].classList.add('filter')
          : (row.cells[1].className = '')
      } else {
        row.style.display = 'none'
        row.classList.remove('match')
      }
    }
    highlight(filter)
  })
})
const addRows = (data) => {
  let dataRow = document.querySelector('#table-data table').insertRow()
  dataRow.className = 'data-row'
  let id = dataRow.insertCell()
  id.className = 'column1'
  id.innerHTML = data.id
  let firstName = dataRow.insertCell()
  firstName.className = 'column2'
  firstName.innerHTML = data.firstName
  let lastName = dataRow.insertCell()
  lastName.className = 'column3'
  lastName.innerHTML = data.lastName
  let email = dataRow.insertCell()
  email.className = 'column4'
  email.innerHTML = data.email
  let phone = dataRow.insertCell()
  phone.className = 'column5'
  phone.innerHTML = data.phone

  $(dataRow).click((e) => {
    $('.data-row').removeClass('active')
    e.currentTarget.classList.add('active')
    renderDetails(data)
  })
}

const renderDetails = ({ firstName, lastName, description, address }) => {
  $('#info-content').css('display', 'block')
  $('#info-content div:first-child ').html(
    `<b>User selected:</b> ${firstName} ${lastName}`,
  )
  $('#info-content div:nth-child(2) textarea').html(description)
  $('#info-content div:nth-child(3)').html(
    `<b>Address:</b> ${address.streetAddress}`,
  )
  $('#info-content div:nth-child(4)').html(`<b>City:</b> ${address.city}`)
  $('#info-content div:nth-child(5)').html(`<b>State:</b> ${address.state}`)
  $('#info-content div:last-child').html(`<b>Zip:</b> ${address.zip}`)
}
const highlight = (string) => {
  $('#table-data')
    .find('table tbody tr.match td.filter')
    .each(function () {
      let matchStartIndex = $(this)
        .text()
        .toLowerCase()
        .indexOf('' + string.toLowerCase() + '')
      let matchEndIndex = matchStartIndex + string.length - 1

      let beforeMatch = $(this).text().slice(0, matchStartIndex)
      let matchText = $(this)
        .text()
        .slice(matchStartIndex, matchEndIndex + 1)
      let afterMatch = $(this)
        .text()
        .slice(matchEndIndex + 1)

      $(this).html(`${beforeMatch}<b>${matchText}</b>${afterMatch}`)
    })
}
