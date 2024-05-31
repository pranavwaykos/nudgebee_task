function uncompress(s) {
  let stack = [];
  let currentNum = 0;
  let currentStr = "";

  for (let char of s) {
    if (char === "(") {
      stack.push(currentStr);
      stack.push(currentNum);
      currentStr = "";
      currentNum = 0;
    } else if (char === ")") {
      let num = stack.pop();
      let prevStr = stack.pop();
      currentStr = prevStr + currentStr.repeat(num);
    } else if (char >= "0" && char <= "9") {
      currentNum = currentNum * 10 + parseInt(char);
    } else {
      currentStr += char;
    }
  }

  return currentStr;
}

console.log(uncompress("3(ab)"));
console.log(uncompress("3(ab2(c))"));
