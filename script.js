'use strict';
// -----------------시계-----------------
function realTime(){
  var clockInfo = document.getElementById("clockInfo");
  var clockTime = document.getElementById("realClock");
  var clockYear = document.getElementById("clockYear");
  var clockMonth = document.getElementById("clockMonth");
  var clockDate = document.getElementById("clockDate");
  var clock = new Date();
  var timeZone = clock.toLocaleString('en', {timeZoneName:'long'}).split(' ');
  // (function () {
    for (let i=0; i<3; i++){
      timeZone.shift();
    }    
  // })();
  clockInfo.innerHTML = timeZone.join(' ');
  clockTime.innerHTML = clock.toLocaleTimeString();
  clockYear.innerHTML = clock.getFullYear() + " /";
  clockMonth.innerHTML = clock.getMonth()+ 1 + " /";
  clockDate.innerHTML = clock.getDate();
  
  setTimeout(realTime, 1000);
}
window.onload = realTime;

// -----------------스탑와치-----------------

(function () {
  var watchStart = document.getElementById("start");
  var watchPause = document.getElementById("pause");
  var watchReset = document.getElementById("reset");
  var watchRecord = document.getElementById("record");
  var watchTimeFlow = document.getElementById("timeFlow");
  var recordList = document.getElementById("ol");
  var watchClear = document.getElementById("recordsClear");
  
  var hours = 0;
  var minutes = 0;
  var seconds =0;
  var miliSeconds = 0;
  var t= 0;
  var running= false;

  function runningTime () {
    miliSeconds ++
    if (miliSeconds >= 100){
      miliSeconds = 0;
      seconds ++
    }
    if (seconds >= 60){
      seconds =0;
      minutes ++
    }
    if (minutes >= 60){
      minutes =0;
      hours ++;
    }
    if (hours >= 99){
      hours=0;
    }
    watchTimeFlow.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + ":" + (miliSeconds > 9? miliSeconds: "0"+ miliSeconds);
    flowing();
  }
  
  function flowing() {
    t = setTimeout(runningTime, 10);
  }

  watchStart.addEventListener("click", start);
  watchPause.addEventListener("click", pause);
  watchReset.addEventListener("click", reset);
  watchRecord.addEventListener("click", record);
  watchClear.addEventListener("click", recordsClear);

  function start(){
    if (!running) {
      flowing();
      running = true;
    }
  }

  function pause(){
    if (running) {
      clearTimeout(t);
      running = false;
    }
  }

  function reset(){
    watchTimeFlow.textContent = '00:00:00:00';
    hours = 0;
    minutes = 0;
    seconds =0;
    miliSeconds = 0;
  }
  
  function record(){
    if (running === true) {
      var list = document.createElement('li');
      list.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + ":" + (miliSeconds > 9? miliSeconds: "0"+ miliSeconds);
      console.log(list.textContent);
      console.log(recordList);
      recordList.appendChild(list);
      // console.log('a');
    }
  }

  function recordsClear(){
    while(recordList.firstElementChild.firstChild){
      recordList.firstElementChild.remove(recordList.firstElementChild.firstChild);
    }
  }
})();

// -----------------달력-----------------

