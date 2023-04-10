const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[data-lengthNumber]");


const passwordDisplay = document.querySelector("[data-passwordDisplay]");  
const copyBtn = document.querySelector("[data-copy]");  
const copyMsg  = document.querySelector("[data-copyMsg]");  
const  uppercaseCheck = document.querySelector("#uppercase");  
const  lowercaseCheck = document.querySelector("#lowercase");  
const numbersCheck = document.querySelector("#numbers");  
const symbolsCheck = document.querySelector("#symbols");  
const indicator = document.querySelector("[data-indicator]");  
const generateBtn = document.querySelector(".generateButton");  
const  allCheckBox = document.querySelectorAll("input[type=checkbox]");  
// const symbols= '~`!@#$%^&*()_-+{[}]|:;"<,>.?/';
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password="";
let passwordLength=10;
let CheckCount=0;
handleSlider();

// set strength circle color is grey
setIndicator("#ccc");


// pass length ko UI pr reflect krwata hai
// set pass length
function handleSlider(){
    // slider ki value (passlength) pr rakhdete hai
     inputSlider.value = passwordLength;
//  defalut set 10 at the start the window
     lengthDisplay.innerText = passwordLength;


     const min= inputSlider.min;
     const max= inputSlider.max;
inputSlider.style.backgroundSize= ((passwordLength - min) *100/(max-min))+ "% 100%";
}

//  set shadow and color of strength
// input para wala color set krdeta hai
    function setIndicator(color){
    indicator.style.backgroundColor = color;
     indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
    
}



// Min or max ki range mein ek Random int find krke deta hai
function getRndInteger(min, max){
    // floor return only int value 
   return Math.floor(Math.random() * (max - min)) + min;

}

function generateRandomNumber(){
    return getRndInteger(0,9);

} 

function generateLowerCase(){
    // int to string
   return String.fromCharCode (getRndInteger(97, 123));
}
function generateUpperCase(){
    // int to string
   return String.fromCharCode (getRndInteger(65, 91));
}

function generateSymbol(){
    const randNum = getRndInteger(0, symbols.length);
    // Char at that index
 return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8){
    setIndicator("#0f0");
}
else if((hasLower || hasUpper) && 
(hasNum || hasSym)
 && passwordLength >= 6)
{
    setIndicator("#ff0");

}
else {
    setIndicator("#f00");
}
}

// async for used the await keyboard
async function copyContent(){
try{
    // This method return promises [if the promise compelete than display the copied text]
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="copied";
}
catch(e){
copyMsg.innerText="Failed";
}

// Span tag text will be visible
copyMsg.classList.add("active");

setTimeout(() => {
    copyMsg.classList.remove("active");
},2000); 
}
function shufflePassword(array){
    // Fisher Yates Method[Used for shuffle the digits in password]
for(let i = array.length - 1; i > 0; i--){
    // Find a random J using function
    const j=Math.floor (Math.random() * (i+1));
// Swap number at i index and j index
    const temp = array[i];
    array[i]=array[j];
    array[j]=temp;
}
let str ="";
array.forEach((el) => (str += el));
return str;
}  


    
function handleCheckBoxChange(){
  CheckCount = 0;
 allCheckBox.forEach((checkbox) =>{
    if(checkbox.checked)
        CheckCount++;
    });

// Special Condition
if(passwordLength < CheckCount){
    passwordLength = CheckCount;
    handleSlider();
}
}

allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change', handleCheckBoxChange);
})



  

// FOR SLIDER values increase and decrease
inputSlider.addEventListener('input',(e) => {
passwordLength = e.target.value;
handleSlider();
})

copyBtn.addEventListener('click', () => {

    if(passwordDisplay.value)
    copyContent();
})

generateBtn.addEventListener('click', () =>{

// none of any checkBox Selected then return NULL
if(CheckCount == 0) 
return;

if(passwordLength < CheckCount){
    passwordLength = CheckCount;
    handleSlider();
}

//LET's  start the journey to find the new pass
// console.log("Haneesji");


// Remove old password
password="";

// if(uppercaseCheck.checked){
//     password += generateUpperCase();
// }

// if(lowercaseCheck.checked){
//     password += generateLowerCase();
// }

// if(numbersCheck.checked){
//     password += generateRandomNumber();
// }

// if(symbolsCheck.checked){
//     password += generateSymbol();
// }


let funArr = [];

if(uppercaseCheck.checked)
funArr.push(generateUpperCase);

if(lowercaseCheck.checked)
funArr.push(generateLowerCase);

if(numbersCheck.checked)
funArr.push(generateRandomNumber);

if(symbolsCheck.checked)
funArr.push(generateSymbol);

// Compulsory addition
for (let i=0; i<funArr.length; i++){
    password += funArr[i](); 
}
// console.log("haneesJi 1");

// remaning additon
for(let i=0; i<passwordLength-funArr.length; i++){
    let randIndex = getRndInteger(0, funArr.length);
    password += funArr[randIndex]();
     
}

// console.log("haneesJi 2");



// Shuffle the password
password = shufflePassword(Array.from(password));

// console.log("haneesJi 3");

// Show in UI
passwordDisplay.value = password;

console.log("haneesJi 3"); 

// Calculate strength
calcStrength();  

});

