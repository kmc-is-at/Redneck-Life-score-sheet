function updatePayAmount() {
  let pay = parseFloat(document.getElementById('pay-amount').value) || 0;
  let newPayAmountElement = document.getElementById('new-pay-amount');
  [...document.getElementById('child-list').querySelectorAll('input')].forEach(i => {
    if (i.value !== "") {
      pay -= 10;
    }
  })

  if (pay < 0) pay = 0;
  newPayAmountElement.innerHTML = `Your new Payday Amount is: <b>$${pay}</b>`;
}

function getListedChildren () {
  return [...document.querySelectorAll('#child-list input')].map(i=>i.value);
}

function addAnotherChildSpace () {
  let childList = document.getElementById('child-list');
  let newInput = document.createElement('input')
  let newLi = document.createElement('li');
  newLi.appendChild(newInput)
  childList.appendChild(newLi);
  newInput.oninput = () => {
    updatePayAmount();
    let children = JSON.stringify(getListedChildren());
    let storage = new PersistentStateRegistry();
    storage.set("listed-children", children, "session");
  }
  return newInput;
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

function resetGame() {
  let yes = window.confirm("You are about to lose your game history, are you sure you want to reset the game?");
  if (yes) {
    new PersistentStateRegistry().reset()
    window.location.reload();
  }
}