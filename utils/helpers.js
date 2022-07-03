module.exports = {
  format_date: (date) => {
    console.log('date: ', date);
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  counter: (index) => {
    return index + 1;
}
};