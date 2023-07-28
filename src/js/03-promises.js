import Notiflix from 'notiflix';

const refs = {
  submitForm: document.querySelector('.form'),
}

console.dir(refs.submitForm);

refs.submitForm.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();

  const { delay, step, amount } = evt.currentTarget.elements;
  const inputs = {
    delay: delay.value,
    step: step.value,
    amount: amount.value,
  }

  let delayValue = Number(inputs.delay);
  let stepValue = Number(inputs.step);
  let amountValue = Number(inputs.amount);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });
}