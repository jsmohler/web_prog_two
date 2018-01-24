export class lab3 {
  var
  testDefaultParameters = function (one, two = 100) {
    return {
      first: one,
      second: two,
    };
  }

  var
  testTemplateLiterals = function (firstName, middleName, lastName) {
    return `${firstName}, ${middleName}, ${lastName}`;
  }

  var
  testMultilineStrings = function () {
    return `   Rise like lions after slumber/
  in unvanquishable number/
  Shake your chains to Earth like dew/
  Which in sleep have fallen on you/
  Ye are many -- They are few.
  -Percy Shelley`
  }

  var
  testSortWithArrowFunction = function (arr) {
    arr.sort((a, b) => {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });
    return arr;
  }
}

