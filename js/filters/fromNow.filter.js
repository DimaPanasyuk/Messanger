export default
['dateFilter', function(dateFilter) {
  return function(date) {
    let result = null;
    let currentDate = new Date();
    let dayStart = (new Date()).setHours(0, 0, 0, 0);
    let dayDifference = currentDate.getTime() - dayStart;
    let messageDifference = currentDate.getTime() - date;
    if (messageDifference > dayDifference) {
      result = dateFilter(date, 'dd.MM.yy');
    } else {
      result = dateFilter(date, 'HH:mm');
    }
    return result;
  };
}];
