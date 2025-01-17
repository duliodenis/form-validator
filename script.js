const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// show input error message
const showError = (input, message) => {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = message
}

const showSuccess = input => {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

const checkEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //return re.test(String(email).toLowerCase())
  if (re.test(input.value.trim())) showSuccess(input)
  else showError(input, 'Email is not valid')
}

const getInputFieldName = input => {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

const checkRequired = inputArray => {
  inputArray.forEach(input => {
    if (input.value.trim() === '') 
      showError(input, `${getInputFieldName(input.id)} is required`)
    else showSuccess(input)
  })
}

const checkLength = (input, min, max) => {
  if (input.value.length < min) showError(input, `${getInputFieldName(input.id)} must be at least ${min} characters`)
  else if (input.value.length > max) showError(input, `${getInputFieldName(input.id)} must be less than ${max} characters`)
  else showSuccess(input)
}

const checkPasswordsMatch = (input1, input2) => {
  if (input1.value === input2.value) showSuccess(password2)
  else showError(password2, `Passwords must match`)
}

// Event Listeners
form.addEventListener('submit', e => {
  e.preventDefault()
  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 25)
  checkEmail(email)
  checkPasswordsMatch(password, password2)
})
