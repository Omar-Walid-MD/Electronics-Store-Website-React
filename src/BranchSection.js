import { useEffect, useRef, useState } from "react";

function BranchSection()
{
    const branchPointers = [
        {
            top: 60,
            left: 300,

            name: "North Branch",
            desc: "This is the north branch",

        },
        {
            top: 230,
            left: 450,

            name: "East Branch",
            desc: "This is the east branch",

        },
        {
            top: 290,
            left: 80,

            name: "West Branch",
            desc: "This is the west branch",

        },
        {
            top: 470,
            left: 200,

            name: "South Branch",
            desc: "This is the south branch",

        },
    ];

    const [currentBranch,setCurrentBranch] = useState(branchPointers[0]);

    const pointerGroup = useRef(null);

    function setPointerPositions()
    {
        for(let i = 0; i < pointerGroup.current.children.length; i++)
        {
            const element = pointerGroup.current.children[i];
            element.style.top = branchPointers[i].top + "px";
            element.style.left = branchPointers[i].left + "px";
        }
    }
    function selectBranch(index)
    {
        setCurrentBranch(branchPointers[index]);
    }

    useEffect(()=>{
        setPointerPositions();
    },[]);

    return (
        <section className="branches-section-container">
            <h1 className="branches-section-title">Our Branches</h1>
            <div className="branches-container">
                <div className="branches-info-container">
                    <h1 className="branch-name">{currentBranch.name}</h1>
                    <p className="branch-description">{currentBranch.desc}</p>
                </div>
                <div className="branches-map-container">
                    <img className="branches-map-image" src={require("./img/branchesMap.png")} alt="map"/>
                    <div className="branches-map-pointer-group" ref={pointerGroup}>
                        {
                            branchPointers.map((pointer,index)=>(
                                
                                <label className="branches-map-pointer" onClick={function(){selectBranch(index)}} key={index} htmlFor={"branch-" + index}>
                                    <input className="branches-radio" type="radio" name="branches" id={"branch-" + index} />
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