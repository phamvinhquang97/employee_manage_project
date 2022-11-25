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

    // Find employee based on employeeID -> return location of employee in employeeList
    findIndexEmployeeInEmployeeList(employeeID){
        for(let index in this.employeeList){
            if(this.employeeList[index].employeeID === employeeID){
                return index;
                break;
            }
        }
    }

    // Find employee based on employeeID -> return location employee in employeeList
    findEmployeeBasedEmployeeID(employeeID){
        for(let index in this.employeeList){
            if(this.employeeList[index].employeeID === employeeID){
                return this.employeeList[index];
                break;
            }
        }
    }

    // Delete employee based on employeeID
    deleteEmployee(employeeID){
        let indexInEmployeeList = this.findIndexEmployeeInEmployeeList(employeeID);
        this.employeeList.splice(indexInEmployeeList, 1);
    }

    // Edit employee detail - Find index employee in employeeList -> edit detail
    editEmployee(employee){
        // find index of employee. 
        let indexInEmployeeList = this.findIndexEmployeeInEmployeeList(employee.employeeID);
        this.employeeList[indexInEmployeeList] = employee;
    }

    // Find employee based on employee name -> employeeList
    findEmployeeBasedOnName(searchName){
        let employeeListResult = new Company();
        // trim name string and make it uppercase
        searchName = searchName.trim().toUpperCase();

        // for ... of -> take the object in employeeList
        for(let employee of this.employeeList){
            let name = employee.name.trim().toUpperCase();
            
        
            if(name.search(searchName) !== -1){
                // return employeeList that was found
                employeeListResult.employeeList = [...employeeListResult.employeeList, employee];
            }
        }
        return employeeListResult;
    }

    // Sort employee list based on employeeID
    sortEmployeeList(type){
        if(type === 1){
            this.employeeList.sort((a,b) => {
                let x = a.employeeID.toLowerCase();
                let y = b.employeeID.toLowerCase();
                if(x>y)
                    return - 1;
                if(x<y)
                    return -1;

                return 0;
            })
        }
        else{
            this.employeeList.sort((a,b) => {
                let x = a.employeeID.toLowerCase();
                let y = b.employeeID.toLowerCase();
                if(x>y)
                    return -1;
                if(x<y)
                    return -1;
            })
        }

        
    }

    




}