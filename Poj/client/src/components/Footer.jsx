import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";

export const Footer = () => {

    return (
        <>
    <footer>
        <div class="akafootermain">
            <div class="footer-col">
                <img src="./images/logo1.png" alt="" />
                <h2>Maavdi milk</h2>
            </div>
            <div class="footer-col">
                <h3 class="text-office">
                    Office
                    <div class="underline"><span></span></div>
                </h3>
                <p>Chalala-Khambha Rd</p>
                <p>To:-Ingorala (bhad), </p>
                <p>Amreli, Gujarat</p>

                <p class="email">maavdimilk@gmail.com</p>
                <p class="phone">+91 76003 74007</p>
            </div>
            <div class="footer-col">
                <h3>
                    Menu
                    <div class="underline"><span></span></div>
                </h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="#">Our Team</a></li>
                    <li><a href="#">Testimonials</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>
                    Newsletter
                    <div class="underline"><span></span></div>
                </h3>
                
                <div class="social-icons">
                    <a href="#"><FaFacebook /></a>
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaYoutube /></a>
                </div>
            </div>
        </div>
        <div class="copyright">
            <p> &copy; 2024  Maavdi milk </p>
        </div>
    </footer>
        </>
    )
}
