// Employee Object
/* 
Developer: Pham Vinh Quang
Date: 16/11/2022

*/
class Employee{
    // constructors
    constructor(employeeID, name, email, startingDate, position){
        this.employeeID = employeeID;
        this.name = name;
        this.email = email;
        // this.password = password;
        this.startingDate = startingDate;
        this.position = position;
        this.compareArray = [this.employeeID, this.name, this.email, this.startingDate, this.position];

    }
}