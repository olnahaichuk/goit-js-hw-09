'use strict'
const STORAGE_KEY = 'feedback-msg';


const formData = {
    email: "",
    message: "" ,
}

const form = document.querySelector(".feedback-form");
const textarea = document.querySelector('textarea');

form.addEventListener('input', () => {
    const formData = new FormData(form);
    const email = formData.get('email');
    const message = formData.get('message');
    formData.email = email.trim();
    formData.message= message.trim();
    saveToLS('email', email);
    saveToLS('message', message)
    
    saveToLS('feedback-form-state', formData);

    
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const message = formData.get('message');
    if (email && message) {
         formData.email = email.trim();
        formData.message = message.trim();
         console.log(formData);
    
    form.reset();
    localStorage.removeItem('email');
    localStorage.removeItem('message');
    localStorage.removeItem('formData');
    } else {
        alert ('Fill please all fields');
    }

});


function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return json;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLS('feedback-form-state');
  form.elements.email.value = data?.email || "";
  form.elements.message.value = data?.message || "";
});

