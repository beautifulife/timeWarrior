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
  var defaultTemplate;
  template();
  var todoData = [];
  

  var dataArr = {};

  var date;
  // var id;
  // var title;
  // var completed;

  var todoInput = document.querySelector('.todoInput');
  var todos = document.querySelector('.todos');
  var todoFooterToggle = document.querySelectorAll('.todoFooterToggle');
  var todoDate = document.querySelector('.todoDate');
  var todoChooseAll = document.querySelector('.todoChooseAll')
  var clearCompleted = document.querySelector('.todoFooterRight');
  var leftItems = document.querySelector('.todoFooterLeft');
  var rename;


  todoInput.addEventListener('keyup', addList);
  todoChooseAll.addEventListener('click', chooseAll);
  clearCompleted.addEventListener('click', clearAll);
  for(let i=0; i<todoFooterToggle.length; i++) {
    todoFooterToggle[i].addEventListener('click', selectToggle );
  }

  // To Do List 날짜 표시 및 date변수 지정
  // 기존 출력항목 삭제 및 DB 있을 시 출력
  function showTodoDate(dateNow) {
    date = dateNow.toLocaleDateString();
    todoDate.innerHTML = date;
    todoDate.setAttribute('data-todo-data', date);

    todoChooseAll.classList.remove("checkedAll");
    pressAgain();
    hideChooseAll()
  }


  // All, Active, Completed를 click이벤트로 변경
  function selectToggle(e) {
    for(let j=0; j<todoFooterToggle.length; j++) {
      if(todoFooterToggle[j].classList.value.match('selected')) {
        todoFooterToggle[j].classList.remove('selected');
      }
    }
    e.currentTarget.classList.add('selected');

    // console.log('operating pressAgain');
    pressAgain();
  }

  
  // 리스트를 전체삭제하고 dataArr에서도 삭제
  function clearAll() {
    var toggle = document.querySelectorAll('.toggle');
    for(let i=0; i<toggle.length; i++) {
      if(toggle[i].checked) {
        var id = toggle[i].dataset.id;
        var a = findId(id);
        dataArr[date].splice(a, 1);
        console.log(dataArr);

        toggle[i].parentNode.remove();
      }
    }
    todoChooseAll.classList.remove('checkedAll')
    hideChooseAll()
  }

  // event발생시 해당 target id 와 동일한 id를 dataArr에서 찾음
  function findId (targetId) {
    for (let i=0; i<dataArr[date].length; i++) {
      if(dataArr[date][i].id === targetId) {
        return i;
      }
    }
  }

  
  // 페이지변경 시 재출력 기능
  function pressAgain() {
    // 기존출력물 삭제
    var todoRecord = document.querySelectorAll('.todoRecord');
    for (let i=0; i<todoRecord.length; i++) {
      todoRecord[i].remove();
    }

    // DB 기반 새로 출력
    if (dataArr[date]) {
      for (let i=0; i<dataArr[date].length; i++) {
        pressTemplate(todos, dataArr[date][i].id, dataArr[date][i].title, dataArr[date][i].completed);
      }
    }

    // data 에 complete일 경우 체크박스 표시
    var todoRecord = document.querySelectorAll('.todoRecord');
    checkBox(todoRecord); 

    // 이벤트 추가
    addEvent(todoRecord);
    console.log('finished');
  }

  // input 및 enter
  function addList(e) {
    // inputVaule 없을시 아무것도 입력안되도록 수정 (기존 = 0 출력)
    if(inputValue && e.code === 'Enter') {
      // 데이터 입력 및 db추가
      addData();
      // console.log(data);
    } else {
      inputValue = e.currentTarget.value;
    }
  }

  // 항목추가 프로세스
  function addData() {
    if((inputValue !== "") && (inputValue !== undefined)) {
      todoData.push(inputValue);
      // inputValue(임시값) title변수에 할당
      pressData(todos, inputValue);

      // input 태그 값 및 inputValue(임시값) 삭제 
      todoInput.value = '';
      inputValue = 0;

      // 항목 명 수정이벤트 삽입
      rename = document.querySelectorAll(".rename");
      for(let i=0; i<rename.length; i++) {
        rename[i].addEventListener('click', renameFunc);
      }

      // 항목 생성시 eventHandler 생성
      var todoRecord = document.querySelectorAll('.todoRecord');
      checkBox(todoRecord);
      addEvent(todoRecord);
      hideChooseAll()
    }
  }
  
  // 항목발행용 탬플릿
  function template() {
    defaultTemplate 
    = `<li data-id="{{id}}" class="todoRecord {{completed}}">
      <input class="toggle" type="checkbox">
      <label class="rename" for="toggle">{{title}}</label>
      <button class="destroy"></button>
      </li>`;
  };
  
  // DB저장 및 항목 발행
  function pressData(addTo, title) {
    
    var id = '@' + Math.random();
    var completed = '';

    // dataArr가 덮어씌워지는 것을 방지
    // if(!dataArr[date]) {
    //   if(dataArr) {
    //     var dataArr2 = {[date]:[]};
    //     Object.assign(dataArr, dataArr2);
    //   } else {
    //     dataArr = {[date]:[]};
    //   }
    // }
    // dataArr[date].push({id:id, title:title, completed:completed});

    // 수정된 코드
    if(!dataArr[date]) {
      dataArr[date] = [];
    }
    dataArr[date].push({id:id, title:title, completed:completed});

    console.log(dataArr);
    
    // 탬플릿의 주요변수를 교체
    pressTemplate(addTo, id, title, completed);
  }

  // 탬플릿 적용 및 data생성 시 toggle 조건에 따라 출력물 수정
  function pressTemplate (addTo, id, title, completed) {
    console.log('start pressTemplate');
    console.log(completed);
    var selected = document.querySelectorAll('.selected');
    if(selected[0].innerHTML === 'Active') {
      if(completed === 'completed') {
        return;
        // console.log('Active');
      }
    } else if(selected[0].innerHTML === 'Completed') {
      if(completed !== 'completed') {
        return;
        // console.log('completed');
      }
    }

    var templateNow = defaultTemplate;
    templateNow = templateNow.replace('{{id}}', id);
    templateNow = templateNow.replace('{{title}}', title);
    templateNow = templateNow.replace('{{completed}}', completed);

    // 항목 발행
    addTo.innerHTML += templateNow
  }

  // event Handler 생성
  function addEvent(addTo) {
    // console.log(addTo[addTo.length-1].children[2]);
    // addTo[addTo.length-1].children[2].addEventListener('click', removeList);
    // 하나씩 생성될 때마다 이벤트를 걸을 시 이벤트리스너가 마지막 항목에만 생성
    for(let i=0; i<addTo.length; i++) {
      addTo[i].children[2].removeEventListener('click', removeList);
    }
    for(let i=0; i<addTo.length; i++) {
      addTo[i].children[2].addEventListener('click', removeList);
    }

    for(let i=0; i<addTo.length; i++) {
      addTo[i].children[0].removeEventListener('click', completeCheck);
    }
    for(let i=0; i<addTo.length; i++) {
      addTo[i].children[0].addEventListener('click', completeCheck);
    }
    

    // 항목삭제
    function removeList(e) {
      var id = e.currentTarget.parentNode.dataset.id;
      var a = findId(id);
  
      dataArr[date].splice(a, 1);
      // console.log(dataArr[date]);

      e.currentTarget.parentNode.remove();
      e.currentTarget.removeEventListener('click', removeList);  
      hideChooseAll()
    }

    // 완료 체크 기능
    function completeCheck(e) {
      var id = e.currentTarget.parentNode.dataset.id;
      var a = findId(id);

      if(e.currentTarget.checked) {  
        dataArr[date][a].completed = 'completed';
        console.log(dataArr[date][a].completed);
      } else {
        dataArr[date][a].completed = '';
        console.log(dataArr[date][a].completed);
      }

      var selected = document.querySelectorAll('.selected');
      if (selected[0].innerHTML === 'Active') {
        if (e.currentTarget.checked === true) {
          e.currentTarget.parentNode.remove();
        }
      } else if (selected[0].innerHTML === 'Completed') {
        if (e.currentTarget.checked === false) {
          e.currentTarget.parentNode.remove();
        }
      }

      hideChooseAll();
    }  
  }

  // data와 비교하여 checkBox 체크 변경
  function checkBox (addTo) {
    for (let i=0; i<addTo.length; i++) {
      var id = addTo[i].dataset.id;
      var a = findId(id);

      if(dataArr[date][a].completed !== "") {
        addTo[i].children[0].checked = true;
      }
    }
    hideChooseAll()
  }

  //이름 변경
  function renameFunc(e) {
    var newText = prompt("rename here");
    var id = e.currentTarget.parentNode.dataset.id;
    var a = findId(id);
    dataArr[date][a].title = newText;
    if((newText !== "") && (newText !== undefined)) {
      e.currentTarget.innerHTML = newText;
    }
  }

  // 체크박스 전체선택기능
  function chooseAll(e) {
    var toggle = document.querySelectorAll('.toggle');
    // console.log(e.currentTarget.classList.value.match('checkedAll'));
    if (e.currentTarget.classList.value.match('checkedAll')) {
      e.currentTarget.classList.remove('checkedAll')
      for(let i=0; i<toggle.length; i++) {
        toggle[i].checked = false;
        var id = toggle[i].parentNode.dataset.id;
        var a = findId(id);
        dataArr[date][a].completed = "";
      }
    } else {
      // console.log(e.currentTarget.classList);
      e.currentTarget.classList.add('checkedAll')
      for(let i=0; i<toggle.length; i++) {
        toggle[i].checked = true;
        var id = toggle[i].parentNode.dataset.id;
        var a = findId(id);
        dataArr[date][a].completed = "completed";
      }
    }
    console.log(dataArr);
    hideChooseAll()
  }

  // 체크박스 선택기능 & 전체 선택기능버튼 숨기기,보이기
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