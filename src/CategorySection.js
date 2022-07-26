
function CategorySection()
{
    const list = ["Desktops","Laptops","Smartphones","Tablets","Mice","Keyboards","Monitors","Speakers","Headphones","Earphones"];

    const categoryList = [
        {
            img:  "desktop.png",
            name: "Desktops",
        },
        {
            img:  "laptop.png",
            name: "Laptops",
        },
        {
            img:  "smartphone.png",
            name: "Smartphones",
        },
        {
            img:  "tablet.png",
            name: "Tablets",
        },
        {
            img:  "mouse.png",
            name: "Mice",
        },
        {
            img:  "keyboard.png",
            name: "Keyboards",
        },
        {
            img:  "monitor.png",
            name: "Monitors",
        },
        {
            img:  "speaker.png",
            name: "Speakers",
        },
        {
            img:  "headphone.png",
            name: "Headphones",
        },
        {
            img:  "earphone.png",
            name: "Earphones",
        },
        {
            img:  "camera.png",
            name: "Cameras",
        },
        {
            img:  "controller.png",
            name: "Game Controllers",
        },
        {
            img:  "console.png",
            name: "Game Consoles",
        },
        {
            img:  "vr.png",
            name: "Virtual Reality",
        },
        {
            img:  "storage.png",
            name: "Storage Devices",
        },


    ];

    return (
        <section className="category-section-container">
            <h1 className="category-section-title">Popular Categories</h1>
            <div className="category-group">
                {
                    categoryList.map((category,index)=>
                        <div className="category-container" key={index}>
                            <img className="category-image" src={require('./img/categories/'+category.img)} alt="icon" />
                            <h1 className="category-name">{category.name}</h1>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default CategorySection;