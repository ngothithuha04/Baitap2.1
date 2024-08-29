/*khởi tạo các biến sử dụng phương thức document.querySelector để chọn các phần tử html tương ứng dựa trên các lớp css của chúng*/
const hourTime = document.querySelector(".hour_time");
const dateElement = document.querySelector(".date");
const tbody = document.querySelector(".tbody");
const month_year = document.querySelector(".month_year");
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const ampm = document.querySelector(".ampm");
const table = document.querySelector(".div_table");
const table1 = document.querySelector(".div_table1");
const table2 = document.querySelector(".div_table2");
const year2 = document.querySelector(".month_year2");
const btn12 = document.querySelector(".btn12");
const btn23 = document.querySelector(".btn23");
const tbody2 = document.querySelector(".tbody2");
const year1 = document.querySelector(".month_year1");
const btn11 = document.querySelector(".btn11");
const btn22 = document.querySelector(".btn22");
const tbody1 = document.querySelector(".tbody1");
const date_year = document.querySelector(".date");
/* khởi tạo mảng chứa các tháng*/
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
/*mảng chứa tên viết tắt của các tháng chỉ lấy 3 kí tự đầu*/
const abbreviatedMonthNames = monthNames.map((month) => month.slice(0, 3));
/*Mảng chứa các ngày sử dụng định dạng số thứ tự để hiển thị*/
const daysOfMonth = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "15th",
  "16th",
  "17th",
  "18th",
  "19th",
  "20th",
  "21st",
  "22nd",
  "23rd",
  "24th",
  "25th",
  "26th",
  "27th",
  "28th",
  "29th",
  "30th",
  "31st",
];
/* cập nhật ngày giờ hiện tại lên trang web*/
function updateDateTime() {
  let now = new Date();/* tạo 1 đối tượng data mới chứa thời gian hiện tại*/
  let hours = now.getHours();/*Lấy giờ hiện tại*/
  let minutes = now.getMinutes();/* lấy phút hiện tại*/
  let seconds = now.getSeconds();/* lấy giây hiện tại*/
  ampm.innerHTML = `${hours >= 12 ? "PM" : "AM"}`;/* cập nhật phần nội dung AM PM*/
 hourTime.innerHTML = `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`;/* đảm bảo phút luôn hiển thị dưới dạng 2 chữ số*/
}

updateDateTime();/* hiển thị thời gian ngay lập tức khi trang được tải*/

setInterval(updateDateTime, 1000);
/* cập nhật hiển thị ngày tháng hiện tại trên web*/
function updateDate() {
  let now = new Date();
  let month = now.getMonth();
  let day = now.getDate();
  let year = now.getFullYear();
/* hiển thị ngày tháng năm */
  dateElement.innerHTML = `${daysOfMonth[day - 1]}, ${
    monthNames[month]
  }, ${year}`;
}

updateDate();
const now = new Date();
let month = now.getMonth();
let year = now.getFullYear();
/* cập nhật nội dung HTML vào phần tử month_year để hiển thị tháng và năm hiện tại*/
month_year.innerHTML = ` ${monthNames[month]}, ${year}`;
/* tạo lịch cho tháng năm được chỉ định*/
function renderCalendar(month, year) {
 /* xóa nội dung hiện có trong bảng  chuẩn bị cho hiển thị lịch mới*/
  tbody.innerHTML = "";
/* tính toán ngày đầu tiên của tháng*/
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();/* xác định số ngày trong thngs hiện tại*/
  const prevMonthDays = new Date(year, month, 0).getDate();/* xác định số ngày trong tháng trước đó*/
/* xóa bỏ tất cả đường viền từ ô lịch <th>*/
  const clearBorders = () => {
    const allCells = document.querySelectorAll("th");
    allCells.forEach((cell) => cell.classList.remove("border"));
  };
/* khởi tạo 1 hàng mới*/
  let row = document.createElement("tr");
  for (let i = firstDay; i > 0; i--) {
    /* tạo ô <th> cho mỗi ngày của tháng trước*/
    let cell = document.createElement("th");
    /*phân biệt ngày tháng trước với ngày trong tháng hiện tại*/
    cell.classList.add("day__cancel");
    cell.innerText = prevMonthDays - i + 1;/* ngày của tháng trước*/
    row.appendChild(cell);
    /* khi nhấp vào các khác sẽ bị loại ỏ lớp boder và ô được chọn sẽ hiển thị lớp boder làm nổi bật*/
    cell.onclick = () => {
      clearBorders();
      cell.classList.add("border");
    };
  }/*ngày trong tháng*/
  for (let day = 1; day <= daysInMonth; day++) {
    if (row.children.length === 7) {
        /* thêm hàng vào bảng*/
      tbody.appendChild(row);
      /*tạo 1 hàng mới cho các ngày tiếp theo*/
      row = document.createElement("tr");
    }
    let cell = document.createElement("th");/* tạo 1 ô mới cho hàng*/
    /* khi người dùng nhấp vào ô tất cả các ô khác mất thuộc tinh boder và ô đc nhấp sẽ có boder*/
    cell.onclick = () => {
      clearBorders();
      cell.classList.add("border");
    };
    /* kiểm tra ngày hiện tại có phải ngày hôm nay không nếu đúng thêm lớp day_now vào ô*/
    if (
      day === now.getDate() &&
      month === now.getMonth() &&
      year === now.getFullYear()
    ) {
      cell.classList.add("day__now");
    }
    cell.innerText = day;/*gán ngày cho ô*/
    row.appendChild(cell);/* thêm ô vào hàng*/
  }
  let nextMonthDay = 1;
  while (row.children.length < 7) {
    let cell = document.createElement("th");/* tạo ô mới cho ngày của tháng tiếp theo*/
    cell.classList.add("day__cancel");/* định dạng ô có kiểu khác*/
   /* nội dung ô có ngày hiện tại và tăng giá trị monthday lên*/
    cell.innerText = nextMonthDay++;
    /* khi nhấp vào lớp boder sẽ biến mất ở tất cả các ô và chỉ còn ở ô hiện tại*/
    cell.onclick = () => {
      clearBorders();
      cell.classList.add("border");
    };
    row.appendChild(cell);
  }
  /* sau khi hàng đã đầy hàng sẽ được thêm vào tbody*/
  tbody.appendChild(row);
/* vòng lặp này đảm bảo có ít nhất 6 hàng trong tbody*/
  while (tbody.children.length < 6) {
    let row = document.createElement("tr");/* tạo hàng mới*/
    for (let i = 0; i < 7; i++) {
      let cell = document.createElement("th");
      cell.classList.add("day__cancel");
      cell.innerText = nextMonthDay++;/* thiết lập nội dung ô và tăng giá trị cho monthday*/
      row.appendChild(cell);/*thêm ô vào hàng*/
      /*sự kiện nhấp chuột vào ô*/
      cell.onclick = () => {
        clearBorders();
        cell.classList.add("border");
      };
    }
    tbody.appendChild(row);
  }
}

