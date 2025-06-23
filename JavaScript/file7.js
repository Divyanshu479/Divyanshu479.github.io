// callback function:-
const f1 = ()=>{
    console.log("Hello");
};
const main = (x)=>{
    x()
}
main(f1);