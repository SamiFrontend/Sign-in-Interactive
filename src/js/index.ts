import * as Moduling from './MethodsMain';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// configration about scroll Trigger 
gsap.registerPlugin(ScrollTrigger);


// shortcut $ using same jQuery 
let $ = elm => document.querySelector(elm);
// more elements 
let $$ = elm => document.querySelectorAll(elm);


const DOM = {
    // content Form 
    contentForm: '#contentForm',
    // content Face 
    contentFace: '#contentFace',
    // Elements inside form 
    email: '#email',
    password: "#password",
    showPass: "#iconPassword",
    signIn: "#signIn",
    // face , 
    eyes: '.eye',
    browns: '.brown',
    mouth: '.mouth',
    text: '#para-welcome',

    // greeting 
    greet: '.gretting'
}




class Cycle {
    
    public MainContainer ;
    public Eyes : NodeListOf<HTMLSpanElement> ;

    constructor(){
        this.Eyes = $$(DOM.eyes) ;
        this.MainContainer = document.body ;
    }
    
    public callTrackEye() : void {
        this.MainContainer.addEventListener('mousemove' , eyeball ); 
    }

    public removeTrackEye() :void {
        this.MainContainer.removeEventListener('mousemove', eyeball);
    }


    controlClass(element  , nameClass : string  , value : boolean ) : void {
        for(let elm of element){
            if(!value){
                elm.classList.remove(nameClass); 
            }else{
                elm.classList.add(nameClass);
            }
        }
    }
}




// MainClass Cycle 
const Main = new Cycle()

// all Element usign in DOM 



// btn show password 
$(DOM.showPass).addEventListener('click', function (): void {

    this.classList.toggle('active');

    if (this.classList.contains('active')) {
        // dontLook 
        dontLook();
        // change Type password 
        $(DOM.password).type = "text";
    } else {
        Main.controlClass( $$(DOM.eyes) , 'dontLook' , false )
        $(DOM.password).type = "password";
        Main.callTrackEye() ;
    }
})



// main Method all Proccess the program here 
const btnSign: HTMLButtonElement = $(DOM.signIn);





// Main Function Proccesing all Data Here 
function proccessData(): void {

    'use strict';
    // make array of input in form 
    const Inputs: Array<HTMLInputElement> = [$(DOM.email), $(DOM.password)];

    if (!checkForInputs(Inputs)){
        informationIsFalse();
    }else{
       informationIsTrue();    
    }

}

// check for input values 
function checkForInputs(InputCheck) {

    for (let valid of InputCheck) {

        // parent Input save in array 
        let parentValid = (valid.name === "password") ?
            (valid.parentElement.parentNode as HTMLDivElement) :
            (valid.parentElement as HTMLDivElement);

        if (valid.value) {
            parentValid.classList.remove('valid-input')
            parentValid.lastChild.remove();
            if (valid.name === "password") break;
        }

        if ((parentValid as HTMLDivElement).classList.contains('valid-input')) {
            return false;
        };

        if (!valid.value) {
            Moduling.validInput(parentValid, valid);
            if (valid.name === "password") return false;
        }
    }


    return true;
}




btnSign.addEventListener('click', proccessData);









// Func Animation 


/*   ANIMATION EYES   */

Main.callTrackEye() ; 

function eyeball(event){

    let Eyes: NodeList = $$(DOM.eyes);

    Eyes.forEach(function (element) {
        // x & y are variables and x represents the x coordinate of the mouse and y represents the coordinate of the mouse.
        let eye = (element as any);

        let x: number = eye.getBoundingClientRect().left + eye.clientWidth / 2;
        let y: number = eye.getBoundingClientRect().top + eye.clientHeight / 2;
        let radian: number = Math.atan2(event.pageX - x, event.pageY - y);
        //   rot is a variable (short for rotate)
        let rot: number = radian * (180 / Math.PI) * -1 + 270;

        eye.style.transform = "rotate(" + rot + "deg)";
    });
}



function informationIsTrue() {

    falseTimer.timeScale(3)
    falseTimer.reverse();

    if($(DOM.eyes).classList.contains('dontLook')){
        Main.controlClass($$(DOM.eyes), 'dontLook' , false );
    }

    if(!$('body').addEventListener("mousemove", eyeball)){
        $('body').addEventListener("mousemove", eyeball)
    }

    const success = gsap.timeline({ defaults: { duration: 1 } });


    success.to($(DOM.contentFace), {
        backgroundColor: '#49BC92',
    })
        .to(DOM.text, {
            color: "#e5e5e5"
        }, "-=400")
        .to(DOM.contentForm, {
            x: -676,
            ease: 'bounce',
            duration: 2
        })
        .fromTo($$('.gretting .content-text > *'), {
            opacity: 0,
            y: 230,
        },
            {
                visibility: "visible",
                y: 0,
                scale: 1,
                opacity: 1,
                stagger: .3


            }, "-=1")


}


const falseTimer = gsap.timeline({ defaults: { duration: 1 } });


function informationIsFalse() {

    falseTimer.to(DOM.contentFace, {
        backgroundColor: "#BC495C"
    })
        .to($$(`${DOM.browns} , ${DOM.mouth}`), {
            rotationX: 180,
        }, '-=1.3')
        .to(DOM.text, {
            color: "#e5e5e5"
        }, "-=1")

}


function dontLook() {

    Main.removeTrackEye();

    Main.controlClass($$(DOM.eyes) , 'dontLook' , true );

}