(function () {
  var calendarYear = document.getElementById("calendar_year");
  var calendarMonth = document.getElementById("calendar_month");
  var calendarLast = document.getElementById("button_left");
  var calendarNext = document.getElementById("button_right");
  var calendarDays = document.getElementById('calendar_days');
  var calendarDaysReal ;
  var changeDate;

  var calendarDate = new Date();
  var newDate = new Date();

  calendarDate.setDate(1);

  var monthArr = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];

  calendarYear.innerHTML = calendarDate.getFullYear();
  calendarMonth.innerHTML = strMonth(calendarDate.getMonth());

  openCalendar();

  

  calendarLast.addEventListener('click', pastCalendar);
  calendarNext.addEventListener('click', nextCalendar);
  

  function strMonth (month) {
    return monthArr[month];
  }

  function openCalendar() {
    var saveMonth = calendarDate.getMonth();
    for (let i=1; i<=42; i++){
      createSpace();
    }
    var day = calendarDate.getDay();
    while (calendarDate.getMonth() === saveMonth) {
      writeDays(calendarDate.getDate(), day, calendarDate);
      calendarDate.setDate(calendarDate.getDate()+1);
    }
    calendarDate.setDate(1);

    calendarDaysReal = document.querySelectorAll('.calendarDaysReal');
    for (let i=0; i<calendarDaysReal.length; i++){
      calendarDaysReal[i].addEventListener('click', daysClick);
    }
  }

  function createSpace() {
    var addSpace = document.createElement('span');
    // addSpace.className = 'calendarSpace';
    calendarDays.appendChild(addSpace);
  }
  // 마진사용시 방법 -----------------------------
  // function writeDays(date, day) {
  //   var addDay = document.createElement('span');
  //   addDay.textContent = date;
  //   if (date === 1) {
  //     if (day !== 0) {
  //       addDay.style.marginLeft = (day * 48 + 8) + 'px' ;
  //     }
  //   } 
  //   // console.log(calendarDate);
  //   // console.log(newDate);
  //   // console.log(calendarDate.getTime());
  //   // console.log(calendarDate === newDate);
  //   // console.log(calendarDate.getTime() === newDate.getTime());
  //   if (calendarDate.getTime() === newDate.getTime()){
  //     addDay.style.border = '2px solid gold';
  //     // addDay.style.color = 'gold';
  //   }
  //   calendarDays.appendChild(addDay);
  // }

  function writeDays(date, day, data) {
    var addDay = document.getElementById('calendarSpace');
    addDay = calendarDays.children;
    var calc = date + day - 1;
    addDay[calc].setAttribute('class','calendarDaysReal');
    addDay[calc].setAttribute('data-calendar-data', data);
    addDay[calc].innerHTML = date;
    if (calendarDate.getTime() === newDate.getTime()){
      addDay[calc].setAttribute('id','today');
    }
  }
  
  function pastCalendar() {
    eraseCalendar();
    var calendarPastMonth = document.getElementById("calendar_month").innerHTML;
    if (calendarPastMonth === 'January'){
      var calendarPastYear = document.getElementById("calendar_year").innerHTML;
      calendarYear.innerHTML = calendarPastYear*1-1;
      calendarMonth.innerHTML = strMonth(11);
    } else {
      calendarPastMonth = monthArr.indexOf(calendarPastMonth);
      calendarMonth.innerHTML = strMonth(calendarPastMonth-1);
    }
    calendarDate.setMonth(calendarDate.getMonth()-2);
    openCalendar();
  }

  function nextCalendar() {
    eraseCalendar();
    var calendarFutureMonth = document.getElementById("calendar_month").innerHTML;
    if (calendarFutureMonth ==="December") {
      var calendarFutureYear = document.getElementById("calendar_year").innerHTML;
      calendarYear.innerHTML = calendarFutureYear*1+1;
      calendarMonth.innerHTML = strMonth(0);
    } else {
      calendarFutureMonth = monthArr.indexOf(calendarFutureMonth);
      calendarMonth.innerHTML = strMonth(calendarFutureMonth+1);
    }
    calendarDate.setMonth(calendarDate.getMonth());
    openCalendar();
  }

  function daysClick(e) {
    var active = document.getElementsByClassName('active');
    for(let i=0; i<active.length; i++) {
      active[i].classList.remove('active');
    }
    // var cDay = document.createElement
    e.currentTarget.classList.add('active');
    // console.log(e.currentTarget);
    document.querySelector('.todoList').classList.remove('hidden');
    changeDate = new Date(e.currentTarget.dataset.calendarData);
    // console.log(changeDate.toLocaleDateString());
    showTodoDate(changeDate);
    todoInput.focus();
    hideChooseAll();
  }
  

  function eraseCalendar() {
    calendarDays.innerHTML = '';
  }


  // -----------------TODO List-----------------  


  var inputValue;
  var todoData = [];
  var dataArr = {};
  // var test = '1234';
  // data = {[test]:[]}
  // data[test].push({text: '414', id:'413'});
  // data[test].push({text: '4123', id:'15123'});
  // console.log(data);
  

  var todoInput = document.querySelector('.todoInput');
  var todos = document.querySelector('.todos');
  var todoFooterToggle = document.querySelectorAll('.todoFooterToggle');
  var todoDate = document.querySelector('.todoDate');
  var todoChooseAll = document.querySelector('.todoChooseAll')
  var clearCompleted = document.querySelector('.todoFooterRight');
  var leftItems = document.querySelector('.todoFooterLeft');
  var rename;

  function makeId(title) {
    var num = Math.random();
    var date = changeDate.toLocaleDateString();
    dataArr = {[date]:[]};
    if (!completed) {
      var completed = false;
    }
    
    var id = "@" + num;
    // data[date].push({ id: id, title: title , completed: completed });
    dataArr[date].push({ id: id, title: title , completed: completed });
    dataArr[date].push({ id: id, title: title , completed: 'ture' });
    console.log(dataArr);
  }

  todoInput.addEventListener('keyup', addList);
  todoChooseAll.addEventListener('click', chooseAll);
  for(let i=0; i<todoFooterToggle.length; i++) {
    todoFooterToggle[i].addEventListener('click', function (e) {
      for(let j=0; j<todoFooterToggle.length; j++) {
        if(todoFooterToggle[j].classList.value.match('selected')) {
          todoFooterToggle[j].classList.remove('selected');
        }
      }
      e.currentTarget.classList.add('selected');
      
    })
  }
  clearCompleted.addEventListener('click', function () {
    var toggle = document.querySelectorAll('.toggle');
    for(let i=0; i<toggle.length; i++) {
      if(toggle[i].checked) {
        toggle[i].parentNode.remove();
      }
    }
    todoData = [];
    todoChooseAll.classList.remove('checkedAll')
    hideChooseAll()
  })


  
  function showTodoDate(date) {
    todoDate.innerHTML = date.toLocaleDateString();
    todoDate.setAttribute('data-todo-data', date.toLocaleDateString());
  }

  function addList(e) {
    if(e.code === 'Enter') {
      // 데이터 입력 및 db추가
      addData();
      // console.log(data);
    } else {
      inputValue = e.currentTarget.value;
    }
  }

  function addData() {
    if((inputValue !== "") && (inputValue !== undefined)) {
      todoData.push(inputValue);
      // if(testData[dateData]) {
      //   testData[dateData].push(inputValue);
      // } else {
      //   testData[dateData] = [inputValue];
      // }
      // console.log(testData);
      todoInput.value = '';
      inputValue = 0;
      addTemplate(todos, todoData);
      rename = document.querySelectorAll(".rename");
      for(let i=0; i<rename.length; i++) {
        rename[i].addEventListener('click', renameFunc);
      }
      var todoRecord = document.querySelectorAll('.todoRecord');
      clickFunc(todoRecord, todoData);
      hideChooseAll()
    }
  }

  function addTemplate(addTo, data) {
    var todoRecord = document.querySelectorAll('.todoRecord');
    for (let child of todoRecord) {
      addTo.removeChild(child);
    }

    for (let i = 0; i < data.length; i++) {
      makeId(data[i]);
      var template 
      = `<li class="todoRecord">
      <input class="toggle" type="checkbox">
      <label class="rename" for="toggle">${data[i]}</label>
      <button class="destroy"></button>
      </li>`;
      addTo.innerHTML += template;
    }

    // for (let i = 0; i < data.length; i++) {
    //   var template 
    //   = `<li data-date="${data[i].date}" data-id="${data[i].id}" class="todoRecord ${data[i].completed}">
    //   <input class="toggle" type="checkbox"  ${data[i].checked}>
    //   <label for="toggle">${data[i].title}}</label>
    //   <button class="destroy"></button>
    //   </li>`;
    //   addTo.innerHTML += template;
    // }
  }

  function clickFunc(addTo, data) {
    console.log('clickFunc');
    for(let i=0; i<addTo.length; i++) {
      addTo[i].children[2].addEventListener('click', function(e) {
        // debugger
        // console.log(e.currentTarget.parentNode.id);

        var index;

        for (let j = 0; j < addTo.length; j++) {
          if (addTo[j] === e.currentTarget.parentNode) {
            index = j;
          }
        }

        data.splice(index, 1);
        e.currentTarget.parentNode.remove();
        addTo = document.querySelectorAll('.todoRecord');
        hideChooseAll()
        clickFunc(addTo, data);
      });
    }

    for(let i=0; i<addTo.length; i++) {
      addTo[i].children[0].addEventListener('click', function(e) {
        hideChooseAll()
      });
    }
  }

  function renameFunc(e) {
    var newText = prompt("rename here");
    if((newText !== "") && (newText !== undefined)) {
      e.currentTarget.innerHTML = newText;
    }
  }

  function chooseAll(e) {
    var toggle = document.querySelectorAll('.toggle');
    // console.log(e.currentTarget.classList.value.match('checkedAll'));
    if (e.currentTarget.classList.value.match('checkedAll')) {
      e.currentTarget.classList.remove('checkedAll')
      for(let i=0; i<toggle.length; i++) {
        toggle[i].checked = false;
      }
    } else {
      // console.log(e.currentTarget.classList);
      e.currentTarget.classList.add('checkedAll')
      for(let i=0; i<toggle.length; i++) {
        toggle[i].checked = true;
      }
    }
    hideChooseAll()
  }

  function hideChooseAll() {
    var toggle = document.querySelectorAll('.toggle');
    var toggleCount = 0;
    for (let i=0; i<toggle.length; i++) {
      if(toggle[i].checked) {
        toggleCount++ ;
      } 
    }
    if (!toggle.length) {
      todoChooseAll.classList.add('hidden');
      leftItems.innerHTML = '';
    } else {
      todoChooseAll.classList.remove('hidden');
      // console.log(toggleCount);
      leftItems.innerHTML = toggle.length - toggleCount + 'items left';
    }
  }
})();