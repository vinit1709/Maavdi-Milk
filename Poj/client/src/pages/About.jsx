import { Navbar } from "../components/Navbar";
import { useAuth } from "../store/auth"
import "../css/About.css";
import { Footer } from "../components/Footer";

export const About = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (<>
        <Navbar />
        {/* <h1>Welcome, {user ? user.userName : "User" }</h1> */}

        <div class="about">

            {/* <!--      here i put the logo i made but the links were not working and the logo didn't show so removed it :(      --> */}
            <div class="upper">
                <div class="logo">
                    <img class="image" src="./images/k2.jpg" alt="" />
                </div>
                <div class="info">
                    {/* <!-- <h1>ABOUT YELPCAMP</h1> --> */}
                    <p>
                        Welcome to Maavdi Milk, your trusted source for premium quality dairy products! We are dedicated to providing you with the freshest and most nutritious milk and dairy products straight from our farm to your table.
                    </p>
                </div>
            </div>

            {/* <!-- ------------------------------------ --> */}
            <div class="lower">
                <div class="info" id="lower-info">
                    <h1>Our Story</h1>
                    <p>
                        Founded with a passion for sustainability and quality, Maavdi Milk started as a small family-owned dairy farm nestled in the picturesque countryside. Our journey began with a commitment to ethically raise our cows, ensuring they enjoy a comfortable and natural environment while producing the highest quality milk.
                    </p>
                </div>
                <div class="slider" id="lower-img">
                    <img src="./images/k1.jpg" alt="Image" id="slider" />
                </div>
            </div>
            {/* <!-- ------------------------------------ --> */}
            <div class="upper">
                <div class="logo">
                    <img class="image" src="./images/k3.jpg" alt="" />
                </div>
                <div class="info">
                    <h1>Our Mission</h1>
                    <p>
                        At Maavdi Milk, our mission is simple: to deliver wholesome dairy products that not only nourish your body but also support the well-being of our community and environment. We strive to uphold the highest standards of animal welfare, sustainability, and customer satisfaction in everything we do.
                    </p>
                </div>
            </div>
            {/* <!-- ------------------ --> */}
        </div>
        <Footer />
    </>)
}