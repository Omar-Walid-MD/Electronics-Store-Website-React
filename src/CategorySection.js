import { Link } from "react-router-dom";

function CategorySection()
{
    const list = ["Desktops","Laptops","Smartphones","Tablets","Mice","Keyboards","Monitors","Speakers","Headphones","Earphones"];

    const categoryList = [
        {
            img:  "desktop.png",
            name: "Desktops",
            categCode: "desktop",
        },
        {
            img:  "laptop.png",
            name: "Laptops",
            categCode: "laptop",
        },
        {
            img:  "smartphone.png",
            name: "Smartphones",
            categCode: "smartphone",
        },
        {
            img:  "tablet.png",
            name: "Tablets",
            categCode: "tablet",
        },
        {
            img:  "mouse.png",
            name: "Mice",
            categCode: "mouse",
        },
        {
            img:  "keyboard.png",
            name: "Keyboards",
            categCode: "keyboard",
        },
        {
            img:  "monitor.png",
            name: "Monitors",
            categCode: "monitor",
        },
        {
            img:  "speaker.png",
            name: "Speakers",
            categCode: "speaker",
        },
        {
            img:  "headphone.png",
            name: "Headphones",
            categCode: "headphone",
        },
        {
            img:  "earphone.png",
            name: "Earphones",
            categCode: "earphone",
        },
        {
            img:  "camera.png",
            name: "Cameras",
            categCode: "camera",
        },
        {
            img:  "controller.png",
            name: "Game Controllers",
            categCode: "controller",
        },
        {
            img:  "console.png",
            name: "Game Consoles",
            categCode: "console",
        },
        {
            img:  "vr.png",
            name: "Virtual Reality",
            categCode: "vr",
        },
        {
            img:  "storage.png",
            name: "Storage Devices",
            categCode: "storage",
        },


    ];

    return (
        <section className="category-section-container">
            <h1 className="category-section-title">Popular Categories</h1>
            <div className="category-group">
                {
                    categoryList.map((category,index)=>
                        <Link to={"/shop"} state={{ category: category.categCode }} className="category-container" key={index}>
                            <img className="category-image" src={require('./img/categories/'+category.img)} alt="icon" />
                            <h1 className="category-name">{category.name}</h1>
                        </Link>
                    )
                }
            </div>
        </section>
    )
}

export default CategorySection;