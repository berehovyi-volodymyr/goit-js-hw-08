const throttle = require('lodash.throttle');

const ref = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[type="email"]'),
  message: document.querySelector('textarea'),
};

const LOCALSTORAGE_KEY = 'feedback-form-state';

ref.form.addEventListener('input', throttle(onInputs, 500));
ref.form.addEventListener('submit', onButton);

reload();

function onInputs() {
  const email = ref.form.elements.email.value;
  const message = ref.form.elements.message.value;

  const saveFormdata = JSON.stringify({ email, message });
  localStorage.setItem(LOCALSTORAGE_KEY, saveFormdata);
}

function onButton(e) {
  e.preventDefault();
  const formData = e.target.elements;
  const email = formData.email.value;
  const message = formData.message.value;

  if (email.trim() !== '' && message.trim() !== '') {
    console.log({ email, message })
    e.target.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }
  else {
     alert("Усі поля повинні бути заповненні")
  }
}

function reload() {
  const savedMessageJSON = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedMessageJSON) {
    const savedMessage = JSON.parse(savedMessageJSON);
    ref.email.value = savedMessage.email || '';
    ref.message.value = savedMessage.message || '';
  }
}
