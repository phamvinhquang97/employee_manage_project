
class Validation {
    //Field
    constructor(){
        this.isValid = true;
    }

    // Method
    
    // Check if the user do not enter the value
    isNotEmpty(inputVal,spanID, message){
        if(inputVal === ""){
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = message;
            return true;
    }


    // Check if the user input inValid value is empty
    isValidInput(inputVal, spanID, message){
        var pattern = new RegExp(

            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +

            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +

            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"

        );
        // if the user input is valid
        if(pattern.test(inputVal)){
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = message;
            return true;
        }
        // if the user input is not valid  
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;

    }
    // Check the validation email 
    isEmailInputValid(inputVal, spanID, message) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // if user input correct mail format
        if(inputVal.match(mailformat))
        {
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = message;
            return true;
        }
        // if user input incorrect mail format
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false;
    }
    // Check user position Selection
    isPositionSelected(selectID, spanID, message){
        // if the user select position
        if(document.getElementById(selectID).selectedIndex !== 0)
        {
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = message;
            return true;
        }
        // if the user do not select any position.
        document.getElementById(spanID).style.display = "block";
        document.getElementById(spanID).innerHTML = message;
        return false;
    }


     

}