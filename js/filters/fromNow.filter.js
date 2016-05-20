export default
['dateFilter', function(dateFilter) {
  
  return function(date) {
    
    var result = null,
        current_date = new Date(),
        day_start    = (new Date()).setHours(0, 0, 0, 0);
    
    var dayDifference = current_date.getTime() - day_start;
    var messageDifference = current_date.getTime() - date;
    
    console.debug(dayDifference);
    if (messageDifference > dayDifference) {
      
      console.debug(true);
      result = dateFilter(date, 'dd.MM.yy');
    } else {
      
      console.debug(false);
      result = dateFilter(date, 'HH:mm:ss');
    }
    return result;
  }
}]