function click1() {
    /*kiểm tra nếu tháng hiện tại là tháng 1 thì giảm year để chuyển về năm trước*/
  if (month === 0) {
    year--;
    month = 11;
  } else {
    month--;
  }
  /* cập nhật lịch theo tháng năm vừa thay đổi*/
  renderCalendar(month, year);
  /* cập nhật nội dung phần tử*/
 month_year.innerHTML = ` ${monthNames[month]}, ${year}`;
}


function click2() {
  if (month === 11) {
    year++;
    month = 0;
  } else {
    month++;
  }
  renderCalendar(month, year);
 month_year.innerHTML = ` ${monthNames[month]}, ${year}`;
}

btn2.addEventListener("click", click2);
btn1.addEventListener("click", click1);

renderCalendar(month, year);

// bảng tháng và năm
year1.innerHTML = ` ${year}`;
function renderCalendar1(nextYear) {
  var element = document.querySelector(".month_year1");/* lấy phần tử HTML có class là month_year1*/
  var value = element.textContent;
  tbody1.innerHTML = "";/* xóa nội dung để chuẩn bị cho việc tạo bảng mới*/
  let row;
  for (let i = 0; i < abbreviatedMonthNames.length; i++) {
    /*mỗi lần vòng lặp đi qua 4 tháng tạo 1 dòng mới để sắp xếp 4 ô 1 dòng*/
    if (i % 4 === 0) {
      row = document.createElement("tr");
      tbody1.appendChild(row);
    }
    let cell = document.createElement("th");
    /* kiểm tra xem có phải tháng và năm hiện tại không nếu phải thì thêm lớp month_now*/
    if (
      i=== new Date().getMonth() &&
      nextYear == new Date().getFullYear()
    ) {
      cell.classList.add("month__now");
    }
    cell.innerText = abbreviatedMonthNames[i];
    cell.onclick = function () {
      renderCalendar(i, nextYear);
      // table1.style.display = "none";
      table1.classList.remove("animation_scale-1");
      table1.classList.add("animation_scale-0");
      setTimeout(() => {
        table.style.display = "";
        table.classList.remove("animation_scale-0");
        table.classList.add("animation_scale-1");
        table1.style.display = "none";
      }, 300);
      table2.style.display = "none";
      /* cập nhật và hiển thị năm và tháng đã được chọn*/
      year1.innerHTML = ` ${nextYear}`;
      month_year.innerHTML = ` ${monthNames[i]}, ${nextYear}`;
    };
    row.appendChild(cell);
  }
  /* tạo 1 tr mới trong bảng .và mỗi hàng có 4 tháng*/
  row = document.createElement("tr");
  for (let i = 0; i < 4; i++) {
    tbody1.appendChild(row);
    /* tạo 1 ô mới trong bảng HTML để chứa tên viết tắt của tháng*/
    let cell = document.createElement("th");
    cell.innerText = abbreviatedMonthNames[i];
    cell.classList.add("month__cancel");
    cell.onclick = function () {
      renderCalendar(i, nextYear);
      table1.classList.remove("animation_scale-1");/* xóa lớp khỏi table1*/
      table1.classList.add("animation_scale-0");/* thêm lớp vào để kích hoạt hiệu ứng ẩn bảng*/
      setTimeout(() => {
        table.style.display = "";
        table.classList.remove("animation_scale-0");
        table.classList.add("animation_scale-1");
        table1.style.display = "none";
      }, 300);/*thời gian ẩn bảng*/
      table2.style.display = "none";/*ẩn bảng để hiển thị bảng năm*/
      /*cập nhật tháng và năm hiện tại được chọn*/
      year1.innerHTML = ` ${nextYear}`;
      month_year.innerHTML = ` ${monthNames[i]}, ${nextYear}`;
    };
    row.appendChild(cell);
  }
}
renderCalendar1(year);
function click11() {
  var element = document.querySelector(".month_year1");
  var value = element.textContent;
  value--;
  console.log(value);
  renderCalendar1(value);
  year1.innerHTML = ` ${value}`;
}
function click22(value) {
  var element = document.querySelector(".month_year1");
  var value = element.textContent;
  value++;
  console.log(value);
  renderCalendar1(value);
  /* cập nhật nội dung để iển thị năm mới*/
  year1.innerHTML = ` ${value}`;
}
btn11.addEventListener("click", click11);
btn22.addEventListener("click", click22);

