//Define max amount of staff members to display on each page
var maxDisplay = 10; //List items per page
var selectedNum = 1; //Pagination # selected, initiated at one

//Search variables 
var userInput = document.createElement("input");
    userInput.type = "text"; 
    userInput.placeholder = "Search for students";
var searchButton = document.createElement("button");
    searchButton.innerText = "Search";
var staffName = document.getElementsByClassName("student-details"); 
var searchList = document.getElementById("searchList");
 

//Staff list variables
var studentList = document.getElementById("list"); 
var listItem = document.getElementById("list").children; 
var listLength = document.getElementById("list").children.length;
var studentTabs = Math.ceil(listLength / maxDisplay); 
var ulPagination = document.getElementById("pagination");


//Creates the pagination 
function createPagination(numTabs, tab) {
    for (var i = 1; i <= numTabs; i++ ) {
        //Create list and anchor elements for pagination 
        var liPagination = document.createElement("li");
        var anchorPagination = document.createElement("a");
        //Assign numeric id to each list item created
        liPagination.id = i;
        anchorPagination.href = "#";
        anchorPagination.innerText = i;
        liPagination.addEventListener("click", tab); //When a pagination is clicked set the class to active
        //append elements to ul with id = pagination 
        ulPagination.appendChild(liPagination);
        liPagination.appendChild(anchorPagination);
        //set pagination with id = 1 to active
        if(liPagination.id == "1"){
            liPagination.childNodes[0].className = 'active';
        }
    }
}

//Creates the search button and input
function createSearch() {
       //append search input and button
    var searchInput = document.getElementsByClassName("student-search")[0]; 
    searchInput.appendChild(userInput);
    searchInput.appendChild(searchButton); 
}


//Set the selected student pagination with an active class. 
var studentActiveTab = function() {
    var pagItem = ulPagination.children;
    selectedNum = parseInt(this.id, 10); //Update selectedNum to number based on selected pagination 
    //Remove active class from all <a>
    for (var i = 0; i < pagItem.length; i++ ){
        pagItem[i].childNodes[0].className = "";
    }
    //set selected pagination to active
    this.childNodes[0].className = "active";
    getPage(selectedNum, listItem, listLength); 
}

//Set the selected student search pagination with an active class.
var searchActiveTab = function() {
    var pagItem = ulPagination.children;
    selectedNum = parseInt(this.id, 10); //Update selectedNum to number based on selected pagination 
    //Remove active class from all <a>
    for (var i = 0; i < pagItem.length; i++ ){
        pagItem[i].childNodes[0].className = "";
    }
    //set selected pagination to active
    this.childNodes[0].className = "active";
    getPage(selectedNum, searchList.children, searchList.children.length); 
}

//Hide all sstudent list items except for those included on selected pagination 
function getPage(num, list, length) {
    //Clear the staff list style. 
    for(var i = 0; i < length; i++){
        list[i].style.display = "";
    }
    for(var i = maxDisplay * num; i < length; i++){
        list[i].style.display = "none";
    }   
    for(var i = 0; i < (maxDisplay * num) - maxDisplay; i++){
        list[i].style.display = "none";
    }
}

//Search
function searchStaff() {
    var matchCount = 0;
    ulPagination.innerHTML = "";
    searchList.innerHTML = "";
    var header = document.getElementsByClassName("page-header cf")[0].childNodes[1]; //<h2> "Students"
    header.innerText = "Students"; //Resets to "students" if updated to "no matching results"
    for(var i = 0; i < listLength; i++) {
        listItem[i].style.display = "";
        var student = listItem[i];
        var input = userInput.value; 
        var staffMember = staffName[i].childNodes[3].innerText; //Employee name 
        var staffEmail = staffName[i].childNodes[5].innerText; //Employee email 
        var result = (staffMember.includes(input.toLowerCase()) || staffEmail.includes(input.toLowerCase())); //Match based on name or email 
        if(result){
            matchCount++; 
            var studentSearch = student.cloneNode(true); 
            searchList.appendChild(studentSearch); 
            listItem[i].style.display = "none";
        } else {
            listItem[i].style.display = "none";
        }
    }
    //input is null, clear search list and initiate student list
    if (!userInput.value) {
        searchList.innerHTML = "";
        createPagination(studentTabs, studentActiveTab);
        getPage(1, listItem, listLength);
    } else if (userInput.value) {
        if(matchCount == 0) { 
            header.innerText = "no matching results";
            //If search results are greater than the maxdisplay create pagination. 
        } else if (matchCount > maxDisplay) {
            var searchTabs = Math.ceil(searchList.children.length / maxDisplay);
            console.log(searchTabs);
            createPagination(searchTabs, searchActiveTab); 
            getPage(1, searchList.children, searchList.children.length); 
        }
    }
}

//Initialize page
function create() {
    createPagination(studentTabs, studentActiveTab);
    getPage(1, listItem, listLength); 
    createSearch(); 
}


searchButton.onclick = searchStaff;
create();


