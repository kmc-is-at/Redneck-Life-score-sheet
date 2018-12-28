function updatePayAmount(elem) {
  let pay = parseFloat(document.getElementById('pay-amount').value) || 0;
  let newPayAmountElement = document.getElementById('new-pay-amount');
  [...document.getElementById('child-list').querySelectorAll('input')].forEach(i => {
    if (i.value !== "") {
      pay -= 10;
    }
  })
  newPayAmountElement.innerHTML = "Your new Payday Amount is: $" + pay;
}

function addAnotherChildSpace () {
  let childList = document.getElementById('child-list');
  let newInput = document.createElement('input')
  let newLi = document.createElement('li');
  newLi.appendChild(newInput)
  childList.appendChild(newLi);
  newInput.oninput = () => {
    updatePayAmount(newInput);
  }
}

function updateInsuranceBill (elem) {
  let bill = document.getElementById('insurance-bill');
  let value = parseFloat(bill.innerHTML) || 0;
  if (elem.checked) {
    value +=100;
  } else {
    value -=100;
  }
  bill.innerHTML = value;
}

function toggleTooth (tooth) {
  if (tooth.src === "https://img.icons8.com/ios/50/000000/tooth.png") {
    tooth.src = "https://img.icons8.com/ios/50/000000/tooth-filled.png";
  } else {
    tooth.src = "https://img.icons8.com/ios/50/000000/tooth.png";
  }
  updateRemainingTeeth()
}

function updateRemainingTeeth () {
  let elem = document.getElementById('teeth-remaining');
  let teeth = 28;
  [...document.querySelectorAll('.tooth')].forEach(tooth => {
    if (tooth.src === "https://img.icons8.com/ios/50/000000/tooth-filled.png") {
      teeth -= 1
    }
  });
  elem.innerHTML = teeth;
  let storage = new PersistentStateRegistry();
  storage.set("lost-tooth-count", 28 - teeth, "session");
}