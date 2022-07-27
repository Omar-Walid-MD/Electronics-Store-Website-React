import { useEffect, useRef, useState } from "react";

function BranchSection()
{
    const branchPointers = [
        {
            top: 100,
            left: 335,

            name: "Main Branch",
            desc: "This is our first and main branch with the largest building. It's located next to the city's university.",
            img: "branch-1.png",

        },
        {
            top: 320,
            left: 425,

            name: "East Branch",
            desc: "This branch is located on Street 49. As our second grand opening, this branch is as likely as the main branch to have the variety and quailty of products our customers desire.",
            img: "branch-2.png",

        },
        {
            top: 153,
            left: 127,

            name: "West Branch",
            desc: "You can find this branch at the intersection of the King Road and Green Lane.",
            img: "branch-3.png",

        },
        {
            top: 394,
            left: 195,

            name: "South Branch",
            desc: "This is the south branch, located at the northeast corner of the schools block. In this branch, you are likely to find our collection of smaller basic products.",
            img: "branch-4.png",

        },
    ];

    const [currentBranch,setCurrentBranch] = useState(branchPointers[0]);

    const pointerGroup = useRef(null);
    const infoContainer = useRef(null);

    function setPointerPositions()
    {
        for(let i = 0; i < pointerGroup.current.children.length; i++)
        {
            const element = pointerGroup.current.children[i];
            element.style.top = branchPointers[i].top + "px";
            element.style.left = branchPointers[i].left + "px";

            if(i===0)
            {
                element.querySelector(".branches-radio").checked = true;
            }
        }
    }
    function selectBranch(index)
    {
        setCurrentBranch(branchPointers[index]);
        console.log(infoContainer.current.getAttribute("key"));
        infoContainer.current.setAttribute("key",makeId(5));

        
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
        setPointerPositions();
    },[]);

    return (
        <section className="branches-section-container">
            <h1 className="branches-section-title">Our Branches</h1>
            <div className="branches-container">
                <div className="branches-info-container" ref={infoContainer} key={"true"}>
                    <h1 className="branch-name">{currentBranch.name}</h1>
                    {currentBranch!=null && <img className="branch-image" src={require("./img/branches/"+currentBranch.img)} />}
                    <p className="branch-desc">{currentBranch.desc}</p>
                </div>
                <div className="branches-map-container">
                    <img className="branches-map-image" src={require("./img/branches/city-map.png")} alt="map"/>
                    <div className="branches-map-pointer-group" ref={pointerGroup}>
                        {
                            branchPointers.map((pointer,index)=>(
                                
                                <label className="branches-map-pointer" key={index} htmlFor={"branch-" + index}>
                                    <input className="branches-radio" type="radio" name="branches" id={"branch-" + index} onClick={function(){selectBranch(index)}} />
                                    <img className="branches-map-pointer-image" src={require("./img/pointer.png")} />
                                </label>
                            ))
                        }
                    </div>
                </div>
            </div>

        </section>

    )
}

export default BranchSection;