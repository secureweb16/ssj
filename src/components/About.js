import React, { useState } from 'react';
import MercedesSClass from '../assets/images/mercedes-s-class.jpg';

import { TabView, TabPanel } from 'primereact/tabview';
import {Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputTextarea  } from "primereact/inputtextarea";
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

import InstagramIcon from '../assets/images/instagram.svg';
import EnvelopeIcon from '../assets/images/envelope.svg';
import WhatsappIcon from '../assets/images/whatsapp-black-icon.svg';


function About(){    
    const [activeIndex, setActiveIndex] = useState(0);
    const [innerActiveIndex, innerSetActiveIndex] = useState(0);

    return(
    <div className='about-tabs pb-90'> 
        <div className='about-tabs-inner plr-100'> 
            <div className='about-tabs-main'>        
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="About Us">
                        <div className='text-center'>
                            <h6 className='font-18 mb-30'>about <strong>us</strong></h6>
                            <div className='about-pagedesc font-16'>
                                <p className='font-16 mb-20'>Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit hendrerit convallis nascetur ac purus facilisis urna egestas? Lacus libero sociosqu faucibus per ultricies senectus. Pulvinar in egestas varius magnis nisl a. Nullam tincidunt est gravida scelerisque dictum elementum. Tortor dictumst eleifend porttitor; quam dignissim mattis. Mattis nisl auctor nam rutrum sem eu elit. Nibh urna netus ridiculus mollis venenatis nec aptent eu tempus?</p>
                                <p className='font-16'>Faucibus consequat urna; nullam habitant eget nostra eget. Tortor sapien vitae sollicitudin, eget commodo fringilla. Turpis molestie lobortis taciti malesuada purus. Montes quis pharetra erat viverra commodo habitant dui. Faucibus id tellus sit neque senectus porttitor. Congue aenean parturient lorem cubilia ex fusce habitasse tempus. Nulla litora pretium dis vitae in ut.</p>
                            </div>
                            <ul className='d-flex align-items-center justify-content-center nostyle pt-40 about-social-icon'>
                                <li>
                                    <Link to=""><img src={InstagramIcon} alt='Icon' /></Link>
                                </li>
                                <li>
                                    <Link to=""><img src={EnvelopeIcon} alt='Icon' /></Link>
                                </li>                                                                
                            </ul>
                        </div>
                    </TabPanel>
                    <TabPanel header="Contact Us">
                        <h6 className='font-18 text-center'>contact <strong>us</strong></h6>
                        <ul className='d-flex align-items-center justify-content-center nostyle pt-20 about-social-icon'>
                            <li>
                                <Link to=""><img src={InstagramIcon} alt='Icon' /></Link>
                            </li>
                            <li>
                                <Link to=""><img src={EnvelopeIcon} alt='Icon' /></Link>
                            </li>
                            <li>
                                <Link to=""><img src={WhatsappIcon} alt='Icon' /></Link>
                            </li>
                        </ul>
                        <form className='pt-70'>
                            <div className='form-group'>
                                <InputText type="text" placeholder="your name" className='w-100'/>
                            </div>
                            <div className='form-group'>
                                <InputText type="email" placeholder="your email" className='w-100'/>
                            </div>
                            <div className='form-group'>
                                <InputNumber type="text" placeholder="phone number" className='w-100'/>
                            </div>
                            <div className='form-group'>
                                <InputTextarea placeholder="your message" className='w-100'></InputTextarea>
                            </div>
                            <div className='done-button text-right'>
                                <Button className="btn formbtn">Done</Button>
                            </div>
                        </form>
                    </TabPanel>
                    <TabPanel header="Polices">
                        <div className='policies-tabs'>
                            <TabView activeIndex={innerActiveIndex} onTabChange={(e) => innerSetActiveIndex(e.index)}>
                                <TabPanel header="Booking Policy">
                                    <div>
                                        <h6 className='font-18 mb-40 text-center'>booking <strong>policy</strong></h6>
                                        <div className='about-pagedesc font-14'>
                                            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Dignissim tincidunt sagittis faucibus metus taciti cras. Turpis velit lectus inceptos sodales libero ex. Mauris malesuada curae nec rutrum feugiat. Nostra at bibendum nisl sed conubia senectus. Ligula nostra curabitur parturient, nisi eleifend mus mauris elementum ac. Nibh aliquet mi torquent neque orci pretium taciti ligula. Sem aliquet sed vestibulum gravida volutpat. Maximus id congue duis dolor scelerisque varius fusce elementum.</p>
                                            <p>Magnis convallis quis est condimentum consequat; risus ac viverra blandit. Varius ligula elit taciti porttitor vivamus ornare vitae. Himenaeos nascetur euismod cursus volutpat porta hac? Integer dignissim nibh convallis velit habitasse mollis. Dis volutpat neque eros elementum fermentum nec? Integer dui enim quis est facilisis dolor.</p>
                                            <p>Cubilia sed malesuada accumsan imperdiet efficitur est tristique convallis. Aproin magna porttitor duis curabitur diam. Nam sociosqu ipsum libero facilisis volutpat litora arcu. Curabitur augue habitant a pharetra maximus neque dis felis fames. At interdum torquent malesuada ornare blandit nascetur curabitur. Sem nascetur accumsan magna quisque aliquet ante. Phasellus semper sollicitudin velit tristique suscipit.</p>
                                            <p>Erat tempus morbi imperdiet class rhoncus pellentesque pellentesque. Aliquet nisl per odio; id nec vitae vestibulum. Consequat ultricies gravida suspendisse, aenean non interdum ullamcorper pellentesque. Sagittis hac dictum purus malesuada nulla integer ex mus. Purus cursus pretium dapibus justo lorem nulla. Vel tortor nulla pharetra posuere massa tempus erat turpis. Morbi consectetur sem ut taciti gravida odio nec. Finibus nam lobortis amet rutrum senectus auctor.</p>
                                            <p>Faucibus interdum consequat convallis dapibus habitant. Ipsum suscipit risus lacinia fermentum torquent duis nostra. Duis rhoncus primis euismod ad nibh facilisis? Posuere lorem etiam sem; tempor eros ex dictum. Aenean enim nisl massa at inceptos euismod cursus. Libero porttitor habitant platea platea pulvinar. Commodo tristique ultrices, facilisis primis cursus ad nibh maximus. Nascetur volutpat finibus nascetur platea eleifend mattis.</p>
                                        </div>                                        
                                    </div>
                                </TabPanel>
                                <TabPanel header="Privacy Policy">
                                    <div>
                                        <h6 className='font-18 mb-40 text-center'>privacy <strong>policy</strong></h6>
                                        <div className='about-pagedesc font-14'>
                                            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Dignissim tincidunt sagittis faucibus metus taciti cras. Turpis velit lectus inceptos sodales libero ex. Mauris malesuada curae nec rutrum feugiat. Nostra at bibendum nisl sed conubia senectus. Ligula nostra curabitur parturient, nisi eleifend mus mauris elementum ac. Nibh aliquet mi torquent neque orci pretium taciti ligula. Sem aliquet sed vestibulum gravida volutpat. Maximus id congue duis dolor scelerisque varius fusce elementum.</p>
                                            <p>Magnis convallis quis est condimentum consequat; risus ac viverra blandit. Varius ligula elit taciti porttitor vivamus ornare vitae. Himenaeos nascetur euismod cursus volutpat porta hac? Integer dignissim nibh convallis velit habitasse mollis. Dis volutpat neque eros elementum fermentum nec? Integer dui enim quis est facilisis dolor.</p>
                                            <p>Cubilia sed malesuada accumsan imperdiet efficitur est tristique convallis. Aproin magna porttitor duis curabitur diam. Nam sociosqu ipsum libero facilisis volutpat litora arcu. Curabitur augue habitant a pharetra maximus neque dis felis fames. At interdum torquent malesuada ornare blandit nascetur curabitur. Sem nascetur accumsan magna quisque aliquet ante. Phasellus semper sollicitudin velit tristique suscipit.</p>
                                            <p>Erat tempus morbi imperdiet class rhoncus pellentesque pellentesque. Aliquet nisl per odio; id nec vitae vestibulum. Consequat ultricies gravida suspendisse, aenean non interdum ullamcorper pellentesque. Sagittis hac dictum purus malesuada nulla integer ex mus. Purus cursus pretium dapibus justo lorem nulla. Vel tortor nulla pharetra posuere massa tempus erat turpis. Morbi consectetur sem ut taciti gravida odio nec. Finibus nam lobortis amet rutrum senectus auctor.</p>
                                            <p>Faucibus interdum consequat convallis dapibus habitant. Ipsum suscipit risus lacinia fermentum torquent duis nostra. Duis rhoncus primis euismod ad nibh facilisis? Posuere lorem etiam sem; tempor eros ex dictum. Aenean enim nisl massa at inceptos euismod cursus. Libero porttitor habitant platea platea pulvinar. Commodo tristique ultrices, facilisis primis cursus ad nibh maximus. Nascetur volutpat finibus nascetur platea eleifend mattis.</p>
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