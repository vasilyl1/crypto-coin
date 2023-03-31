

module.exports = function(date = new Date()){
    const year = date.getFullYear().toString();
    const month = (date.getMonth()+1).toString();
    const day  = date.getDate().toString();
  
    const monthChars = month.split('');
    const dayChars = day.split('');
  
    return year + '-' + (monthChars[1]?month:"0"+monthChars[0]) + '-' + (dayChars[1]?day:"0"+dayChars[0]);
}