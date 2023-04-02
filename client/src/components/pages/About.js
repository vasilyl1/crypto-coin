import React, { useEffect } from 'react';

const About = () => {

    useEffect(() => {
        const contactButton = document.querySelector('a[href="#contact-form"]');
        contactButton.addEventListener('click', function (event) {
            event.preventDefault();
            const contactForm = document.querySelector('#contact-form');
            contactForm.scrollIntoView({ behavior: 'smooth' });
        });
    }, []); 


    return (
        <>
            <div className="position-relative overflow-hidden p-md-5 text-center bg-light">
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 className="display-4 fw-normal">About Us</h1>
                    <p className="lead fw-normal">A group of cryptocurrency experts aiming to further your knowledge.</p>
                    <a className="btn btn-outline-secondary" href="#contact-form">Contact Us</a>
                </div>
                <div className="product-device shadow-sm d-none d-md-block"></div>
                <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
            </div>
            <div className="container text-center mt-5">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <h3 className="text-center">We do all the research and studying, so you don't have to. </h3>
                    </div>
                </div>
            </div>

            <div className="container text-center p-5">
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <p className="">
                            <br />
                            Welcome to Crypto Coin, the go-to website for all things related to cryptocurrency news and updates. Our website offers a comprehensive platform where users can stay up-to-date with the latest trends, insights, and news related to cryptocurrency.
                            <br />
                            <br />
                            At Crypto Coin, we believe that knowledge is power, and that's why we offer three different subscription tiers to cater to users' needs. Whether you're a beginner, intermediate, or advanced investor, our subscription plans are designed to provide customized news and updates to meet your specific requirements.
                            <br />
                            <br />
                            Our team of experts curates and compiles relevant news and insights from the world of cryptocurrency to provide our users with accurate and insightful information. Our subscription plans come with a range of features, including real-time news alerts, customized research reports, expert analysis, and more.
                            <br />
                            <br />
                            Our beginner subscription plan is perfect for those who are new to the world of cryptocurrency and want to learn more about the basics. The intermediate plan is designed for those who have some knowledge of cryptocurrency and want to deepen their understanding. And for the advanced investor, our subscription plan offers in-depth analysis and insights to help them make informed investment decisions.
                            <br />
                            <br />
                            We believe that our subscription plans offer immense value to our users by providing them with the latest news and insights related to cryptocurrency. With Crypto Coin, you can stay ahead of the game and make well-informed decisions.
                            <br />
                            <br />
                            Thank you for choosing Crypto Coin. We look forward to providing you with the latest news and insights related to cryptocurrency.
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-dark-subtle text-emphasis-dark ps-5 pt-5" >
                <h2 className="p-4" id="contact-form">Contact Form</h2>
                <div className="col-md-5 p-4">
                    <form >
                        <div class="mb-3">
                            <label for="Name" class="form-label">Name:</label>
                            <input type="text" name="userName" class="form-control border" id="Name" placeholder="" />
                        </div>
                        <div class="mb-3">
                            <label for="Email" class="form-label">Email address:</label>
                            <input type="email" name="email" class="form-control border" id="Email" />
                        </div>
                        <div class="mb-3">
                            <label for="Message" class="form-label">Message:</label>
                            <textarea name="message" class="form-control border" id="Message" rows="5" ></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-outline-secondary ">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
            <br />

        </>
    );
}

export default About;