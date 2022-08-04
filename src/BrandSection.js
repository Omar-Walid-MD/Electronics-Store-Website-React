import { Link } from "react-router-dom";

function BrandSection()
{
    const list = ["Desktops","Laptops","Smartphones","Tablets","Mice","Keyboards","Monitors","Speakers","Headphones","Earphones"];

    const brandList = [
        {
            name: "Buzz",
            brandCode: "buzz",
        },
        {
            name: "Maple",
            brandCode: "maple",
        },
        {
            name: "Chromax",
            brandCode: "chromax",
        },
        {
            name: "Hyper",
            brandCode: "hyper",
        },
        {
            name: "NuclAI",
            brandCode: "nuclai",
        },
        {
            name: "Mory",
            brandCode: "mory",
        },
        {
            name: "Opal",
            brandCode: "opal",
        },
        {
            name: "AURO",
            brandCode: "auro",
        },
        {
            name: "Hot-Key",
            brandCode: "hotkey",
        },
        {
            name: "Pixcel",
            brandCode: "pixcel",
        },

    ];

    return (
        <section className="brand-section-container">
            <h1 className="brand-section-title">Popular Brands</h1>
            <div className="brand-group">
                {
                    brandList.map((brand,index)=>
                    <Link to={"/shop"} state={{ brand: brand.brandCode }} className="brand-container" key={index}>
                        <img className="brand-image" src={require('./img/brands/'+brand.brandCode + "-logo-full.png")} alt="icon" />
                    </Link>
                    )
                }
            </div>
        </section>
    )
}

export default BrandSection;