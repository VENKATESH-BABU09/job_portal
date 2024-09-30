import React from 'react';
// import './App.css'; // Import custom CSS if needed

const LandingPage = () => {
    return (
        <div className="bg-slate-700 min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-lightblue-500 py-4 shadow">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <div className="text-white font-bold text-2xl">
                        <a href="#">Jobs Portal</a>
                    </div>
                    <ul className="flex space-x-6 text-white">
                        <li><a href="/login" className="hover:text-blue-300">Get Started</a></li>
                    </ul>
                </div>
            </nav>

            {/* Fullscreen Background Image Section */}
            <div className="w-full h-screen bg-hero" style={{ backgroundImage: "url('../src/assets/job.png')" }}></div>

            {/* Claim Destiny Section */}
            <div className="text-center p-8 bg-slate-800 text-white w-full">
                <h1 className="text-5xl font-bold mb-6 text-teal-200">Claim Destiny</h1>
                <p className="text-teal-100 mb-6 text-lg">
                    It's time to raise the anchor and set sail for the island of your dream job!
                    With our portal, you can navigate the choppy seas of job hunting with ease.
                    Fasten your seatbelts, job-seekers – your next adventure awaits!
                </p>
                <button className="bg-teal-200 text-slate-700 px-6 py-2 rounded-md hover:bg-teal-300 transition duration-300">
                    Get Started
                </button>
            </div>

            {/* Job Match Section */}
            <div className="bg-black min-h-screen flex items-center justify-center p-4">
                {/* Main Container */}
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* First Section with Image and Text */}
                    <div className="bg-transparent rounded-xl overflow-hidden shadow-lg flex flex-col items-center">
                        {/* Image Placeholder */}
                        <div className="w-full h-64 md:h-80 mb-6">
                            <img src="../src/assets/job3.1.png" alt="City Skyline" className="h-full w-full object-cover rounded-lg" />
                        </div>
                        {/* Text Content */}
                        <div className="text-center">
                            <h2 className="text-white text-4xl font-extrabold mb-4">Your Perfect Match Starts Here</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Browse thousands of lucrative opportunities waiting just for you. 
                                Our goal is to help you find the job that fits you like a glove. 
                                Get matched, get hired, get paid!
                            </p>
                        </div>
                    </div>

                    {/* Second Section with Image and Text */}
                    <div className="bg-transparent rounded-xl overflow-hidden shadow-lg flex flex-col items-center">
                        {/* Image Placeholder */}
                        <div className="w-full h-64 md:h-80 mb-6">
                            <img src="../src/assets/job3.2.png" alt="Corporate Building" className="h-full w-full object-cover rounded-lg" />
                        </div>
                        {/* Text Content */}
                        <div className="text-center">
                            <h2 className="text-white text-4xl font-extrabold mb-4">Discover Companies Beyond the Logo</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Scratch the surface and unearth company cultures, mission statements, office environments, and more. 
                                Find companies that align with your values.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Background Image Section for job4.png */}
            <div className="w-full h-screen bg-job4" style={{ backgroundImage: "url('../src/assets/job4.png')" }}></div>

            {/* Fullscreen Background Image Section for job5.png */}
            <div className="w-full h-screen bg-job5" style={{ backgroundImage: "url('../src/assets/job5.png')" }}></div>

            {/* Footer Section */}
            <footer className="bg-black text-gray-300 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        {/* FAQ Section */}
                        <div>
                            <h3 className="text-white text-lg font-bold mb-4">How do I create an account?</h3>
                            <p>
                                Just hit that gorgeous 'Get Started' button up there and the magic will happen!
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white text-lg font-bold mb-4">How do I apply for jobs?</h3>
                            <p>
                                Browse through our numerous listings, find your dream job and then click on apply, it’s that simple.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white text-lg font-bold mb-4">What if I can’t find jobs?</h3>
                            <p>
                                Don’t worry! Our job-finding spells don’t always work instantaneously. Keep checking back – your perfect listing could be next!
                            </p>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center md:text-left">
                        <div>
                            <h4 className="text-teal-400 font-bold mb-4">Explore</h4>
                            <ul>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">Companies</a></li>
                                <li><a href="#" className="hover:text-white">Jobs</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-teal-400 font-bold mb-4">Help</h4>
                            <ul>
                                <li><a href="#" className="hover:text-white">FAQ</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                                <li><a href="#" className="hover:text-white">Support</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-teal-400 font-bold mb-4">Legal</h4>
                            <ul>
                                <li><a href="#" className="hover:text-white">Terms</a></li>
                                <li><a href="#" className="hover:text-white">Privacy</a></li>
                                <li><a href="#" className="hover:text-white">Cookies</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="mt-12 flex justify-center space-x-6">
                        <a href="#" className="hover:text-teal-400">
                            <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="Twitter" className="h-6 w-6" />
                        </a>
                        <a href="#" className="hover:text-teal-400">
                            <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" className="h-6 w-6" />
                        </a>
                        <a href="#" className="hover:text-teal-400">
                            <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook.png" alt="Facebook" className="h-6 w-6" />
                        </a>
                        <a href="#" className="hover:text-teal-400">
                            <img src="https://img.icons8.com/ios-filled/50/ffffff/twitch.png" alt="Twitch" className="h-6 w-6" />
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-center mt-6 text-gray-500">
                        © 2024 Jobs Portal. Navigating you to your dream job!
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;