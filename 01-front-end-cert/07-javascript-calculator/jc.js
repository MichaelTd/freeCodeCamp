function updateDisplay(param){
  switch (param) {
    case "=": jsCalc.display.value = eval(jsCalc.display.value);
      break;
    case "C": jsCalc.display.value = "";
      break;
    case "+/-": jsCalc.display.value = eval(jsCalc.display.value) * -1;
      break;
    case "BS": jsCalc.display.value = jsCalc.display.value.substring(0, jsCalc.display.value.length - 1);
      break;
    default: jsCalc.display.value += param;
  }
}
