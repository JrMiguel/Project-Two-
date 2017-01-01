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

//Staff list variables
var listItem = document.getElementById("list").children; 
var listLength = document.getElementById("list").children.length;
var numberOfTabs = Math.ceil(listLength / maxDisplay); 
var ulPagination = document.getElementById("pagination");



//Create and append pagination tabs based on numberOfTabs (listLength / maxDisplay)
function create() {
    //append search input and button
    var searchInput = document.getElementsByClassName("student-search")[0]; 
    searchInput.appendChild(userInput);
    searchInput.appendChild(searchButton);
    for (var i = 1; i <= numberOfTabs; i++ ) {
        //Create list and anchor elements
        var liPagination = document.createElement("li");
        var anchorPagination = document.createElement("a");
        //Assign numeric id to each list item created
        liPagination.id = i;
        anchorPagination.href = "#";
        anchorPagination.innerText = i;
        liPagination.onclick = activeTab; //When a pagination is clicked set the class to active
        //append elements to ul with id = pagination 
        ulPagination.appendChild(liPagination);
        liPagination.appendChild(anchorPagination);
        //set pagination with id = 1 to active
        if(liPagination.id == "1"){
            liPagination.childNodes[0].className = 'active';
        }
    }
    getPage(selectedNum); 
}



//Set the selected pagination with an active class. 
function activeTab() {
    var pagItem = ulPagination.children;
    selectedNum = parseInt(this.id, 10); //Update selectedNum to number based on selected pagination 
    //Remove active class from all <a>
    for (var i = 0; i < pagItem.length; i++ ){
        pagItem[i].childNodes[0].className = "";
    }
    //set selected pagination to active
    this.childNodes[0].className = "active";
    getPage(selectedNum); 
}




//Hide all staff list items except for those included on selected pagination 
function getPage(num) {
    //Clear the staff list style. 
    for(var i = 0; i < listLength; i++){
        listItem[i].style.display = "";
    }
    for(var i = maxDisplay * num; i < listLength; i++){
        listItem[i].style.display = "none";
    }   
    for(var i = 0; i < (maxDisplay * num) - maxDisplay; i++){
        listItem[i].style.display = "none";
    }
}

//Search
function searchStaff() {
    var matchCount = 0; 
    var header = document.getElementsByClassName("page-header cf")[0].childNodes[1]; //<h2> "Students"
    header.innerText = "Students"; //Resets to "students" if updated to "no matching results"
    for(var i = 0; i < listLength; i++) {
        listItem[i].style.display = "";
        var input = userInput.value; 
        var staffMember = staffName[i].childNodes[3].innerText; //Employee name 
        var staffEmail = staffName[i].childNodes[5].innerText; //Employee email 
        var result = (staffMember.includes(input.toLowerCase()) || staffEmail.includes(input.toLowerCase())); //Match based on name or email 
        if(result){
            matchCount++; 
        } else {
            listItem[i].style.display = "none"; //hide all staff list items that do not match.
        }
    }
    if (userInput.value) { //If text entered into search box, hide pagination. 
        ulPagination.style.display = "none";
            if(matchCount == 0) { 
                header.innerText = "no matching results"; 
            } 
    } else { //If null, show pagination and execute getPage 
        ulPagination.style.display = "";
        getPage(selectedNum);
    }
}


searchButton.onclick = searchStaff;
create();

//Add get index number with previousSibling http://stackoverflow.com/questions/5913927/get-child-node-index
