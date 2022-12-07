// employee1 = new Employee("123","Vinh","phamvinhquang77@gmail.com","20/10/2020","Staff");
var company = new Company();





// localStorage ("string") -> ("object") passed to company.employeeList -> display it.

// store the data in localStorage
updateEmployeeListDataInLocalStorage = (employeeList) => {
    // convert employeeList to JSON type.
    var employeeListDataInJSON = JSON.stringify(employeeList);
    // set it in localStorage 
    localStorage.setItem('EmployeeList', employeeListDataInJSON);
}

// get the data from localStorage -> pass it to employeeList
getEmployeeListDataInLocalStorage = () => {
    var employeeListDataInString = localStorage.getItem('EmployeeList');
    var employeeListInObject = JSON.parse(employeeListDataInString);
    company.employeeList = employeeListInObject;
    // displayEmployeeList(company.employeeList);
}



// Pop-up form : Add new employee and edit employee details
popUpForm = (modal_title, readonly = false, type = 1) => {
    // type = 1 : Add new employee
    // type = 2 : Edit employee details
    
    document.getElementById("header-title").innerHTML = modal_title;
    document.getElementById("employeeID").readOnly = readonly;
    
    
    switch (type){
        case 1: // add new employee
        document.getElementById("addButton").style.display = "block";
        document.getElementById("updateButton").style.display = "none";
        break;
        case 2: // edit employee details
        document.getElementById("addButton").style.display = "none";
        document.getElementById("updateButton").style.display = "block";
        break;
    }
}

// reset errorMessage if the user enter invalid before
resetErrorMessage = () =>{
    document.getElementById("errorMessageName").style.display = "none";
    document.getElementById("errorMessageEmail").style.display = "none";
    document.getElementById("errorMessagePosition").style.display = "none";

}

// reset form
deleteForm = () => { 
    let elements = document.getElementsByClassName("input-sm");
    for(let element of elements){
        element.value = "";
        
    }
    
    document.getElementById("position").selectedIndex = 0;
}

// FUNCTION - display all of employee in employee list
let currentPage = 1;
displayEmployeeList = (employeeList) => {

    let tbody = document.getElementById("tableEmployeeList");
    tbody.innerHTML = ""; // reset table

    let numberOfEmployees = employeeList.length;
    let employee, tr, td;
    let ulDividePage = document.getElementById("ulDividePage");
    ulDividePage.innerHTML = ""; // reset

    let numberOfLineInPage = 5;
    let numberOfPage = Math.ceil(numberOfEmployees / numberOfLineInPage);

    for(let i = 1; i <= numberOfPage; i++){
        let li = document.createElement('li');
        ulDividePage.appendChild(li);

        let a = document.createElement('a');
        a.setAttribute("class", "page-link");
        a.setAttribute("id", "page_" + i);
        a.innerHTML = i;
        li.appendChild(a);

        // calling page turning function
        pageTurning("page_" + i);

    }

    let startPage = (currentPage - 1)*numberOfLineInPage;
    let endPage = currentPage * numberOfLineInPage;
    
    if(numberOfEmployees < endPage){
        endPage = numberOfEmployees;
    }

    // display all of employee
    for(let i = startPage; i < endPage; i++){
        console.log(employeeList[i].employeeID);
        employee = employeeList[i];
        // create the row for table
        tr = document.createElement('tr');
        tbody.appendChild(tr);
        // console.log(employee.employeeID);s
        //  create <td> - take all of employee value and add it to <td>
        for(let j=0; j < employee.compareArray.length; j++){
            td = document.createElement('td');
            td.innerHTML = employeeList[i].compareArray[j];
            tr.appendChild(td);
        }
        // let edit = '<a class="btn btn-primary text-white" data-toggle="modal" href="myModal" id="edit_"'+ employee.employeeID + '> <en class="fa fa-pencil"></en></a>'
        // Create edit and delete button for each row
        let editButton = `<a class="btn btn-primary text-white" data-toggle="modal" href="#myModal" id="edit_${employee.employeeID}"> <en class="fa fa-pencil"></en></a>`;
        let deleteButton = `<a class="btn btn-danger text-white ml-2" id="delete_${employee.employeeID}"> <en class="fa fa-trash"></en></a>`;
        // Display the edit and delete button for each row.
        td = document.createElement('td');
        td.innerHTML = editButton + deleteButton;
        td.setAttribute("align", "center");
        tr.appendChild(td);

        // Add event for pencil_editButton and deleteButton 
        editEmployeeDetail("edit_" + employee.employeeID);
        updateButton();

        // Add event for "delete" Button
        deleteEmployee("delete_"+ employee.employeeID);
        


    }

}

