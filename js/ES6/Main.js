var newEmployee1 = new Employee("abc", " Tim John", "john@gmail.com", "10/11/2022", "Staff" );
var newEmployee2 = new Employee("bcd", "Jack Denials", "jack@gmail.com","10/12/2022", "Manager");
var newEmployee1_1 = new Employee("abc", "Jim", "jack@gmail.com", "10/11/2022", "Staff");
var company = new Company();
company.addNewEmployee(newEmployee1);
company.addNewEmployee(newEmployee2);

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

// reset form
deleteForm = () => { 
    let elements = document.getElementsByClassName("input-sm");
    for(let element of elements){
        element.value = "";

    }

    document.getElementById("position").selectedIndex = 0;
}

// Devide the page and display all of employee.
let currentPage = 1;
displayEmployeeList = (employeeList) => {
    let tbody = document.getElementById("tableEmployeeList");
    tbody.innerHTML = ""; // reset table

    let numberOfEmployees = employeeList.length;
    let employee, tr, td;
    let ulDividePage = document.createElement("ulDividePage");
    ulDividePage.innerHTML = ""; // reset

    let numberOfLineInPage = 2;
    let numberOfPage = Math.ceil(numberOfEmployees / numberOfLineInPage);

    for(let i = 1; i <= numberOfPage; i++){
        let li = document.createElement("li");
        ulDividePage.appendChild(li);

        let a = document.createElement("a");
        a.setAttribute("class", "page-link");
        a.setAttribute("id", "page_" + i);
        a.innerHTML = i;
        li.appendChild(a);
    }

    let startPage = (currentPage - 1)*numberOfLineInPage;
    let endPage = currentPage *numberOfLineInPage;
    
    if(numberOfEmployees < endPage){
        endPage = numberOfEmployees;
    }

    // display all of employee
    for(let i = startPage; i <= endPage; i++){
        employee = employeeList[i];
        
        // create the row for table
        tr = document.createElement('tr');
        tbody.appendChild(tr);

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


    }

}

// FUCNTION - handle envent "Add New Employee" button
document.getElementById("addNewEmployeeButton").addEventListener("click", () => { 
    // reset the form
    deleteForm();
    popUpForm("Add New Employee");

})

// FUNCTION - handle event "Add" button in modal form.
document.getElementById("addButton").addEventListener("click", () => {
    // Validation

    let employeeID = document.getElementById("employeeID").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let startDate = document.getElementById("datepicker").value;
    let position = document.getElementById("position").value;


    let newEmployee = new Employee(employeeID, name, email, startDate, position);
    company.addNewEmployee(newEmployee);
    swal("Successful Add!", "The employee list has been update", "success");
    
    // Display Employee List after add new employee
    displayEmployeeList(company.employeeList);
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


        popUpForm("Update Employee Detail", true, 2);
        
    })
}

// FUCNTION - handle event "Update" button in modal form
document.getElementById("updateButton").addEventListener("click", () =>{

    // add new employee information
    let employeeID = document.getElementById("employeeID").value;
    let nameNewInfo = document.getElementById("name").value;
    let emailNewInfo = document.getElementById("email").value;
    let startDateNewInfor = document.getElementById("datepicker").value;
    let positionNewInfor = document.getElementById("position").value;

    let newEmpployeeInfo = new Employee(employeeID, nameNewInfo, emailNewInfo, startDateNewInfor, positionNewInfor);
    // update employee information.
    company.editEmployee(newEmpployeeInfo);

    swal("Successful Update New Employee Detail!", "The employee list has been update", "success");
    // display new employee list after edit employee detail.
    displayEmployeeList(company.employeeList);
})
