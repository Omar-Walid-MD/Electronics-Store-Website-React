import { Link } from "react-router-dom";

function BrandSection()
{
    const list = ["Desktops","Laptops","Smartphones","Tablets","Mice","Keyboards","Monitors","Speakers","Headphones","Earphones"];

    const brandList = [
        {
            name: "Buzz",
            logo: "buzz-logo.png",
            brandCode: "buzz",
        },
        {
            name: "Maple",
            logo: "maple-logo.png",
            brandCode: "maple",
        },
        {
            name: "Chromax",
            logo: "chromax-logo.png",
            brandCode: "chromax",
        },
        {
            name: "Hyper",
            logo: "hyper-logo.png",
            brandCode: "hyper",
        },
        {
            name: "NuclAI",
            logo: "nuclai-logo.png",
            brandCode: "nuclai",
        },
        {
            name: "Mory",
            logo: "mory-logo.png",
            brandCode: "mory",
        },
        {
            name: "Opal",
            logo: "opal-logo.png",
            brandCode: "opal",
        },
        {
            name: "AURO",
            logo: "auro-logo.png",
            brandCode: "auro",
        },
        {
            name: "Hot-Key",
            logo: "hotkey-logo.png",
            brandCode: "hotkey",
        },
        {
            name: "Pixcel",
            logo: "pixcel-logo.png",
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
                        <img className="brand-image" src={require('./img/brands/'+brand.logo)} alt="icon" />
                    </Link>
                    )
                }
            </div>
        </section>
    )
}

export default BrandSection;