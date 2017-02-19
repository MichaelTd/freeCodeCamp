function updateDisplay(param){
  switch (param) {
    case "=": jsCalc.display.value = eval(jsCalc.display.value);
      break;
    case "CL": jsCalc.display.value = "";
      break;
    default: jsCalc.display.value += param;
  }
}
