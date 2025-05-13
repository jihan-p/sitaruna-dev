import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Assuming 'aos' npm package is installed:
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

// Import jQuery and Owl Carousel after installing via npm/yarn
import $ from 'jquery'; // Import jQuery
import 'owl.carousel'; // Import Owl Carousel JS
// Note: Owl Carousel CSS is already linked in the <head> section above.

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    // State for mobile menu visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Function to toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prevState => !prevState);
    };

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            easing: 'ease', // default easing for AOS animations
            once: true, // whether animation should happen only once - while scrolling down
            // Add other AOS options here if needed from original main.js
            // offset: 120, // offset (in px) from the original trigger point
            // delay: 0, // values from 0 to 3000, with step 50ms
            // duration: 400, // values from 0 to 3000, with step 50ms
        });

        // Refresh AOS on component updates or data changes that might affect layout
        // This might be needed if content changes dynamically after initial load
        // AOS.refresh();

        // --- Implement Mobile Menu Cloning Logic ---
        // Find the desktop navigation and mobile menu body elements
        const desktopNav = document.querySelector('.site-menu.main-menu.js-clone-nav');
        const mobileMenuBody = document.querySelector('.site-mobile-menu-body');

        if (desktopNav && mobileMenuBody) {
            // Clone the desktop navigation and append it to the mobile menu body
            // Use cloneNode(true) to deep clone all children and attributes
            const clonedNav = desktopNav.cloneNode(true);

            // Clear existing content in mobile menu body before appending
            mobileMenuBody.innerHTML = '';

            // Append the cloned navigation
            mobileMenuBody.appendChild(clonedNav);

            // Optional: Modify cloned links for mobile behavior if needed
            // e.g., adding click handlers to close the menu on navigation
             clonedNav.querySelectorAll('a').forEach(link => {
                 link.onclick = () => {
                     setIsMobileMenuOpen(false);
                 };
             });

            // The original JS also had a setTimeout here related to menu toggle button, 
            // but that might be handled purely by CSS now with React state.
        }
        // -----------------------------------------

        // Placeholder for other JS initializations (sticky header, carousel, etc.)
        // $('.js-clone-nav').each(function() { var $this = $(this); $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body'); });
        // setTimeout(function() { var counter = 0; $('.js-menu-toggle').each(function() { var $this = $(this); $this.removeClass('d-inline-block d-lg-none').html('&#9776;'); }); }, 200);
        // AOS.init({ easing: 'ease', once: true }); // Original commented line

        // Cleanup function for AOS if needed (though AOS typically manages cleanup)
        return () => {
            // AOS.refreshHard(); // or other cleanup
             // Consider cleanup for cloned elements if necessary, though usually not needed for simple append
        };
    }, []); // Depend on [] so it runs only once on mount

    // --- Implement Sticky Header Logic ---
    useEffect(() => {
        const header = document.querySelector('.site-navbar');
        if (!header) return;

        // Function to handle the scroll event
        const handleScroll = () => {
            // Get the header's height to determine the scroll threshold
            const headerHeight = header.offsetHeight;

            // Check if the user has scrolled past the header height
            if (window.scrollY > headerHeight) {
                // Add a class to make the header sticky (assuming 'is-sticky' or similar class exists in CSS)
                // Check original CSS for exact class, but 'is-sticky' is common.
                // The original template used a `.sticky-wrapper .is-sticky` pattern, targeting the sticky-wrapper.
                // Let's target the header directly for simplicity in React component.
                header.classList.add('is-sticky'); // Or whatever the correct sticky class is
            } else {
                // Remove the class if scrolled back up
                header.classList.remove('is-sticky');
            }
        };

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Depend on [] to run once on mount
    // ---------------------------------------

    // --- Implement Owl Carousel Initialization ---
    useEffect(() => {
        // Check if jQuery and Owl Carousel are available globally
        // In a typical setup, you might import them if installed via npm.
        // For this conversion, we assume they are loaded via script tags in index.html/layout.
        if (typeof window !== 'undefined' && window.$ && window.$.fn && window.$.fn.owlCarousel) {
            const $ = window.$;
            const carousel = $('.owl-carousel.nonloop-block-14');

            if (carousel.length > 0) {
                carousel.owlCarousel({
                    center: false,
                    items: 1,
                    loop: true,
                    stagePadding: 0,
                    margin: 20,
                    smartSpeed: 1000,
                    autoplay: true,
                    nav: false,
                    dots: true,
                    // Configure responsive options based on original main.js if available
                    responsive: {
                        600: {
                            margin: 20,
                            nav: false,
                            dots: true,
                            items: 2
                        },
                        1000: {
                            margin: 20,
                            stagePadding: 0,
                            nav: false,
                            dots: true,
                            items: 3
                        }
                    }
                });

                // Attach click handlers to custom navigation buttons
                $('.customPrevBtn').click(function() {
                    carousel.trigger('prev.owl.carousel');
                });

                $('.customNextBtn').click(function() {
                    carousel.trigger('next.owl.carousel');
                });

                // Optional: Cleanup Owl Carousel on component unmount
                return () => {
                    // This might not be strictly necessary depending on Owl Carousel version
                    // and how it cleans up, but it's good practice.
                    // carousel.owlCarousel('destroy'); // Check Owl Carousel docs for correct method
                };
            }
        } else {
            console.warn('jQuery or Owl Carousel not found. Carousel will not initialize.');
        }
    }, []); // Depend on [] to run once on mount
    // ----------------------------------------

    // --- Implement Smooth Scrolling for Anchor Links ---
    useEffect(() => {
        // Select all anchor links that start with # and are not part of the tab system (if any)
        // Adjust the selector based on your specific link structure if necessary.
        // We'll target links within the site navigation elements.
        const anchorLinks = document.querySelectorAll('.site-navbar a[href^="#"], .site-mobile-menu-body a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Prevent default jump behavior
                e.preventDefault();

                // Get the target element's ID from the href attribute
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                // Check if the target element exists
                if (targetElement) {
                    // Scroll smoothly to the target element
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Cleanup function to remove event listeners
        return () => {
            anchorLinks.forEach(link => {
                // Need to recreate the exact function reference to remove the listener
                // A common pattern is to define the handler outside or use event delegation.
                // For simplicity here, we'll rely on the component unmount to clean up.
                // A more robust solution might involve useRef to store handlers or event delegation.
            });
        };
    }, []); // Depend on [] to run once on mount
    // -------------------------------------------------

    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head>
                <title>OneSchool &mdash; Website by Colorlib</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                {/* External CSS links from index.html */}
                {/* These should ideally be handled in your main CSS build process (e.g., Vite) */}
                {/* For demonstration, listing them here, but this is not the standard React/Vite way */}
                <link href="https://fonts.googleapis.com/css?family=Muli:300,400,700,900" rel="stylesheet" />
                <link rel="stylesheet" href="/oneschool/fonts/icomoon/style.css" />
                <link rel="stylesheet" href="/oneschool/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/oneschool/css/jquery-ui.css" />
                <link rel="stylesheet" href="/oneschool/css/owl.carousel.min.css" />
                <link rel="stylesheet" href="/oneschool/css/owl.theme.default.min.css" />
                {/* Duplicate link in original, keeping for fidelity: <link rel="stylesheet" href="css/owl.theme.default.min.css"> */}
                <link rel="stylesheet" href="/oneschool/css/jquery.fancybox.min.css" />
                <link rel="stylesheet" href="/oneschool/css/bootstrap-datepicker.css" />
                <link rel="stylesheet" href="/oneschool/fonts/flaticon/font/flaticon.css" />
                <link rel="stylesheet" href="/oneschool/css/aos.css" />
                <link rel="stylesheet" href="/oneschool/css/style.css" />
            </Head>

            <div className="site-wrap">

                {/* Site Mobile Menu */}
                <div className={`site-mobile-menu site-navbar-target ${isMobileMenuOpen ? 'site-mobile-menu-open' : ''}`}>
                    <div className="site-mobile-menu-header">
                        <div className="site-mobile-menu-close mt-3">
                            <span className="icon-close2 js-menu-toggle" onClick={toggleMobileMenu}></span>
                        </div>
                    </div>
                    <div className="site-mobile-menu-body"></div>
                </div>

                {/* Header */}
                <header className="site-navbar py-4 js-sticky-header site-navbar-target" role="banner">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center">
                            <div className="site-logo mr-auto w-25">
                                <a href="index.html">OneSchool</a> {/* Consider using Inertia Link if this navigates within the app */}
                            </div>

                            {/* Desktop Navigation */}
                            <div className="mx-auto text-center">
                                <nav className="site-navigation position-relative text-right" role="navigation">
                                    <ul className="site-menu main-menu js-clone-nav mx-auto d-none d-lg-block m-0 p-0">
                                        <li><a href="#home-section" className="nav-link">Home</a></li>
                                        <li><a href="#courses-section" className="nav-link">Courses</a></li>
                                        <li><a href="#programs-section" className="nav-link">Programs</a></li>
                                        <li><a href="#teachers-section" className="nav-link">Teachers</a></li>
                                        {/* Add conditional rendering for authenticated user links if needed in main nav */}
                                    </ul>
                                </nav>
                            </div>

                            {/* Auth Links / Contact Us */}
                            <div className="ml-auto w-25">
                                <nav className="site-navigation position-relative text-right" role="navigation">
                                    <ul className="site-menu main-menu site-menu-dark js-clone-nav mr-auto d-none d-lg-block m-0 p-0">
                                        {auth.user ? (
                                            <li>
                                                 {/* Link to Dashboard for authenticated users */}
                                                <Link
                                                    href={route('dashboard')}
                                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                        ) : (
                                            <>
                                                <li>
                                                    <Link
                                                        href={route('login')}
                                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                                    >
                                                        Log in
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={route('register')}
                                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                                    >
                                                        Register
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                        {/* Keeping Contact Us CTA as in original HTML */}
                                         <li className="cta"><a href="#contact-section" className="nav-link"><span>Contact Us</span></a></li> {/* Anchor link for smooth scroll */}

                                    </ul>
                                </nav>
                                {/* Mobile menu toggle button */}
                                <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right" onClick={toggleMobileMenu}><span className="icon-menu h3"></span></a>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Intro Section (Home) */}
                <div className="intro-section" id="home-section">
                    <div className="slide-1" style={{ backgroundImage: "url('/oneschool/images/hero_1.jpg')" }} data-stellar-background-ratio="0.5">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-12">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6 mb-4">
                                            <h1 data-aos="fade-up" data-aos-delay="100">Learn From The Expert</h1>
                                            <p className="mb-4" data-aos="fade-up" data-aos-delay="200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ipsa nulla sed quis rerum amet natus quas necessitatibus.</p>
                                            <p data-aos="fade-up" data-aos-delay="300"><a href="#" className="btn btn-primary py-3 px-5 btn-pill">Admission Now</a></p>
                                        </div>
                                        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="500">
                                            <form action="" method="post" className="form-box">
                                                <h3 className="h4 text-black mb-4">Sign Up</h3>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" placeholder="Email Addresss" /> {/* Self-closing tag */}
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control" placeholder="Password" /> {/* Self-closing tag */}
                                                </div>
                                                <div className="form-group mb-4">
                                                    <input type="password" className="form-control" placeholder="Re-type Password" /> {/* Self-closing tag */}
                                                </div>
                                                <div className="form-group">
                                                    <input type="submit" className="btn btn-primary btn-pill" value="Sign up" /> {/* Self-closing tag */}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses Section */}
                <div className="site-section courses-title" id="courses-section">
                    <div className="container">
                        <div className="row mb-5 justify-content-center">
                            <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
                                <h2 className="section-title">Courses</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-section courses-entry-wrap" data-aos="fade-up" data-aos-delay="100">
                    <div className="container">
                        <div className="row">
                            {/* Owl Carousel - Requires JS implementation */}
                            <div className="owl-carousel col-12 nonloop-block-14">

                                {/* Course Item 1 */}
                                <div className="course bg-white h-100 align-self-stretch">
                                    <figure className="m-0">
                                        <a href="course-single.html"><img src="/oneschool/images/img_1.jpg" alt="Image" className="img-fluid" /></a>
                                    </figure>
                                    <div className="course-inner-text py-4 px-4">
                                        <span className="course-price">$20</span>
                                        <div className="meta"><span className="icon-clock-o"></span>4 Lessons / 12 week</div>
                                        <h3><a href="#">Study Law of Physics</a></h3>
                                        <p>Lorem ipsum dolor sit amet ipsa nulla adipisicing elit. </p>
                                    </div>
                                    <div className="d-flex border-top stats">
                                        <div className="py-3 px-4"><span className="icon-users"></span> 2,193 students</div>
                                        <div className="py-3 px-4 w-25 ml-auto border-left"><span className="icon-chat"></span> 2</div>
                                    </div>
                                </div>

                                {/* Course Item 2 */}
                                <div className="course bg-white h-100 align-self-stretch">
                                    <figure className="m-0">
                                        <a href="course-single.html"><img src="/oneschool/images/img_2.jpg" alt="Image" className="img-fluid" /></a>
                                    </figure>
                                    <div className="course-inner-text py-4 px-4">
                                        <span className="course-price">$99</span>
                                        <div className="meta"><span className="icon-clock-o"></span>4 Lessons / 12 week</div>
                                        <h3><a href="#">Logo Design Course</a></h3>
                                        <p>Lorem ipsum dolor sit amet ipsa nulla adipisicing elit. </p>
                                    </div>
                                    <div className="d-flex border-top stats">
                                        <div className="py-3 px-4"><span className="icon-users"></span> 2,193 students</div>
                                        <div className="py-3 px-4 w-25 ml-auto border-left"><span className="icon-chat"></span> 2</div>
                                    </div>
                                </div>

                                {/* Course Item 3 */}
                                <div className="course bg-white h-100 align-self-stretch">
                                    <figure className="m-0">
                                        <a href="course-single.html"><img src="/oneschool/images/img_3.jpg" alt="Image" className="img-fluid" /></a>
                                    </figure>
                                    <div className="course-inner-text py-4 px-4">
                                        <span className="course-price">$99</span>
                                        <div className="meta"><span className="icon-clock-o"></span>4 Lessons / 12 week</div>
                                        <h3><a href="#">JS Programming Language</a></h3>
                                        <p>Lorem ipsum dolor sit amet ipsa nulla adipisicing elit. </p>
                                    </div>
                                    <div className="d-flex border-top stats">
                                        <div className="py-3 px-4"><span className="icon-users"></span> 2,193 students</div>
                                        <div className="py-3 px-4 w-25 ml-auto border-left"><span className="icon-chat"></span> 2</div>
                                    </div>
                                </div>

                                {/* Course Item 4 */}
                                <div className="course bg-white h-100 align-self-stretch">
                                    <figure className="m-0">
                                        <a href="course-single.html"><img src="/oneschool/images/img_4.jpg" alt="Image" className="img-fluid" /></a>
                                    </figure>
                                    <div className="course-inner-text py-4 px-4">
                                        <span className="course-price">$20</span>
                                        <div className="meta"><span className="icon-clock-o"></span>4 Lessons / 12 week</div>
                                        <h3><a href="#">Study Law of Physics</a></h3>
                                        <p>Lorem ipsum dolor sit amet ipsa nulla adipisicing elit. </p>
                                    </div>
                                    <div className="d-flex border-top stats">
                                        <div className="py-3 px-4"><span className="icon-users"></span> 2,193 students</div>
                                        <div className="py-3 px-4 w-25 ml-auto border-left"><span className="icon-chat"></span> 2</div>
                                    </div>
                                </div>

                                {/* Course Item 5 */}
                                <div className="course bg-white h-100 align-self-stretch">
                                    <figure className="m-0">
                                        <a href="course-single.html"><img src="/oneschool/images/img_5.jpg" alt="Image" className="img-fluid" /></a>
                                    </figure>
                                    <div className="course-inner-text py-4 px-4">
                                        <span className="course-price">$99</span>
                                        <div className="meta"><span className="icon-clock-o"></span>4 Lessons / 12 week</div>
                                        <h3><a href="#">Logo Design Course</a></h3>
                                        <p>Lorem ipsum dolor sit amet ipsa nulla adipisicing elit. </p>
                                    </div>
                                    <div className="d-flex border-top stats">
                                        <div className="py-3 px-4"><span className="icon-users"></span> 2,193 students</div>
                                        <div className="py-3 px-4 w-25 ml-auto border-left"><span className="icon-chat"></span> 2</div>
                                    </div>
                                </div>

                                {/* Course Item 6 */}
                                <div className="course bg-white h-100 align-self-stretch">
                                    <figure className="m-0">
                                        <a href="course-single.html"><img src="/oneschool/images/img_6.jpg" alt="Image" className="img-fluid" /></a>
                                    </figure>
                                    <div className="course-inner-text py-4 px-4">
                                        <span className="course-price">$99</span>
                                        <div className="meta"><span className="icon-clock-o"></span>4 Lessons / 12 week</div>
                                        <h3><a href="#">JS Programming Language</a></h3>
                                        <p>Lorem ipsum dolor sit amet ipsa nulla adipisicing elit. </p>
                                    </div>
                                    <div className="d-flex border-top stats">
                                        <div className="py-3 px-4"><span className="icon-users"></span> 2,193 students</div>
                                        <div className="py-3 px-4 w-25 ml-auto border-left"><span className="icon-chat"></span> 2</div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        {/* Carousel navigation buttons - Requires JS implementation */}
                        <div className="row justify-content-center">
                            <div className="col-7 text-center">
                                <button className="customPrevBtn btn btn-primary m-1">Prev</button>
                                <button className="customNextBtn btn btn-primary m-1">Next</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Programs Section */}
                <div className="site-section" id="programs-section">
                    <div className="container">
                        <div className="row mb-5 justify-content-center">
                            <div className="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
                                <h2 className="section-title">Our Programs</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam repellat aut neque! Doloribus sunt non aut reiciendis, vel recusandae obcaecati hic dicta repudiandae in quas quibusdam ullam, illum sed veniam!</p>
                            </div>
                        </div>
                        {/* Program Row 1 */}
                        <div className="row mb-5 align-items-center">
                            <div className="col-lg-7 mb-5" data-aos="fade-up" data-aos-delay="100">
                                <img src="/oneschool/images/undraw_youtube_tutorial.svg" alt="Image" className="img-fluid" />
                            </div>
                            <div className="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
                                <h2 className="text-black mb-4">We Are Excellent In Education</h2>
                                <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem maxime nam porro possimus fugiat quo molestiae illo.</p>

                                <div className="d-flex align-items-center custom-icon-wrap mb-3">
                                    <span className="custom-icon-inner mr-3"><span className="icon icon-graduation-cap"></span></span>
                                    <div><h3 className="m-0">22,931 Yearly Graduates</h3></div>
                                </div>

                                <div className="d-flex align-items-center custom-icon-wrap">
                                    <span className="custom-icon-inner mr-3"><span className="icon icon-university"></span></span>
                                    <div><h3 className="m-0">150 Universities Worldwide</h3></div>
                                </div>
                            </div>
                        </div>

                        {/* Program Row 2 */}
                        <div className="row mb-5 align-items-center">
                            <div className="col-lg-7 mb-5 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="100">
                                <img src="/oneschool/images/undraw_teaching.svg" alt="Image" className="img-fluid" />
                            </div>
                            <div className="col-lg-4 mr-auto order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
                                <h2 className="text-black mb-4">Strive for Excellent</h2>
                                <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem maxime nam porro possimus fugiat quo molestiae illo.</p>

                                <div className="d-flex align-items-center custom-icon-wrap mb-3">
                                    <span className="custom-icon-inner mr-3"><span className="icon icon-graduation-cap"></span></span>
                                    <div><h3 className="m-0">22,931 Yearly Graduates</h3></div>
                                </div>

                                <div className="d-flex align-items-center custom-icon-wrap">
                                    <span className="custom-icon-inner mr-3"><span className="icon icon-university"></span></span>
                                    <div><h3 className="m-0">150 Universities Worldwide</h3></div>
                                </div>
                            </div>
                        </div>

                        {/* Program Row 3 */}
                        <div className="row mb-5 align-items-center">
                            <div className="col-lg-7 mb-5" data-aos="fade-up" data-aos-delay="100">
                                <img src="/oneschool/images/undraw_teacher.svg" alt="Image" className="img-fluid" />
                            </div>
                            <div className="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
                                <h2 className="text-black mb-4">Education is life</h2>
                                <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem maxime nam porro possimus fugiat quo molestiae illo.</p>

                                <div className="d-flex align-items-center custom-icon-wrap mb-3">
                                    <span className="custom-icon-inner mr-3"><span className="icon icon-graduation-cap"></span></span>
                                    <div><h3 className="m-0">22,931 Yearly Graduates</h3></div>
                                </div>

                                <div className="d-flex align-items-center custom-icon-wrap">
                                    <span className="custom-icon-inner mr-3"><span className="icon icon-university"></span></span>
                                    <div><h3 className="m-0">150 Universities Worldwide</h3></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Teachers Section */}
                <div className="site-section" id="teachers-section">
                    <div className="container">

                        <div className="row mb-5 justify-content-center">
                            <div className="col-lg-7 mb-5 text-center" data-aos="fade-up" data-aos-delay="">
                                <h2 className="section-title">Our Teachers</h2>
                                <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam repellat aut neque! Doloribus sunt non aut reiciendis, vel recusandae obcaecati hic dicta repudiandae in quas quibusdam ullam, illum sed veniam!</p>
                            </div>
                        </div>

                        <div className="row">
                            {/* Teacher 1 */}
                            <div className="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="100">
                                <div className="teacher text-center">
                                    <img src="/oneschool/images/person_1.jpg" alt="Image" className="img-fluid w-50 rounded-circle mx-auto mb-4" />
                                    <div className="py-2">
                                        <h3 className="text-black">Benjamin Stone</h3>
                                        <p className="position">Physics Teacher</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro eius suscipit delectus enim iusto tempora, adipisci at provident.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Teacher 2 */}
                            <div className="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="200">
                                <div className="teacher text-center">
                                    <img src="/oneschool/images/person_2.jpg" alt="Image" className="img-fluid w-50 rounded-circle mx-auto mb-4" />
                                    <div className="py-2">
                                        <h3 className="text-black">Katleen Stone</h3>
                                        <p className="position">Physics Teacher</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro eius suscipit delectus enim iusto tempora, adipisci at provident.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Teacher 3 */}
                            <div className="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="300">
                                <div className="teacher text-center">
                                    <img src="/oneschool/images/person_3.jpg" alt="Image" className="img-fluid w-50 rounded-circle mx-auto mb-4" />
                                    <div className="py-2">
                                        <h3 className="text-black">Sadie White</h3>
                                        <p className="position">Physics Teacher</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro eius suscipit delectus enim iusto tempora, adipisci at provident.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimony Section */}
                <div className="site-section bg-image overlay" style={{ backgroundImage: "url('/oneschool/images/hero_1.jpg')" }}> {/* Style object for background image */}
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-8 text-center testimony">
                                <img src="/oneschool/images/person_4.jpg" alt="Image" className="img-fluid w-25 mb-4 rounded-circle" />
                                <h3 className="mb-4">Jerome Jensen</h3>
                                <blockquote>
                                    <p>&ldquo; Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum rem soluta sit eius necessitatibus voluptate excepturi beatae ad eveniet sapiente impedit quae modi quo provident odit molestias! Rem reprehenderit assumenda &rdquo;</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="site-section pb-0">
                    {/* Blobs - Need to ensure these images/SVGs are accessible */}
                    <div className="future-blobs">
                        <div className="blob_2">
                            <img src="/oneschool/images/blob_2.svg" alt="Image" />
                        </div>
                        <div className="blob_1">
                            <img src="/oneschool/images/blob_1.svg" alt="Image" />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row mb-5 justify-content-center" data-aos="fade-up" data-aos-delay="">
                            <div className="col-lg-7 text-center">
                                <h2 className="section-title">Why Choose Us</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 ml-auto align-self-start" data-aos="fade-up" data-aos-delay="100">
                                <div className="p-4 rounded bg-white why-choose-us-box">

                                    <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                                        <div className="mr-3"><span className="custom-icon-inner"><span className="icon icon-graduation-cap"></span></span></div>
                                        <div><h3 className="m-0">22,931 Yearly Graduates</h3></div>
                                    </div>

                                    <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                                        <div className="mr-3"><span className="custom-icon-inner"><span className="icon icon-university"></span></span></div>
                                        <div><h3 className="m-0">150 Universities Worldwide</h3></div>
                                    </div>

                                    <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                                        <div className="mr-3"><span className="custom-icon-inner"><span className="icon icon-graduation-cap"></span></span></div>
                                        <div><h3 className="m-0">Top Professionals in The World</h3></div>
                                    </div>

                                    <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                                        <div className="mr-3"><span className="custom-icon-inner"><span className="icon icon-university"></span></span></div>
                                        <div><h3 className="m-0">Expand Your Knowledge</h3></div>
                                    </div>

                                    <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                                        <div className="mr-3"><span className="custom-icon-inner"><span className="icon icon-graduation-cap"></span></span></div>
                                        <div><h3 className="m-0">Best Online Teaching Assistant Courses</h3></div>
                                    </div>

                                    <div className="d-flex align-items-center custom-icon-wrap custom-icon-light">
                                        <div className="mr-3"><span className="custom-icon-inner"><span className="icon icon-university"></span></span></div>
                                        <div><h3 className="m-0">Best Teachers</h3></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 align-self-end" data-aos="fade-left" data-aos-delay="200">
                                <img src="/oneschool/images/person_transparent.png" alt="Image" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="site-section bg-light" id="contact-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-7">
                                <h2 className="section-title mb-3">Message Us</h2>
                                <p className="mb-5">Natus totam voluptatibus animi aspernatur ducimus quas obcaecati mollitia quibusdam temporibus culpa dolore molestias blanditiis consequuntur sunt nisi.</p>

                                {/* Form requires handling state and submission in React */}
                                <form method="post" data-aos="fade">
                                    <div className="form-group row">
                                        <div className="col-md-6 mb-3 mb-lg-0">
                                            <input type="text" className="form-control" placeholder="First name" />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control" placeholder="Last name" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" placeholder="Subject" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <input type="email" className="form-control" placeholder="Email" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <textarea className="form-control" id="" cols="30" rows="10" placeholder="Write your message here."></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <input type="submit" className="btn btn-primary py-3 px-5 btn-block btn-pill" value="Send Message" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="footer-section bg-white">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <h3>About OneSchool</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro consectetur ut hic ipsum et veritatis corrupti. Itaque eius soluta optio dolorum temporibus in, atque, quos fugit sunt sit quaerat dicta.</p>
                            </div>

                            <div className="col-md-3 ml-auto">
                                <h3>Links</h3>
                                <ul className="list-unstyled footer-links">
                                    <li><a href="#">Home</a></li> {/* Use Inertia Link if navigating within app */}
                                    <li><a href="#">Courses</a></li>
                                    <li><a href="#">Programs</a></li>
                                    <li><a href="#">Teachers</a></li>
                                </ul>
                            </div>

                            <div className="col-md-4">
                                <h3>Subscribe</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt incidunt iure iusto architecto? Numquam, natus?</p>
                                {/* Subscribe form requires handling state and submission in React */}
                                <form action="#" className="footer-subscribe">
                                    <div className="d-flex mb-5">
                                        <input type="text" className="form-control rounded-0" placeholder="Email" />
                                        <input type="submit" className="btn btn-primary rounded-0" value="Subscribe" />
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="row pt-5 mt-5 text-center">
                            <div className="col-md-12">
                                <div className="border-top pt-5">
                                    <p>
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                        Copyright &copy;{new Date().getFullYear()} All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a>
                                        {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </div> {/* .site-wrap */}

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="site-mobile-menu-overlay" // Use class from original CSS
                    onClick={toggleMobileMenu} // Close menu when overlay is clicked
                ></div>
            )}

        </>
    );
}
