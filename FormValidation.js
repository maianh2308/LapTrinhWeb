// Đối tượng Validator
function Validator(options) {
    function validate(inputElement, rule){
            var errorMessage = rule.test(inputElement.value);
            var errorElement =inputElement.parentElement.querySelector('.form-message');
            if(errorMessage){
                errorElement.innerText = errorMessage;
                inputElement.parentElement.classList.add('invalid');
            }else {
                errorElement.innerText = ' ';
                inputElement.parentElement.classList.remove('invalid');
            }
    }
    var formElement = document.querySelector(options.form);

    if(formElement) {

        options.rules.forEach(function(rule){

           var inputElement = formElement.querySelector(rule.selector);

           if(inputElement) {
               // Xử ;ý trường hợp blur khỏi input
               inputElement.onblur = function() {
                   validate(inputElement, rule);
                }
                //Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElement =inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText = ' ';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
}

// Định nghĩa rules
// Nguyên tắc của các rules
//1. Khi có lỗi=> trả ra messae lỗi
Validator.isRequire = function (selector) {
    return {
        selector:selector,
        test: function(value){
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function (selector){
    return {
        selector:selector,
        test : function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : ' Vui lòng nhập email';
        }
    };
}
Validator.isConfirmed = function (selector, getConfirmValue) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : 'Giá trị nhập vào không chính xác';
        }
    }
}