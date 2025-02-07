import React from "react";
import { useState,useEffect } from "react";
import AddToCart from "./addtocart";
 import Counter from "./Counter";
 import { useSelector } from "react-redux";
function MenuComponent({resetid}){
    console.log('Men');
   
    var[recepieList,recepiefn]=useState(null);
   
     
    useEffect(()=>{ 
        
        console.log('fetch runs')
        fetch('/recepiedata.json').then((res)=>{ return res.json()})     
        .then((res)=>{
            console.log('wres...',res);
            recepiefn(res);
            sessionStorage.setItem('foodData',JSON.stringify(res))
            console.log('recepieList...',recepieList);
            sessionStorage.removeItem('cartList');
        })
        .catch((err)=>console.log(err))
    },[]);
   var removeCounter=(removeId)=>{
    const element = document.getElementById(removeId);
     const countElement = element.querySelector('.count');
     countElement.textContent=0;
     element.classList.add('negativeClassAdded')


    } 
    return (
      <>
        <div className="menuparent">
           <h1 className="HeadingDisplay">Desserts</h1>
           <div className="cardParent">
           {  recepieList && recepieList.items.length > 0 &&
            recepieList.items.map((val)=>{
                return(
                    
                        <card>
                        <div className="img-parent">
                            <div className="relative">
                            <img src={val.imge_data} alt=""/>
                            <Counter cuurentdata={val}   />
                            </div>
                            <div className="details">
                            <div className="typeStyles">{val.type}</div>
                            <div className="nameStyles">{val.name}</div>
                            </div>
                            
                        </div>
                        
                    </card>
                        
                )
            })
           }
           </div>
        </div>
        <AddToCart closeLi={removeCounter} />
        </>
    )
}
export default MenuComponent