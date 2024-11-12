function combine(a:number, b:number):number;
function combine(a:string, b:string):string;
function combine(a:string|number, b:string|number){
  if(typeof a==="string" && typeof b==="string"){
    return a + b;
  }else if(typeof a==="number" && typeof b==="number"){
    return a * b;
  }
  throw new Error("两个参数类型不一致");
}

const result = combine('a', 'b');
console.log(result);


function changeType(x:string):number;
function changeType(x:number):string;
function changeType(x:number|string):string|number{
  return typeof x==="string"?parseInt(x,10):x.toString();
}
changeType("123")

function createElement(tag:string):HTMLElement {
  return document.createElement(tag);
}