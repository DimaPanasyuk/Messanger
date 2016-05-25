export default
['dateFilter', function(dateFilter) {
  
  return function(date) {
    
    var result = null,
        current_date = new Date(),
        day_start    = (new Date()).setHours(0, 0, 0, 0);
    
    var dayDifference = current_date.getTime() - day_start;
    var messageDifference = current_date.getTime() - date;
    
    if (messageDifference > dayDifference) {
      
      result = dateFilter(date, 'dd.MM.yy');
    } else {
      
      result = dateFilter(date, 'HH:mm');
    }
    return result;
  }
}]