// các năm
const date = new Date();
const yearss = date.getFullYear().toString();/*năm hiện tại và chuyển thành chuỗi*/
let years = yearss - yearss.charAt(3);
/* cập nhật nội dung của year2 cho 1 chuỗi 10 năm*/
year2.innerHTML = ` ${years} - ${years + 9}`;

function renderCalendar2() {
  tbody2.innerHTML = "";
  let row = document.createElement("tr");
  for (let i = years; i < years + 10; i++) {
    if (row.children.length % 4 === 0) {
      row = document.createElement("tr");
      tbody2.appendChild(row);
    }
    let cell = document.createElement("th");

    if (i === new Date().getFullYear()) {
      cell.classList.add("year__now");
    }
    cell.innerText = i;
    let nextYear = i;
    cell.onclick = function () {
      renderCalendar1(nextYear);
      table2.classList.remove("animation_scale-1");
      table2.classList.add("animation_scale-0");
      setTimeout(() => {
        table1.style.display = "";/* hiển thị bảng tháng*/
        table1.classList.remove("animation_scale-0");
        table1.classList.add("animation_scale-1");
        table2.style.display = "none";/* ẩn bảng năm*/
      }, 300);
      table.style.display = "none";/* ẩn bảng ngày*/
      /* cập nhật nội dung year1 với năm đã chọn*/
      year1.innerHTML = ` ${nextYear}`;
    };
    row.appendChild(cell);
  }

  for (let i = years + 11; i < years + 17; i++) {
    tbody2.appendChild(row);/* thêm hàng hiện tại vào tbody2*/
    if (row.children.length === 4) {
      row = document.createElement("tr");
      tbody2.appendChild(row);
    }

    let cell = document.createElement("th");
    cell.innerText = i;
    let nextYear = i;
    cell.classList.add("month__cancel");
    cell.onclick = function () {
        /* cập nhật lịch cho năm được chọn*/
      renderCalendar1(nextYear);
      table2.classList.remove("animation_scale-1");
      table2.classList.add("animation_scale-0");
      setTimeout(() => {
        table1.style.display = "";
        table1.classList.remove("animation_scale-0");
        table1.classList.add("animation_scale-1");
        table2.style.display = "none";
      }, 300);
      table.style.display = "none";
      year1.innerHTML = ` ${nextYear}`;
      year1.innerHTML = ` ${i}`;
    };

    row.appendChild(cell);
  }
}

renderCalendar2(years);
function click13() {
  years -= 10;
  renderCalendar2(years);

  year2.innerHTML = ` ${years} - ${years + 9}`;
}
function click23() {
  years += 10;
  renderCalendar2(years);
  year2.innerHTML = ` ${years} - ${years + 9}`;
}
btn12.addEventListener("click", click13);
btn23.addEventListener("click", click23);

month_year.addEventListener("click", () => {
  table.classList.remove("animation_scale-1");/* ẩn lịch tháng*/
  table.classList.add("animation_scale-0");
    table1.style.display = "block";
    table1.classList.add("animation_scale-1");
  }, 300);
  table2.style.display = "none";
  setTimeout(() => {
});

year1.addEventListener("click", () => {
  table1.classList.remove("animation_scale-1");
  table1.classList.add("animation_scale-0");/* loại bỏ hiệu ứng từ table1 và áp dụng hiệu ứng ẩn*/
  setTimeout(() => {
    table2.style.display = "block";
    table2.classList.add("animation_scale-1");
  }, 300);
  table.style.display = "none";/* ẩn bảng lịch hiện tại*/
});
date_year.addEventListener("click", () => {
  table.style.display = "block";
  table1.style.display = "none";
  table2.style.display = "none";
  /* làm mới bảng lịch với tháng năm hiện tại*/''
  renderCalendar(new Date().getMonth(), new Date().getFullYear());
});