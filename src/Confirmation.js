import React, { useState } from "react";
// import ReactDom from "react-dom";
import ReactDOM from "react-dom";
import success from './images/icon-order-confirmed.svg';
import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import { useDeferredValue } from "react";
import { resetElement } from "./slice";


function  Confirmation({isopen,ref,totalCount,showDialogFn}){
    console.log('showDialogFn...',showDialogFn);
    console.log('isopen..',isopen);
    console.log('totalCount...',totalCount)

    var [dialodStatus,dialodStatusfn]=useState(isopen) ;
    var resetDispatch=useDispatch()
    var reset=()=>{
        dialodStatusfn(false);
        ref.current.close();
        showDialogFn(false)
        console.log(JSON.parse(sessionStorage.getItem('foodData')))
        resetDispatch(resetElement({type:'reset'}))
        window.location.reload()
        
        

    }
    var getOrderedItem=useSelector((state)=>state.recepie);
    return ReactDOM.createPortal(
        <>
        <dialog ref={ref} open={dialodStatus} className="result-modal">
           <div className="success_img"><img src={success} alt="img"/></div>
            <h2 className="confirmedTitle">Order Confirmed</h2>
            <span className="f14 happyTxt">We hope you enjoyed your food</span>
            <div className="confirmationDialog">
            {getOrderedItem.map((value)=>{
                return(

                <div className="hpad borderbotttom relative" id={value.id}>
                                        <div className="cart_ProductName vspad">{value.name}</div>
                                        <span className="hpad f13 dessertcount primaryRedColor">{value.count} x </span>
                                        <span className="f11 "> @ </span><span className="f11">{value.amount}</span>
                                        <span className="hpad f11 bmar thislisttotal">${value.count * parseFloat(value.amount.replace('$', ''))}</span>
                                       
                                     </div>
                )
                
            })}
            <div className="OrderTotalConfirmation">
                <div className="ordertotaltxt">Order Total</div>
                <div className="ordertotalcount"> ${totalCount}</div>
            </div>
           
            
            </div>
            <div className="textCenter btnParent">
                         <button className="primaryRedBg  confirmatioBtnStyles" onClick={reset}>Start New</button>
                     </div>
        </dialog>
        </>
        ,document.getElementById('root')
    )
}
export default Confirmation