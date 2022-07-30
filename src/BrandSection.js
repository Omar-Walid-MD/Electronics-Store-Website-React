
function BrandSection()
{
    const list = ["Desktops","Laptops","Smartphones","Tablets","Mice","Keyboards","Monitors","Speakers","Headphones","Earphones"];

    const brandList = [
        {
            name: "Buzz",
            logo: "buzz-logo.png",
        },
        {
            name: "Maple",
            logo: "maple-logo.png",
        },
        {
            name: "Chromax",
            logo: "chromax-logo.png",
        },
        {
            name: "Hyper",
            logo: "hyper-logo.png",
        },
        {
            name: "NuclAI",
            logo: "nuclai-logo.png",
        },
        {
            name: "Mory",
            logo: "mory-logo.png",
        },
        {
            name: "Opal",
            logo: "opal-logo.png",
        },
        {
            name: "AURO",
            logo: "auro-logo.png",
        },
        {
            name: "Hot-Key",
            logo: "hotkey-logo.png",
        },
        {
            name: "Pixcel",
            logo: "pixcel-logo.png",
        },

    ];

    return (
        <section className="brand-section-container">
            <h1 className="brand-section-title">Popular Brands</h1>
            <div className="brand-group">
                {
                    brandList.map((brand,index)=>
                    <div className="brand-container" key={index}>
                        <img className="brand-image" src={require('./img/brands/'+brand.logo)} alt="icon" />
                    </div>
                    )
                }
            </div>
        </section>
    )
}

export default BrandSection;