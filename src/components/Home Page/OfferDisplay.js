import offerTemp from "../../img/offerTemplate.png";
import rightArrow from "../../img/arrow-right.png";
import leftArrow from "../../img/arrow-left.png";
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

    const offerList = [offerArray[offerArray.length-1],...offerArray,offerArray[0]];

    //Variables
    
    let maxCount = offerList.length;
    const first = useRef(1 - Math.ceil(maxCount/2) + 1);
    
    const [counter,setCounter] = useState(first.current);
    const [transition,setTransition] = useState("none");
    
    let offers = null;
    const size = useRef(0);
    const margin = useRef("");
    let index  = counter + Math.ceil(maxCount/2) - 1;
    
    
    let offset = 0;
    if(maxCount%2==0)
    {
        offset = 0.5
    }

    const transitioning = useRef(false);
    
    const offerGroup = useRef(null);
    const gotoGroup = useRef(null);
    
    function slideOnMount()
    {
        if(offerGroup.current!=null)
        {
            offers = offerGroup.current.children;
            size.current = offers[0].clientWidth;
            margin.current = parseInt(getComputedStyle(offers[0]).margin.slice(0,-2));

        }

        offerGroup.current.style.transform = "translateX(" + (-(size.current+margin.current*2)*first + offset*(size.current+margin.current*2)) + "px)";
        


        
    }

    function updateCounter(change)
    {
        console.log(transitioning.current);
        if(!transitioning.current)
        {
            setTransition("transform 0.4s ease-in-out");
            setCounter(x => x + change);
            transitioning.current = true;
        }
        

    }

    function setChecked(index,counter)
    {
        if(counter===first.current-1)
        {
            console.log("case 1");
            return index === maxCount - Math.ceil(maxCount/2) + 2;
        }
        else if(counter===maxCount - Math.ceil(maxCount/2))
        {
            console.log("case 2")
            return index===0;
        }
        else
        {
            console.log("case 3");
            return index === counter + Math.ceil(maxCount/2) - 2;
        }

    }


    
    // function slide(counter)
    // {
    //     console.log("Updated to: " + counter);
    //     if(!transitioning)
    //     {
    //         // if(index!==maxCount-1 && index!==0)
    //         transitioning = true;
    //         offerGroup.current.style.transition = "transform 0.4s ease-in-out";
    //         offerGroup.current.style.transform = "translateX(" + (-(size.current+margin.current*2)*counter + offset*(size.current+margin.current*2)) + "px)";

    //         index  = counter + Math.ceil(maxCount/2) - 1;
    //         // console.log(index);

            

    //     }
    //     // console.log(offerGroup.current.style.transform);
        
    // }

    function slideLoop()
    {
        if(index===maxCount-1)
        {
            console.log("Transition loop");
            setCounter(first.current);
            index  = counter + Math.ceil(maxCount/2) - 1;

            setTransition("none");
            offerGroup.current.style.transform = "translateX(" + (-(size.current+margin.current*2)*counter + offset*(size.current+margin.current*2)) + "px)";
        }
        else if(index===0)
        {
            console.log("Transition loop");
            setCounter(maxCount - Math.ceil(maxCount/2) - 1);
            index  = counter + Math.ceil(maxCount/2) - 1;

            setTransition("none");
            offerGroup.current.style.transform = "translateX(" + (-(size.current+margin.current*2)*counter + offset*(size.current+margin.current*2)) + "px)";

        }
        transitioning.current = false;
        //offerGroup.current.style.transition = "none";
        
    }

    function slideTo(i)
    {
        setCounter(i - Math.ceil(maxCount/2) + 2);
        offerGroup.current.style.transition = "transform 0.4s ease-in-out";
        offerGroup.current.style.transform = "translateX(" + (-(size.current+margin.current*2)*counter + offset*(size.current+margin.current*2)) + "px)";
        index  = counter + Math.ceil(maxCount/2);
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

    },[counter])

    return (
        <section className="offer-section-container">
            <h1 className="offer-section-title">Newest Offers!</h1>
            
            <div className="offers-group-container">
                
                <div className="offers-group" ref={offerGroup} onTransitionEnd={slideLoop}
                    style={{transform : "translateX(" + (-(size.current+margin.current*2)*counter + offset*(size.current+margin.current*2)) + "px)",
                            transition: transition}}>
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
                    <div className="offer-button" onClick={function(){updateCounter(-1)}}>
                        <div className="offer-button-circle">
                            <img className="offer-button-icon" src={leftArrow} />
                        </div>
                        <div className="offer-button-shadow" end="left"></div>
                    </div>
                    <div className="offer-button" onClick={function(){updateCounter(1)}}>
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
                                    <input className="goto-offer-radio" type="radio" name="offer-goto" id={"offer-"+index} checked={setChecked(index,counter)} onChange={function(){slideTo(index)}}/>
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