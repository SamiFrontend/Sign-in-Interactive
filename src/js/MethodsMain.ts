export  *  from './index';


// all inputs 

export function validInput( parentInput : HTMLDivElement , InputHasValid : HTMLInputElement ) : void {

    let checkForNameInput : string = InputHasValid.name ;     

    let massege : string ; 

    switch(checkForNameInput){
        case 'email' : {
            massege = "Failure email !"
            break ;
        } 
        case 'password' : {
            massege = "Faliure password !";
        }
    }

    parentInput.appendChild(createTag(massege)); 
    parentInput.classList.add('valid-input'); 

}





// function cerate Tag of text 
function createTag(msg) : HTMLElement {
    let elm = document.createElement('small');

    elm.className = "error-msg size-5" ;

    elm.innerText = msg ; 

    return elm ;
}