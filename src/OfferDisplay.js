import offerTemp from "./img/offerTemplate.png";
import rightArrow from "./img/arrow-right.png";
import leftArrow from "./img/arrow-left.png";
import { useEffect, useState, useRef } from 'react';


function OfferDisplay()
{
    const offerArray = [
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
        {
            img: offerTemp,
            desc: "This is our sixth offer", 
        },
        {
            img: offerTemp,
            desc: "This is our seventh offer", 
        },
        {
            img: offerTemp,
            desc: "This is our eighth offer", 
        },
    ];

    const [offerList,setOfferList] = useState([offerArray[offerArray.length-1],...offerArray,offerArray[0]]);

    //Variables

    let maxCount = offerList.length;
    let first =  1 - Math.ceil(maxCount/2) + 1
    let counter = first;
    let offset = 0;

    let offers = null;
    let size = 0;
    let margin = "";
    let index  = counter + Math.ceil(maxCount/2) - 1;

    let transitioning = false;

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
        gotoGroup.current.querySelectorAll(".goto-offer-radio")[index-1].checked = true;
    }
    
    function slide(change)
    {
        if(!transitioning)
        {
            transitioning = true;
            counter+=change;
            offerGroup.current.style.transition = "transform 0.4s ease-in-out";
            offerGroup.current.style.transform = "translateX(" + (-(size+margin*2)*counter + offset*(size+margin*2)) + "px)";

            index  = counter + Math.ceil(maxCount/2) - 1;
            console.log(index);

            if(index>0&&index<maxCount-1)
            {
                gotoGroup.current.querySelectorAll(".goto-offer-radio")[index-1].checked = true;
            }
            else if(index===maxCount-1)
            {
                gotoGroup.current.querySelectorAll(".goto-offer-radio")[0].checked = true;
            }
            else if(index===0)
            {
                gotoGroup.current.querySelectorAll(".goto-offer-radio")[maxCount+2-Math.ceil(maxCount/2)].checked = true;
            }

        }
        
    }

    function slideLoop()
    {
        if(index===maxCount-1)
        {

            counter=first;
            index  = counter + Math.ceil(maxCount/2) - 1;

            offerGroup.current.style.transition = "none";
            offerGroup.current.style.transform = "translateX(" + (-(size+margin*2)*counter + offset*(size+margin*2)) + "px)";
        }
        else if(index===0)
        {
            counter = maxCount - Math.ceil(maxCount/2) - 1;
            index  = counter + Math.ceil(maxCount/2) - 1;

            offerGroup.current.style.transition = "none";
            offerGroup.current.style.transform = "translateX(" + (-(size+margin*2)*counter + offset*(size+margin*2)) + "px)";

        }
        transitioning = false;
        offerGroup.current.style.transition = "none";
        
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
                
                <div className="offers-group" ref={offerGroup} onTransitionEnd={slideLoop}>
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
                        offerArray.map((offer,index)=>
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