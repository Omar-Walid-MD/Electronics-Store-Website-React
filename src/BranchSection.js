
function BranchSection()
{
    const branchPointers = [
        {
            top: 200,
            left: 300,

            name: "North Branch",
            desc: "This is the north branch",

        },
        {
            top: 150,
            left: 30,

            name: "North Branch",
            desc: "This is the north branch",

        },
    ];

    const branchName = document.querySelector(".branch-name");

    function displayBranchInfo(e)
    {
        return;
    }

    return (
        <section className="branches-section-container">
            <h1 className="branches-section-title">Our Branches</h1>
            <div className="branches-container">
                <div className="branches-info-container">
                    <h1 className="branch-name">This Branch</h1>
                    <p className="branch-description">This branch should be near your home.</p>
                </div>
                <div className="branches-map-container">
                    <img className="branches-map-image" src={require("./img/branchesMap.png")} alt="map"/>
                    <div className="branches-map-pointer-group">
                        {
                            branchPointers.map((pointer,index)=>(
                                <div className="branches-map-pointer" style={{top: pointer.top + "px", left: pointer.left + "px"}} onClick={displayBranchInfo} key={index}></div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </section>

    )
}

export default BranchSection;