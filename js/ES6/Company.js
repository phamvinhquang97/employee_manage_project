class Company{
    constructor(){
        // Field
        this.employeeList = new Array();
    }

    // method

    // add new employee to employeeList
    addNewEmployee(newEmployee){
        // this.employeeList = push(newEmployee) -- ES5
        this.employeeList = [...this.employeeList, newEmployee]; // -- ES6

    }

    // Find employee based on employeeID -> return location employee in employeeList
    findEmployeeInEmployeeList(employeeID){
        for(let index in this.employeeList){
            if(this.employeeList[index].employeeID === employeeID){
                return this.employeeList[index];
                break;
            }
        }
    }

    




}