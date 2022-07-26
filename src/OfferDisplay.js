import offerTemp from "./img/offerTemplate.png";
import rightArrow from "./img/arrow-right.png";
import leftArrow from "./img/arrow-left.png";
import { useEffect, useState, useRef } from 'react';


function OfferDisplay()
{
    const offerList = [
        {
            img: offerTemp,
            desc: "This is our first offer", 
        },
        {
            img: offerTemp,
            desc: "This is our second offer", 
        },
        {
            img: offerTemp,
            desc: "This is our third offer", 
        },
        {
            img: offerTemp,
            desc: "This is our fourth offer", 
        },
        {
            img: offerTemp,
            desc: "This is our fifth offer", 
        },
        // {
        //     img: offerTemp,
        //     desc: "This is our sixth offer", 
        // },
        // {
        //     img: offerTemp,
        //     desc: "This is our seventh offer", 
        // },
        // {
        //     img: offerTemp,
        //     desc: "This is our eighth offer", 
        // },
    ];


    let maxCount = offerList.length;
    let first =  1 - Math.ceil(maxCount/2)
    let counter = first;
    let offset = 0;

    let offers = null;
    let size = 0;
    let margin = "";
    let index  = counter + Math.ceil(maxCount/2) - 1;

    if(maxCount%2==0)
    {
        offset = 0.5
    }

    const offerGroup = useRef(null);
    const gotoGroup = useRef(null);
    
    function slideOnMount()
    {
        if(offerGroup.current!=null)
        {
            offers = offerGroup.current.children;
            size = offers[0].clientWidth;
            margin = parseInt(getComputedStyle(offers[0]).margin.slice(0,-2));
        }
        offerGroup.current.style.transform = "translateX(" + (-(size+margin*2)*first + offset*(size+margin*2)) + "px)";
        gotoGroup.current.querySelectorAll(".goto-offer-radio")[index].checked = true;
    }
    
    function slide(change)
    {

        if(index==0 && change==-1)
        {
            counter = first + maxCount;
        }
        if(index==first+maxCount+1 && change==1)
        {
            counter = first - 1;
        }
        counter+=change;
        offerGroup.current.style.transition = "transform 0.4s ease-in-out";
        offerGroup.current.style.transform = "translateX(" + (-(size+margin*2)*counter + offset*(size+margin*2)) + "px)";
        index  = counter + Math.ceil(maxCount/2) - 1;

        gotoGroup.current.querySelectorAll(".goto-offer-radio")[index].checked = true;
    }

    function slideTo(i)
    {
        counter = i - Math.ceil(maxCount/2) + 1;
        offerGroup.current.style.transition = "transform 0.4s ease-in-out";
        offerGroup.current.style.transform = "translateX(" + (-(size+margin*2)*counter + offset*(size+margin*2)) + "px)";
        index  = counter + Math.ceil(maxCount/2) - 1;
    }


    function makeId(length) {
        let result = "";
        let chars = "123456789";
        for (var i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * 9)];
        }
        return result;
      }

    useEffect(()=>{
        slideOnMount();
    },[])

    return (
        <section className="offer-section-container">
            <h1 className="offer-section-title">Newest Offers!</h1>
            
            <div className="offers-group-container">
                
                <div className="offers-group" ref={offerGroup}>
                    {
                        offerList.map((offer)=>
                        <div className="offer-panel-container" key={makeId(5)}>
                            <img className="offer-image" src={offer.img}/>
                            <div className="offer-desc">{offer.desc}</div>
                        </div>
                        )
                    }
                </div>

                <div className="offer-buttons-container">
                    <div className="offer-button" onClick={function(){slide(-1)}}>
                        <div className="offer-button-circle">
                            <img className="offer-button-icon" src={leftArrow} />
                        </div>
                        <div className="offer-button-shadow" end="left"></div>
                    </div>
                    <div className="offer-button" onClick={function(){slide(1)}}>
                        <div className="offer-button-circle">
                            <img className="offer-button-icon" src={rightArrow} />
                        </div>
                        <div className="offer-button-shadow" end="right"></div>
                    </div>
                </div>

                <div className="goto-offer-group" ref={gotoGroup}>
                    {
                        offerList.map((offer,index)=>
                            <label htmlFor={"offer-"+index} key={index}>
                                <div className="goto-offer-container" key={makeId(5)}>
                                    <input className="goto-offer-radio" type="radio" name="offer-goto" id={"offer-"+index} onClick={function(){slideTo(index)}}/>
                                    <div className="goto-offer-box"></div>
                                </div>
                            </label>
                        
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default OfferDisplay;