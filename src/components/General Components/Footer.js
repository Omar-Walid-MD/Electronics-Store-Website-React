
function Footer()
{
    return (
        <footer className="footer-container">
                <div className="footer-list">
                    <h2>Store Title</h2>
                    <p>
                        Welcome to our store where you can <br/>
                        find the electronics of your dreams.
                    </p>
                </div>
                <div className="footer-list">
                    <h2>Quick Links</h2>
                        <div className="footer-link">HomePage</div>
                        <div className="footer-link">How to use</div>
                        <div className="footer-link">Shop</div>
                </div>
                <div className="footer-list">
                    <h2>Help</h2>
                        <div className="footer-link">FAQ</div>
                        <div className="footer-link">Support Center</div>
                        <div className="footer-link">Contact us</div>
                </div>
                <div className="footer-list">
                    <h2>About</h2>
                    
                        <div className="footer-link">About us</div>
                        <div className="footer-link">Work with us</div>
                        <div className="footer-link">Privacy policy</div>
                        <div className="footer-link">Sales policy</div>
                        <div className="footer-link">Refund policy</div>
                </div>
                <div className="footer-list">
                    <h2>Subscribe</h2>
                    <p>Subscribe to our newsletter to hear about<br/>
                        our latest arrivals!</p>
                    <form action="">
                        <input className="email-input" type="email" name="" id="" placeholder="Email" />
                        <input className="email-submit" type="submit" value="Send" disabled />
                    </form>
                    <div className="icon-group">
                        <div><div className="circle"><i className='bx bxl-facebook'></i></div></div>
                        <div><div className="circle"><i className='bx bxl-twitter' ></i></div></div>
                        <div><div className="circle"><i className='bx bxl-youtube' ></i></div></div>
                        <div><div className="circle"><i className='bx bxl-patreon' ></i></div></div>
                    </div>
                </div>
                <div className="footer-credits">
                    Copyright - Electronic Store
                </div>
        </footer>

    )
}

export default Footer;