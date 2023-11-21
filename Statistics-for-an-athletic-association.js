/*
You are the "computer expert" of a local Athletic Association (C.A.A.). 
Many teams of runners come to compete. 
Each time you get a string of all race results of every team who has run. 
For example here is a string showing the individual results of a team of 5 runners:

  "01|15|59, 1|47|6, 01|17|20, 1|32|34, 2|3|17"

Each part of the string is of the form: h|m|s where h, m, s (h for hour, m for minutes, s for seconds) 
are positive or null integer (represented as strings) with one or two digits. 
Substrings in the input string are separated by , or ,.

To compare the results of the teams you are asked for giving three statistics; range, average and median.

    Range : difference between the lowest and highest values. In {4, 6, 9, 3, 7} the lowest value is 3, 
    and the highest is 9, so the range is 9 − 3 = 6.

    Mean or Average : To calculate mean, add together all of the numbers and then divide the sum by the 
    total count of numbers.

    Median : In statistics, the median is the number separating the higher half of a data sample from 
    the lower half. The median of a finite list of numbers can be found by arranging all the observations 
    from lowest value to highest value and picking the middle one.

Your task is to return a string giving these 3 values. 
For the example given above, the string result will be:
  "Range: 00|47|18 Average: 01|35|15 Median: 01|32|34"
  Format looks like this: "Range: hh|mm|ss Average: hh|mm|ss Median: hh|mm|ss"`

where hh, mm, ss are integers (represented by strings) with each 2 digits.

Remarks:
  if a result in seconds is ab.xy... it will be given truncated as ab.
  if the given string is "" you will return ""
*/


// Solution

function stat(strg) {
  if (!strg) return '';
  let array = strg.split(', ');
  let timeInSeconds = array.map(element => {
    let subArr = element.split("|");
    let hour = parseInt(subArr[0]);
    let min = parseInt(subArr[1]);
    let sec = parseInt(subArr[2]);
    let result = (hour * 3600) + (min * 60) + sec;
    return result;
  });
  timeInSeconds.sort((a, b) => a - b);
  let range = timeInSeconds[timeInSeconds.length - 1] - timeInSeconds[0];
  let average = Math.floor(timeInSeconds.reduce((acc, ele) => acc + ele, 0) / timeInSeconds.length);
  let median;
  if (timeInSeconds.length % 2 !== 0) {
    median = timeInSeconds[Math.floor(timeInSeconds.length / 2)];
  } else {
    median = Math.floor((timeInSeconds[(timeInSeconds.length / 2) - 1] + timeInSeconds[timeInSeconds.length / 2]) / 2);
  }
  return `Range: ${convert(range)} Average: ${convert(average)} Median: ${convert(median)}`;
}

function convert(seconds) {
  let remainder = seconds % 3600;
  let hour = Math.floor(seconds / 3600);
  let min = Math.floor(remainder / 60);
  remainder = remainder % 60;
  let sec = remainder;
  hour = hour.toString().length === 1 ? "0" + hour : hour;
  min = min.toString().length === 1 ? "0" + min : min;
  sec = sec.toString().length === 1 ? "0" + sec : sec;
  return `${hour}|${min}|${sec}`
}