// FUCNTION - handle envent "Add New Employee" button
document.getElementById("addNewEmployeeButton").addEventListener("click", () => {
    // Create new unquieID for EmployeeID
    employeeIDCreator =  Math.random().toString(36).substr(2, 4);
    document.getElementById("employeeID").placeholder = employeeIDCreator; 
    // reset the form
    deleteForm();
    resetErrorMessage();
    // Create unquieID for EmployeeID
    employeeIDCreator =  Math.random().toString(36).substr(2, 4);
    document.getElementById("employeeID").placeholder = employeeIDCreator;

    popUpForm("Add New Employee");

})

// FUNCTION - handle event "Add" button in modal form.
document.getElementById("addButton").addEventListener("click", () => {
    
    // Validation
    let employeeID = employeeIDCreator;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let startDate = document.getElementById("datepicker").value;
    let position = document.getElementById("position").value;
    let phone = document.getElementById("phone").value;


    // Create the Validation object
    var validation = new Validation();

    // Check user input name
    validation.isValid &= validation.isNotEmpty(name,"errorMessageName", "Please enter your name." );
    validation.isValid &= validation.isValidInput(name,"errorMessageName", "Please input valid value.");
    validation.isValid &= validation.isEmailInputValid(email, "errorMessageEmail", "Please enter employee email." );
    validation.isValid &= validation.isPhoneInputValid(phone, "errMessagePhoneNum", "Please enter Australia phone." );
    validation.isValid &= validation.isPositionSelected("position", "errorMessagePosition", "Please select one employee position.");

    if(validation.isValid){
        let newEmployee = new Employee(employeeID, name, email, startDate, phone, position);
        company.addNewEmployee(newEmployee);
        swal("Successful Add!", "The employee list has been update", "success");
        
        updateEmployeeListDataInLocalStorage(company.employeeList);
        // Display Employee List after add new employee
        displayEmployeeList(company.employeeList);
        // delete the form after "add the employee"
        deleteForm();
    }
    // Create new unquieID for EmployeeID
    // employeeIDCreator =  Math.random().toString(36).substr(2, 4);
    // document.getElementById("employeeID").placeholder = employeeIDCreator;
    
})


// FUNCTION - handle event "pencil_editButton".
editEmployeeDetail = (idButton) => {
    document.getElementById(idButton).addEventListener("click", () => {
        let id = idButton;
        // the idButton = "edit_employee.EmployeeID"
        let arrayEdit_ID = id.split("_");
        // arrayEdit_ID = [edit], [employeeID]
        let employeeID = arrayEdit_ID[1];

        // find employee detail based on employeeID
        let employee = company.findEmployeeBasedEmployeeID(employeeID);
        // pass all of the employee detail to the form.
        document.getElementById("employeeID").value = employeeID;
        document.getElementById("name").value = employee.name;
        document.getElementById("email").value = employee.email;
        document.getElementById("datepicker").value = employee.startingDate;
        document.getElementById("position").value = employee.position;
        document.getElementById("phone").value = employee.phone;

        // Display the pop-up form.
        popUpForm("Update Employee Detail", true, 2);
        // Reset the message if update is unvalid.
        resetErrorMessage();
        
    })
}

