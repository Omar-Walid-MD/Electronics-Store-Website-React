import { useEffect, useRef, useState} from "react";

function BranchSection({branchList})
{

    const [currentBranch,setCurrentBranch] = useState();

    const pointerGroup = useRef(null);
    const infoContainer = useRef(null);

    function pointerPosition(input,dimension)
    {
        let map = document.querySelector(".branches-map-image");
        if(map)
        { 
            let x = 0;
            if(dimension==="y")
            {
                x = parseInt(getComputedStyle(map).height.slice(0,-2));
            }
            else if(dimension==="x")
            {
                x = parseInt(getComputedStyle(map).width.slice(0,-2));
            }
            return input * x/100;
        }
        else
        {
            return 0;
        }
    }


    function selectBranch(index)
    {
        setCurrentBranch(branchList[index]);
        infoContainer.current.setAttribute("key",makeId(5));  
    }

    function makeId(length)
    {
        let result = "";
        let chars = "123456789";
        for (var i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * 9)];
        }
        return result;
    }

    useEffect(()=>{
        if(branchList)
        {
            setCurrentBranch(branchList[0]);
        }    
    },[branchList]);

    return (
        <section className="branches-section-container">
            <h1 className="branches-section-title">Our Branches</h1>
            <div className="branches-container">
                {
                    currentBranch &&
                    <div className="branches-info-container" ref={infoContainer} key={"true"}>
                        <h1 className="branch-name">{currentBranch.name}</h1>
                        {currentBranch!=null && <img className="branch-image" src={require("../../img/branches/"+currentBranch.img)} alt="branch" />}
                        <p className="branch-desc">{currentBranch.desc}</p>
                    </div>
                }
                <div className="branches-map-container">
                    <img className="branches-map-image" src={require("../../img/branches/city-map.png")} alt="map"/>
                    <div className="branches-map-pointer-group" ref={pointerGroup}>
                        {
                            branchList && branchList.map((pointer,index)=>(
                                
                                <label className="branches-map-pointer" key={index} htmlFor={"branch-" + index} style={{top: pointerPosition(pointer.y,"y") + "px", left: pointerPosition(pointer.x,"x") + "px"}}>
                                    <input className="branches-radio" type="radio" name="branches" id={"branch-" + index} onClick={function(){selectBranch(index)}} />
                                    <img className="branches-map-pointer-image" src={require("../../img/pointer.png")} alt="pointer" />
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