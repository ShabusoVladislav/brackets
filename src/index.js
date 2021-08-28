module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let brackets = {};  //Объект с парами скобок

  let sameBracketsArr = [];
  function getSameBrackets (arr) {
    for (let key in brackets) {
      if (key === brackets[key]) {
        arr.push(key);
      }
    }
    return arr;
  }

  for (let i = 0; i < bracketsConfig.length; i++) {
    let key = bracketsConfig[i][0];
    brackets[key] = bracketsConfig[i][1];
  }

  for (let i = 0; i < str.length; i++) {
    if (Object.keys(brackets).includes(str[i])) {
      stack.push(str[i]);
    } else {
      if (stack.length === 0) {
        return false;
      }
  
      let topElement = stack[stack.length-1];
      function openBracket(value) {
        for (let key in brackets) {   //поиск открывающей скобки к текущей закрывающей
          if (brackets[key] === value) {
            return key;
          }
        }
        return null;
      }
      
      if (topElement === openBracket(str[i])) {
        stack.pop();
      } else {
        return false;
      }
    }
    if (stack[stack.length-2] === stack[stack.length-1] && getSameBrackets(sameBracketsArr).includes(stack[stack.length-1])) {
      stack.pop();
      stack.pop();
  }
  }
  return stack.length === 0;
}
