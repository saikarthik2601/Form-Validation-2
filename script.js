const form = document.getElementById("form"); 
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname"); 
const email = document.getElementById("email"); 
const password = document.getElementById("password"); 
const confirmPassword = document.getElementById("confirmPassword"); 

form.addEventListener("submit", function (event){ 
    event.preventDefault(); 

    const isRequiredValid = checkRequired([firstname,lastname,email,password,confirmPassword]); 

    let isFormValid = isRequiredValid; 

    if (isRequiredValid) { 
        const isFirstName = checkLength(firstname, 3,15); 
        const isLastName = checkLength(lastname, 3,15); 
        const isemail = checkEmail(email);
        const isPasswordValid = checkLength(password, 6,25); 
        const isPasswordMatch = checkPasswordMatch(password, confirmPassword); 

        isFormValid = isFirstName && isLastName && isemail && isPasswordValid && isPasswordMatch; 
    }

    if (isFormValid) { 
        alert("Registration Successful!"); 
        form.reset(); 
        document.querySelectorAll(".group").forEach((group) => { 
            group.className = "group";
        });
    }

}); 

function checkPasswordMatch(input_1,input_2) { 
    if (input_1.value !== input_2.value) { 
        showError(input_2, "Password does not Match..!");
        return alert("Password Does Not Match..!"); 
    }
    return true;
}

function checkEmail(email) { 
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (emailReg.test(email.value.trim())) { 
        showSuccess(email); 
        return true; 
    } else { 
        showError(email, "Email is not Valid..!");
        return alert("You have missed something in email..!");
    }
}

function checkLength(input, min, max) { 
    if (input.value.length < min) { 
        showError (input, `${formatField(input)} must be atleast ${min} characters.`);
        return false; 
    } else if (input.value.length > max) { 
        showError (input, `${formatField(input)} must be atleast ${max} character`);
        return false;
    } else { 
        showSuccess(input); 
        return true;
    }
}

function checkRequired(inputArray) { 
    let isValid = true; 

    inputArray.forEach((input) => {
        if (input.value.trim() === "") { 
            showError(input, `${formatField(input)} is required`);
            isValid = false;
        } else { 
            showSuccess(input);
        }
    }); 
    return isValid;
}

function formatField(input) { 
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) { 
    const formGroup = input.parentElement; 
    const small = formGroup.querySelector("small");

    formGroup.className = "group error";  
    small.innerText = message;
} 

function showSuccess(input) { 
    const formGroup = input.parentElement; 
    formGroup.className = "group success";
}

