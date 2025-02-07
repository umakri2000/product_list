import React, { useEffect, useState } from "react";
import { useRef } from "react";
import noCart from './images/illustration-empty-cart.svg';
import close from './images/icon-remove-item.svg';
import tree from './images/icon-carbon-neutral.svg';
import { useDispatch, useSelector } from "react-redux";
import { removeElement } from "./slice";
import Confirmation from "./Confirmation";

var cartArr=[]
 function AddToCart({closeLi}){
   var dialog=useRef();
   var removeDispatch=useDispatch();
   var [showDialog,showDialogFn]=useState(false)
   var getRemovedLi=useSelector((state)=>state.recepie);
   var [isOpen,isOpenFn]=useState(false)
   var [cartLi,lifn]=useState([]);
   var resetSelector=useSelector((state)=>state.reset);
   console.log(resetSelector)
   useEffect(()=>{
      if(resetSelector.reset){
          console.log('resetSelector....',resetSelector)
          lifn([])
      }
          },[resetSelector])
   useEffect(()=>{
      if (JSON.stringify(cartLi) != JSON.stringify(getRemovedLi)) {

         lifn(getRemovedLi);
       }
     }, [getRemovedLi])

   var removeLi=(e)=>{
      var thiselement=e.target.closest('.borderbotttom ');
      var remveId=thiselement.getAttribute('id');
      console.log(remveId);
      removeDispatch(removeElement({remveId}));
      closeLi(remveId);
   }
   
   var valueAdd=0

   var Confrimationfn=()=>{
      showDialogFn(true);
      isOpenFn(true);
      
      // useRef
   }
   useEffect(()=>{
      if(dialog.current !=undefined){
         dialog.current.showModal();
      }
   },[showDialog])
    return (
     
        <div className="addtocartParnet">
          
           { cartLi!=undefined && cartLi.length==0  ?    (
           <>
            <h3 className="cartCount">Your Cart<span>(0)</span></h3>
            <div className="emptyCart">
             <img src={noCart} alt=''/>
               <div>Your added items will appear here</div>
            </div>
            </>
             ) : (
               <>
               <h3 className="cartCount">Your Cart<span>({cartLi.length})</span></h3>
               <div className="ListSection">
               
               {cartLi.map((value)=>{
               //   AddItemsCostFn()
                 valueAdd+=value.count * parseFloat(value.amount.replace('$', ''));
                 console.log(valueAdd)
                  
                  return(
                     <>
                     
                     <div className="hpad borderbotttom relative" id={value.id}>
                        <div className="cart_ProductName vspad">{value.name}</div>
                        <span className="hpad f13 dessertcount primaryRedColor">{value.count} x </span>
                        <span className="f11 "> @ </span><span className="f11">{value.amount}</span>
                        <span className="hpad f11 bmar">{value.count * parseFloat(value.amount.replace('$', ''))}</span>
                        <span className="absolute close-img" onClick={(e)=>removeLi(e)}><img src={close} alt="close"/>
                        
                           </span>
                     </div>
                     </>
                  )

               })}
                     <div className="TotalParent">
                        <span className="f14">Order Total</span>
                        <div className="order-countCost">{valueAdd}</div>
                     </div>
                     <div className="bmar textCenter">
                        <span ><img src={tree} alt="carbon"/><span className="f14">This is a <strong>carbon-neutral</strong> delivery</span></span>
                     </div>
                     <div className="textCenter btnParent">
                         <button className="primaryRedBg  confirmatioBtnStyles"  onClick={Confrimationfn}>Confirm Order</button>
                     </div>
                     { showDialog && <Confirmation ref={dialog} totalCount={valueAdd} showDialogFn = {showDialogFn}/>}
                     
               </div>
            </>
            )
            
           }
           
        </div>
    )
 }
 export default AddToCart