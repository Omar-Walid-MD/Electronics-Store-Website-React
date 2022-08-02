
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
                        <a className="footer-link" href="">HomePage</a>
                        <a className="footer-link" href="">How to use</a>
                        <a className="footer-link" href="">Shop</a>
                </div>
                <div className="footer-list">
                    <h2>Help</h2>
                        <a className="footer-link" href="">FAQ</a>
                        <a className="footer-link" href="">Support Center</a>
                        <a className="footer-link" href="">Contact us</a>
                </div>
                <div className="footer-list">
                    <h2>About</h2>
                    
                        <a className="footer-link" href="">About us</a>
                        <a className="footer-link" href="">Work with us</a>
                        <a className="footer-link" href="">Privacy policy</a>
                        <a className="footer-link" href="">Sales policy</a>
                        <a className="footer-link" href="">Refund policy</a>
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
                        <a href=""><div className="circle"><i className='bx bxl-facebook'></i></div></a>
                        <a href=""><div className="circle"><i className='bx bxl-twitter' ></i></div></a>
                        <a href=""><div className="circle"><i className='bx bxl-youtube' ></i></div></a>
                        <a href=""><div className="circle"><i className='bx bxl-patreon' ></i></div></a>
                    </div>
                </div>
                <div className="footer-credits">
                    Copyright - Electronic Store
                </div>
        </footer>

    )
}

export default Footer;