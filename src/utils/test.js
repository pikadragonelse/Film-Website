const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
// const currentDate = currentDate.getDate();

// Tạo đối tượng Date cho ngày đầu tiên của tháng tiếp theo
const firstDayOfNextMonth = new Date(currentYear, currentMonth + 1, currentDate.getDate() + 1);