// FUCNTION - handle event "Update" button in modal form
updateButton = () => {
    document.getElementById("updateButton").addEventListener("click", () =>{
        // resetErrorMessage();

        // add new employee information
        let employeeID = document.getElementById("employeeID").value;
        let nameNewInfo = document.getElementById("name").value;
        let emailNewInfo = document.getElementById("email").value;
        let startDateNewInfor = document.getElementById("datepicker").value;
        let positionNewInfor = document.getElementById("position").value;
        let phoneNewInfor = document.getElementById("phone").value;

        var validation = new Validation();
        validation.isValid = true;
        // Check user input name
        validation.isValid &= validation.isNotEmpty(nameNewInfo,"errorMessageName", "Please enter your name." );
        validation.isValid &= validation.isValidInput(nameNewInfo,"errorMessageName", "Please input valid value.")
        validation.isValid &= validation.isEmailInputValid(emailNewInfo, "errorMessageEmail", "Please enter employee email." );
        validation.isValid &= validation.isPhoneInputValid(phoneNewInfor, "errMessagePhoneNum","Please enter Australia phone.")
        validation.isValid &= validation.isPositionSelected("position", "errorMessagePosition", "Please select one employee position.");

        if(validation.isValid){

            let newEmpployeeInfo = new Employee(employeeID, nameNewInfo, emailNewInfo, startDateNewInfor, phoneNewInfor, positionNewInfor);
            // update employee information.
            company.editEmployee(newEmpployeeInfo);

            swal("Successful Update New Employee Detail!", "The employee list has been update", "success");
            // Update the employeeList to localStorage
            updateEmployeeListDataInLocalStorage(company.employeeList);
            // display new employee list after edit employee detail.
            displayEmployeeList(company.employeeList);
        }
    })
}

// FUNCTION - handle "Delete" button for each row
deleteEmployee = (idButton) => {
    document.getElementById(idButton).addEventListener("click",()=>{
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) =>{
            // if the user accept to delete the record
            if(willDelete){
                let id = idButton;
                let arrayDelete_ID = id.split("_");
                let employeeID = arrayDelete_ID[1];

                company.deleteEmployee(employeeID);
                // Update the data to localStorage
                updateEmployeeListDataInLocalStorage(company.employeeList);
                // Display Employee List after deleted
                displayEmployeeList(company.employeeList);

                swal("Your file has been deleted.",{
                    icon: "success",
                });

            }else{
                swal("Cancelled", "This record still in your data!","error");
            }

        })



    })
}


// FUNCTION - enter the name in "Search Bar" and find employee.
document.getElementById("searchName").addEventListener("keyup", () => {
    let searchName = document.getElementById("searchName").value;
    // return employeeListResult - new company object.
    let employeeListResult = company.findEmployeeBasedOnName(searchName);
    displayEmployeeList(employeeListResult.employeeList);
})

// FUNCTION - Ascending sorting employee list.
document.getElementById("ascOrder").addEventListener("click", () => {
    // hide "ascOrder" button and display "descOrder" button
    document.getElementById("ascOrder").style.display = "none";
    document.getElementById("descOrder").style.display = "inline";
    company.sortEmployeeList(1);
    // display employeeList after "Ascending" sort
    displayEmployeeList(company.employeeList);
    
})

// FUNCTION - Descending sorting employee list
document.getElementById("descOrder").addEventListener("click", () => {
    // hide "descOrder" button and display "ascOrder" button
    document.getElementById("ascOrder").style.display = "inline";
    document.getElementById("descOrder").style.display = "none";
    company.sortEmployeeList(-1);
    // display employeeList after "Descending" sort
    displayEmployeeList(company.employeeList);
    
})


// FUNCTION - page turing <1>, <2>,<3>.
pageTurning = (idButton) => {
    document.getElementById(idButton).addEventListener("click", () => {
        let id = idButton;
        let splitidButtonArray = id.split("_");
        currentPage = splitidButtonArray[1];
        displayEmployeeList(company.employeeList);    
    })
}


if(localStorage.length == 0){
    // create the "key" and "value" on localStorage
    localStorage.setItem('EmployeeList', []);
    
}
else{
    // load the data from localStorage
    getEmployeeListDataInLocalStorage();
    // Display the data from localStorage.
    displayEmployeeList(company.employeeList);
}
