const throttle = require('lodash.throttle');

const ref = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[type="email"]'),
  message: document.querySelector('textarea'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};

ref.form.addEventListener('input', throttle(onInputs, 500));
ref.form.addEventListener('submit', onButton);

reload();

function onInputs(e) {
  formData[e.target.name] = e.target.value;
  const saveFormdata = JSON.stringify(formData);
  localStorage.setItem(LOCALSTORAGE_KEY, saveFormdata);
}

function onButton(e) {
    e.preventDefault();
    e.target.reset();
    const result = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
    console.log(result)
    localStorage.removeItem(LOCALSTORAGE_KEY);
}

function reload() {
  const savedMessageJSON = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedMessageJSON) {
    const savedMessage = JSON.parse(savedMessageJSON);

    ref.email.value = savedMessage.email;
    ref.message.value = savedMessage.message;
  }
}
