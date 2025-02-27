import React, { useState, useEffect } from 'react';
import MercedesSClass from '../assets/images/mercedes-s-class.jpg';
import { TabView, TabPanel } from 'primereact/tabview';
import {Link, useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputTextarea  } from "primereact/inputtextarea";
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import config from '../config'; 
import InstagramIcon from '../assets/images/instagram.svg';
import EnvelopeIcon from '../assets/images/envelope.svg';
import WhatsappIcon from '../assets/images/whatsapp-black-icon.svg';


function About(){    
    const [activeIndex, setActiveIndex] = useState(0);
    const [innerActiveIndex, innerSetActiveIndex] = useState(0);
    const [formData, setFormData] = useState({name: '',email: '',phone: '',message: ''});
    const [errors, setErrors] = useState({name: '',email: '',phone: ''});
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [activeTab, setActiveTab] = useState(1); // Default to 1st tab
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');

    useEffect(() => {
        if (tab) {
            const tabIndex = parseInt(tab, 10); // Convert tab to an integer
            if (!isNaN(tabIndex)) {
                setActiveIndex(tabIndex);
                innerSetActiveIndex(tabIndex);
            }
        }
    }, [location.search, tab]);

    // Handle change for form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error message when user starts typing again
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    // Validation function
    const validateForm = () => {
        let valid = true;
        const newErrors = { name: '', email: '', phone: '' };
        // Name validation
        if (!formData.name) {
            newErrors.name = 'Please enter your name';
            valid = false;
        }
        // Email validation (simple regex for email)
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            valid = false;
        }
        // Phone validation (only numbers and optional '+' for international numbers)
        const phonePattern = /^[0-9+\-()\s]*$/;
        if (!formData.phone || !phonePattern.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) { return; }
        setIsLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
        try {
            const response = await fetch(`${config.api.baseURL}${config.api.contactUs}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSuccessMessage('Email sent successfully!');
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            setErrorMessage('Failed to send email');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        const whatsappUrl = `${config.whatsapp.baseUrl}${config.whatsapp.recipientPhone}`;
        window.open(whatsappUrl, '_blank');
    };
    

    return(
    <div className='about-tabs pb-90'> 
        <div className='about-tabs-inner plr-100'> 
            <div className='about-tabs-main'>        
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="About Us">
                        <div className='text-center'>
                            <h6 className='font-18 mb-30'>about <strong>us</strong></h6>
                            <div className='about-pagedesc font-16'>
                                <p className='font-16 mb-20'>SSJ Luxury  Transports provides London’s residents and visitors with a discerning, discreet, and elevated transport experience. We aim to provide a level of service missing from apps for our clients by building long term relationships centered around meeting your specific needs and expectations. </p>
                                <p className='font-16  mb-20'>With corporate, entertainment, and HNW clientele, we have a holistic understanding of the level of service and detail necessary for a truly luxury experience.</p>
                                <p className='font-16'>Get in touch with our team through our booking system or contact us here for more. </p>                                
                            </div>
                            <ul className='d-flex align-items-center justify-content-center nostyle pt-40 about-social-icon'>
                                <li>
                                <Link to={`mailto:${config.email.email}`}><img src={EnvelopeIcon} alt='Icon' /></Link>
                                </li>
                                <li>
                                <Link onClick={handleClick} to='#'><img src={WhatsappIcon} alt='Icon' /></Link>
                                </li>                                                                
                            </ul>
                        </div>
                    </TabPanel>
                    <TabPanel header="Contact Us">
                        <h6 className='font-18 text-center'>contact <strong>us</strong></h6>
                        <ul className='d-flex align-items-center justify-content-center nostyle pt-20 about-social-icon'>
                            <li>
                                <Link to={`mailto:${config.email.email}`}><img src={EnvelopeIcon} alt='Icon' /></Link>
                            </li>
                            <li>
                                <Link onClick={handleClick} to='#'><img src={WhatsappIcon} alt='Icon' /></Link>
                            </li>
                        </ul>
                        <form onSubmit={handleSubmit} className="pt-70">
                            <div className="form-group">
                                <InputText
                                    name="name"
                                    value={formData?.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-100"
                                />
                                {errors.name && <div className="error">{errors.name}</div>}
                            </div>
                            <div className="form-group">
                                <InputText
                                    name="email"
                                    value={formData?.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-100"
                                />
                                {errors.email && <div className="error">{errors.email}</div>}
                            </div>
                            <div className="form-group">
                                <InputText
                                    name="phone"
                                    value={formData?.phone}
                                    onChange={handleChange}
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-100"
                                />
                                {errors.phone && <div className="error">{errors.phone}</div>}
                            </div>
                            <div className="form-group">
                                <InputTextarea
                                    name="message"
                                    value={formData?.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    className="w-100"
                                />
                            </div>

                            <div className="done-button text-right">
                                <button className={`btn formbtn ${isLoading ? 'loading' : ''}`} type="submit" disabled={isLoading}>Done 
                                    <div className="loader-wrap"><span className='loader'></span></div>
                                </button>
                            </div>
                            {/* Display Success or Error Messages */}
                            {successMessage && <div className="success-message form-sucsess-message">{successMessage}</div>}
                            {errorMessage && <div className="error-message form-error-message">{errorMessage}</div>}
                        </form>
                    </TabPanel>
                    <TabPanel header="Policies">
                        <div className='policies-tabs'>
                            <TabView activeIndex={innerActiveIndex} onTabChange={(e) => innerSetActiveIndex(e.index)}>
                                <TabPanel header="Booking Policy">
                                    <div>
                                        <h6 className='font-18 mb-40 text-center'>booking <strong>policy</strong></h6>
                                        <div className='about-pagedesc font-14'>
                                            <p>SSJ Luxury Transport Ltd., trading as SSJ Luxury Transport and/or SSJ Chauffeurs Ltd(hereinafter referred to as “the Carrier”), will accept passengers, luggage, and personal items for transport solely based on the Conditions outlined below. No employee or representative of the Carrier is authorised to modify these Conditions unless expressly permitted in writing by a Director, Principal, Partner, or other authorised individual. Should any legislation be mandatorily applicable to the Contract, and if any part of these Conditions conflicts with such legislation, that part shall be overridden to the extent necessary and no further.</p>
                                            <p>These Conditions of Carriage were last reviewed and updated on the 19 February 2025. </p>
                                            <h3>Section 1: Definitions</h3>
                                            <ul>
                                                <li>“Customer”** refers to the individual or company that enters into a contract with the Carrier for its services.</li>
                                                <li>“Cancellation Fee”** denotes a charge imposed by the Carrier for the cancellation of the Service by the Customer prior to the scheduled collection time.</li>
                                                <li>“Cancellation on Arrival Fee”** indicates a fee applied when a Consignment or Passenger is not ready for collection (for any reason) by the end of the waiting period allowed by the Carrier.</li>
                                                <li>“Conditions”** refers to the terms of carriage specified in this document, including any amendments subsequently communicated to the Customer by the Carrier.</li>
                                                <li>“Contract”** refers to the agreement of carriage between the Customer and the Carrier under these Conditions, applicable to all bookings made between the two parties.</li>
                                                <li>“Price List”** means the document maintained by the Carrier detailing its charges for the Service and any additional fees quoted to the Customer or published on the Carrier’s website prior to or at the time of booking.</li>
                                                <li>“Luggage & Personal Items”** refers to suitcases, trunks, bags, or similar items used by a Passenger to hold their personal belongings during the Service, including other items (e.g., handbags, mobile phones, electronic devices, sunglasses, cameras, and keys) brought into the Vehicle but not contained within a suitcase, trunk, or bag.</li>
                                                <li>“Passenger”** denotes an individual (including the Customer, where applicable) whom the Carrier agrees to transport from one location to another.</li>
                                                <li>“Service”** signifies the transportation of passengers requested by the Customer.</li>
                                                <li>“User”** refers to any Passenger or Customer utilising the Carrier’s in-car WiFi Service.</li>
                                                <li>“WiFi Service”** refers to the equipment, connection, and service provided to Users in the Carrier’s vehicles, granting access to an installed WiFi network connected to the internet.</li>
                                                <li>“Privacy Policy”** refers to the Carrier’s Privacy Policy, which can be accessed by clicking here.</li>
                                            </ul>
                                            <h3>Section 2: Contractual Relationship</h3>
                                            <p>The Carrier, as the Licensed Operator, shall enter into a contractual obligation as the principal with the Customer making the private hire booking to provide the journey specified in the booking, in accordance with the Private Hire Vehicles (London) Act 1998.</p>
                                            <h4>Carriage of Passengers and Luggage</h4>
                                            <p>The Customer acts as an agent for all Passengers.</p>
                                            <h4>Right of Driver to Refuse Carriage</h4>
                                            <p>The driver is responsible for the safety of the Vehicle and its occupants. Any Passenger whose behaviour the driver reasonably determines to be drunken and disorderly, threatening, abusive, dangerous, or in violation of any statutory regulation may be removed from the Vehicle or prevented from boarding. The Customer is responsible for the conduct of any Passenger and shall indemnify the Carrier for any damage or injury caused to the Vehicle, the driver, or any third party’s property by the Customer or any Passenger.
                                            </p>
                                            <h4>Loss of Passengers’ Luggage</h4>
                                            <p>Passenger(s) remain responsible for their Luggage & Personal Items at all times and must ensure that all items are loaded into the Vehicle before the Service begins and unloaded upon its conclusion. The Carrier accepts no liability for any loss or damage to Luggage & Personal Items or for any consequential losses resulting from items not being loaded or unloaded from the Vehicle.</p>
                                            <h4>Passengers Taken Ill</h4>
                                            <p>The Customer is responsible for the conduct of the Passenger(s) and must cover any loss or damage caused by the Passenger(s) to the Vehicle or any other property, including cleaning costs following any spillage or soiling of the Vehicle, as well as any loss of earnings incurred by the Carrier or any subcontractor or employee due to the Vehicle being out of service during the cleaning period.</p>
                                            <h4>Waiting Time – General</h4>
                                            <p>Passenger(s) and any Luggage or Personal Items must be prepared for collection at the time specified by the Customer at the time of booking. The Carrier allows a 10-minute period for waiting or loading when picking up Passenger(s). If all booked Passengers have not boarded the Vehicle within this time, the Carrier reserves the right to charge the Customer for the total loading/waiting time (including the initial 10 minutes) according to the Price List. Additionally, the Carrier may terminate the Contract after the first 10 minutes and may impose a termination fee in accordance with the Price List.</p>
                                            <h4>Waiting Time – Collections from Airports, Seaports, and International Train Terminals</h4>
                                            <p>For collections of Passenger(s) from Airports, Seaports, or International Train terminals, the Carrier allows a 30-minute waiting period (starting from the last estimated arrival or disembarkation time known to the Carrier for the relevant aircraft, train, or ship). After this period, the Carrier reserves the right to charge the Customer for total loading/waiting time (including the first 30 minutes) as per the Price List. The Carrier may also terminate the Contract at any time after the first 30 minutes and may charge a termination fee in accordance with the Price List for such termination.</p>
                                            <h4>Left Luggage</h4>
                                            <p>The Carrier's only obligation regarding any Luggage & Personal Items or other items left in the Vehicle by Passenger(s) upon completion of the Service is to notify the Customer that such items have been found and to provide details on when and where they can be collected.</p>
                                            <h4>Animals</h4>
                                            <p>The Carrier does not permit the transport of any animals, except for Guide Dogs accompanying registered blind Passengers.</p>
                                            <h4>Seat Belts/Legal Requirements/Driver’s Hours</h4>
                                            <p>The Customer and Passenger(s) shall not require the driver of the Vehicle to violate any provisions of the Road Traffic Acts, the Transport Act 1968 (as amended), the AETR Agreement, or EU Regulations (EC Reg. 561/2006, as amended) concerning the driver's maximum daily hours and rest periods. Passenger(s) must comply with all applicable laws and regulations, including the requirement to wear seat belts.</p>
                                            <h4>Minors</h4>
                                            <p>The Carrier will not transport any unaccompanied children under the age of 14.</p>
                                            <h4>Route Taken</h4>
                                            <p>Unless otherwise directed by the Passenger prior to the start of the Service, the routes taken will be determined by the driver based on road, traffic, and weather conditions.</p>
                                            <h4>Missing Flights/Delay</h4>
                                            <p>It is the Customer's responsibility to allocate sufficient time for the completion of the Service. The Carrier provides journey time estimates in good faith but does not guarantee that any journey will be completed within a specific timeframe and shall not be liable for any direct or consequential loss, delay, or inconvenience caused to the Passenger(s) due to the actual duration of the journey, including but not limited to costs associated with flights and hotels.</p>
                                            <h4>Warranty and Limitations of WiFi Service</h4>
                                            <p>The WiFi service is provided on an “as is” and “as available” basis. The Carrier makes no warranties or representations, whether express or implied, regarding the completeness or quality of that service, or its fitness for any particular purpose, but will strive to maintain a high standard of WiFi Service at all times.</p>
                                            <p>Due to the inherent limitations of the service, the User acknowledges that it may not always be possible to provide the WiFi Service entirely free of faults or interruptions, and the Carrier does not commit to doing so.</p>
                                            <p>Data Protection: The parties agree that, for the purposes of the applicable data protection legislation, each party will act as an independent data controller in relation to the personal data it processes in connection with this Agreement. Nothing in this Agreement shall be interpreted as designating either party as the data processor for the other or as joint data controllers concerning personal data. Each party shall be solely and independently responsible for fulfilling its obligations under the UK GDPR and any other relevant data protection legislation.</p>
                                        </div>                                        
                                    </div>
                                </TabPanel>
                                <TabPanel header="Privacy Policy">
                                    <div>
                                        <h6 className='font-18 mb-40 text-center'>privacy <strong>policy</strong></h6>
                                        <div className='about-pagedesc font-14'>
                                            <p>Last updated: February 19, 2025</p>
                                            <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
                                            <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank">Privacy Policy Generator</a>.</p>
                                            <h2>Interpretation and Definitions</h2>
                                            <h3>Interpretation</h3>
                                            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                                            <h3>Definitions</h3>
                                            <p>For the purposes of this Privacy Policy:</p>
                                            <ul>
                                            <li>
                                            <p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
                                            </li>
                                            <li>
                                            <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
                                            </li>
                                            <li>
                                            <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to SSJ Chauffeurs Ltd, 3rd Floor 45-Albemarle Street, London, England, W1S 4JL.</p>
                                            </li>
                                            <li>
                                            <p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>
                                            </li>
                                            <li>
                                            <p><strong>Country</strong> refers to:  United Kingdom</p>
                                            </li>
                                            <li>
                                            <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
                                            </li>
                                            <li>
                                            <p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
                                            </li>
                                            <li>
                                            <p><strong>Service</strong> refers to the Website.</p>
                                            </li>
                                            <li>
                                            <p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
                                            </li>
                                            <li>
                                            <p><strong>Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.</p>
                                            </li>
                                            <li>
                                            <p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
                                            </li>
                                            <li>
                                            <p><strong>Website</strong> refers to SSJ Luxury Transport, accessible from <a href="mailto:ssjluxurytransport.com" rel="external nofollow noopener" target="_blank">ssjluxurytransport.com</a></p>
                                            </li>
                                            <li>
                                            <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
                                            </li>
                                            </ul>
                                            <h2>Collecting and Using Your Personal Data</h2>
                                            <h3>Types of Data Collected</h3>
                                            <h4>Personal Data</h4>
                                            <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
                                            <ul>
                                            <li>
                                            <p>Email address</p>
                                            </li>
                                            <li>
                                            <p>First name and last name</p>
                                            </li>
                                            <li>
                                            <p>Phone number</p>
                                            </li>
                                            <li>
                                            <p>Usage Data</p>
                                            </li>
                                            </ul>
                                            <h4>Usage Data</h4>
                                            <p>Usage Data is collected automatically when using the Service.</p>
                                            <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
                                            <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
                                            <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
                                            <h4>Information from Third-Party Social Media Services</h4>
                                            <p>The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services:</p>
                                            <ul>
                                            <li>Google</li>
                                            <li>Facebook</li>
                                            <li>Instagram</li>
                                            <li>Twitter</li>
                                            <li>LinkedIn</li>
                                            </ul>
                                            <p>If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may collect Personal data that is already associated with Your Third-Party Social Media Service's account, such as Your name, Your email address, Your activities or Your contact list associated with that account.</p>
                                            <p>You may also have the option of sharing additional information with the Company through Your Third-Party Social Media Service's account. If You choose to provide such information and Personal Data, during registration or otherwise, You are giving the Company permission to use, share, and store it in a manner consistent with this Privacy Policy.</p>
                                            <h4>Tracking Technologies and Cookies</h4>
                                            <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
                                            <ul>
                                            <li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</li>
                                            <li><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
                                            </ul>
                                            <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. You can learn more about cookies on <a href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies" target="_blank">TermsFeed website</a> article.</p>
                                            <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
                                            <ul>
                                            <li>
                                            <p><strong>Necessary / Essential Cookies</strong></p>
                                            <p>Type: Session Cookies</p>
                                            <p>Administered by: Us</p>
                                            <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
                                            </li>
                                            <li>
                                            <p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
                                            <p>Type: Persistent Cookies</p>
                                            <p>Administered by: Us</p>
                                            <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
                                            </li>
                                            <li>
                                            <p><strong>Functionality Cookies</strong></p>
                                            <p>Type: Persistent Cookies</p>
                                            <p>Administered by: Us</p>
                                            <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
                                            </li>
                                            </ul>
                                            <p>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</p>
                                            <h3>Use of Your Personal Data</h3>
                                            <p>The Company may use Personal Data for the following purposes:</p>
                                            <ul>
                                            <li>
                                            <p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
                                            </li>
                                            <li>
                                            <p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
                                            </li>
                                            <li>
                                            <p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
                                            </li>
                                            <li>
                                            <p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
                                            </li>
                                            <li>
                                            <p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
                                            </li>
                                            <li>
                                            <p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
                                            </li>
                                            <li>
                                            <p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
                                            </li>
                                            <li>
                                            <p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
                                            </li>
                                            </ul>
                                            <p>We may share Your personal information in the following situations:</p>
                                            <ul>
                                            <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.</li>
                                            <li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                                            <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
                                            <li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
                                            <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.</li>
                                            <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
                                            </ul>
                                            <h3>Retention of Your Personal Data</h3>
                                            <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
                                            <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
                                            <h3>Transfer of Your Personal Data</h3>
                                            <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
                                            <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
                                            <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
                                            <h3>Delete Your Personal Data</h3>
                                            <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
                                            <p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
                                            <p>You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.</p>
                                            <p>Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</p>
                                            <h3>Disclosure of Your Personal Data</h3>
                                            <h4>Business Transactions</h4>
                                            <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
                                            <h4>Law enforcement</h4>
                                            <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
                                            <h4>Other legal requirements</h4>
                                            <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
                                            <ul>
                                            <li>Comply with a legal obligation</li>
                                            <li>Protect and defend the rights or property of the Company</li>
                                            <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                                            <li>Protect the personal safety of Users of the Service or the public</li>
                                            <li>Protect against legal liability</li>
                                            </ul>
                                            <h3>Security of Your Personal Data</h3>
                                            <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
                                            <h2>Children's Privacy</h2>
                                            <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
                                            <p>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>
                                            <h2>Links to Other Websites</h2>
                                            <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
                                            <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
                                            <h2>Changes to this Privacy Policy</h2>
                                            <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
                                            <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
                                            <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                                            <h2>Contact Us</h2>
                                            <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                                            <ul>
                                            <li>By email: <a href="mailto:contact@ssjluxurytransport.com">contact@ssjluxurytransport.com</a></li>
                                           </ul>
                                        </div>                                        
                                    </div>
                                </TabPanel>
                            </TabView>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>          
    </div>     
    
  );
}
export default About; 