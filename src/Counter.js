import React,{ useState}  from "react";
import increment from './images/icon-increment-quantity.svg'
import decrement from './images/icon-decrement-quantity.svg'
import Cart from './images/icon-add-to-cart.svg'
import { useSelector,useDispatch } from "react-redux";
import {stateChange} from "./slice"
// import from "react";
// var dispatchArray=[];
var DispatchId=[]
  console.log('expot couter')

function Counter(prop){
    // console.log('counter runs')
    var evetDispatch=useDispatch();
    var counterResetSelector = useSelector((state)=> state.reset)
    // console.log(prop.cuurentdata.id)
    var [showCounter,showCounterfn]=useState(false);
    var [add,addfn]=useState(0);
    var setdecrementfn=(e)=>{ 
        var getId=e.target.closest('.counterActive').getAttribute('id');
        var getname=e.target.closest('.counterActive').getAttribute('name');
        var getAmt=e.target.closest('.counterActive').getAttribute('amount');
        addfn((prev)=>{
            if(prev == 0){
                
                return 0
            }
            else{
                createJson(getId,getname,prev-1,getAmt);
                return (prev- 1)
            }
            
        })
        
     }
    var setAddIncrementfn=(e)=>{
        var getId=e.target.closest('.counterActive').getAttribute('id');
        var getname=e.target.closest('.counterActive').getAttribute('name');
        var getAmt=e.target.closest('.counterActive').getAttribute('amount');
        const closestElement = e.target.closest('.negativeClassAdded');
        addfn((prev)=>{
            if( e.target.closest('.negativeClassAdded') != null && closestElement.classList.contains('negativeClassAdded')){
                console.log('d');
                closestElement.classList.remove('negativeClassAdded')
                createJson(getId,getname,1,getAmt);
                return 1
            }
            else{
                createJson(getId,getname,prev+1,getAmt);
                return prev+1
            }
           
        });
    }
        
     function createJson(id,name,add,amount){
        
        var formjson={
            id,name,count:add,amount
        }
   
        
        evetDispatch(stateChange({formjson}))

     }
return(
    <>
    <div className="counterParent" onClick={()=>showCounterfn(true)}>
    { showCounter &&  <div className="counterActive" amount={prop.cuurentdata.amount} name={prop.cuurentdata.name} id={prop.cuurentdata.id}>
         <span className="addorless" onClick={setdecrementfn} >
            <img src={decrement} alt="" />
            </span>
            <span className="count">{add}</span>
         <span className="addorless" onClick={setAddIncrementfn}>
            <img src={increment} alt="" />
            </span>
        </div>}
            { !showCounter && 
               <div className="flex">
                 <span className="cartImgParnet" >
                   <img src={Cart} alt=''/>
                </span>
                <div className="font-14 addTocartStyles">Add to Cart</div>
               </div>}
    </div>
    
    </>
)

}
export default Counter