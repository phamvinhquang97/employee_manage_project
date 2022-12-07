// Employee Object
/* 
Developer: Pham Vinh Quang
Date: 16/11/2022

*/
class Employee{
    // constructors
    constructor(employeeID, name, email, startingDate, phone, position){
        this.employeeID = employeeID;
        this.name = name;
        this.email = email;
        // this.password = password;
        this.startingDate = startingDate;
        this.position = position;
        this.phone = phone;
        this.compareArray = [this.employeeID, this.name, this.email, this.startingDate, this.phone, this.position];

        
        
    }

}