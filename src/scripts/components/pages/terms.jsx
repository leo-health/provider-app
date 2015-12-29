var React = require('react');

module.exports = React.createClass({
  render: function(){
    return(
<section class="ppn">
<header data-role="page-header">
    <section data-role="company">
        <h1>Leo Health</h1>
        <h2>Pediatrics</h2>
    </section>
    <section data-role="contact">
        <address>
            33 W 17th Street<br/>
            New York, NY 10011<br/>
        </address>
    </section>
</header>

<section class="notice-body">
<header data-role="section-header">
    <h1><span>Your Information.</span> <span>Your Rights.</span> <span>Our Responsibilities.</span></h1>
    <section>
        <p>This notice describes how medical information about you may be used and disclosed and how you can get access
            to this information.</p>
        <strong>Please review it carefully</strong>
    </section>
</header>

<section data-role="section-body">

<section data-role="item-links">
</section>


<article data-type="rights" data-pl-more-info>
    <header><span>Your Rights</span></header>
    <section data-role="contents">
        <h2>You have the right to:</h2>
        <ul>
            <li>Get a copy of your paper or electronic medical record</li>
            <li>Correct your paper or electronic medical record</li>
            <li>Request confidential communication</li>
            <li>Ask us to limit the information we share</li>
            <li>Get a list of those with whom we’ve shared your information</li>
            <li>Get a copy of this privacy notice</li>
            <li>Choose someone to act for you</li>
            <li>File a complaint if you believe your privacy rights have been violated</li>
        </ul>
        <a data-ng-click="showMoreInfo()" data-role="more-info">See more information on these rights and how to exercise
            them</a>

        <section data-role="more-info-contents">
            <header>
                <h3>When it comes to your health information, you have certain rights.</h3>
                <h4>This section explains your rights and some of our responsibilities to help you.</h4>
            </header>

            <dl>
                <dt>Get an electronic or paper copy of your medical record</dt>
                <dd>
                    <ul>
                        <li>You can ask to see or get an electronic or paper copy of your medical record and other health
                            information we have about you. Ask us how to do this.</li>
                        <li>We will provide a copy or a summary of your health information, usually within 30 days of your
                            request. We may charge a reasonable, cost-based fee.</li>
                    </ul>
                </dd>
            </dl>


            <dl>
                <dt>Ask us to correct your medical record</dt>
                <dd>
                    <ul>
                        <li>You can ask us to correct health information about you that you think is incorrect or
                            incomplete. Ask us how to do this.</li>
                        <li>We may say “no” to your request, but we’ll tell you why in writing within 60 days.</li>
                    </ul>
                </dd>
            </dl>

            <dl>
                <dt>Request confidential communications</dt>
                <dd>
                    <ul>
                        <li>You can ask us to contact you in a specific way (for example, home or office phone) or to send
                            mail to a different address.</li>
                        <li>We will say “yes” to all reasonable requests.</li>
                    </ul>
                </dd>
            </dl>

            <dl>
                <dt>Ask us to limit what we use or share</dt>
                <dd>
                    <ul>
                        <li>You can ask us not to use or share certain health information for treatment, payment, or our
                            operations. We are not required to agree to your request, and we may say “no” if it would affect
                            your care.</li>
                        <li>If you pay for a service or health care item out-of-pocket in full, you can ask us not to share
                            that information for the purpose of payment or our operations with your health insurer. We will
                            say “yes” unless a law requires us to share that information.</li>
                    </ul>
                </dd>
            </dl>

            <dl>
                <dt>Get a list of those with whom we’ve shared information</dt>
                <dd>
                    <ul>
                        <li>You can ask for a list (accounting) of the times we’ve shared your health information for six
                            years prior to the date you ask, who we shared it with, and why.</li>
                        <li>We will include all the disclosures except for those about treatment, payment, and health care
                            operations, and certain other disclosures (such as any you asked us to make). We’ll provide one
                            accounting a year for free but will charge a reasonable, cost-based fee if you ask for another
                            one within 12 months.</li>
                    </ul>
                </dd>
            </dl>

            <dl>
                <dt>Get a copy of this privacy notice</dt>
                <dd>You can ask for a paper copy of this notice at any time, even if you have agreed to receive the notice
                    electronically. We will provide you with a paper copy promptly.
                </dd>
            </dl>

            <dl>
                <dt>Choose someone to act for you</dt>
                <dd>
                    <ul>
                        <li>If you have given someone medical power of attorney or if someone is your legal guardian, that
                            person can exercise your rights and make choices about your health information.</li>
                        <li>We will make sure the person has this authority and can act for you before we take any action.</li>
                    </ul>
                </dd>
            </dl>

            <dl>
                <dt>File a complaint if you feel your rights are violated</dt>
                <dd>
                    <ul>
                        <li>You can complain if you feel we have violated your rights by contacting us using the information
                            on page 1.</li>
                        <li>You can file a complaint with the U.S. Department of Health and Human Services Office for Civil
                            Rights by sending a letter to
                            <br/><br/>
                            <address>
                                200 Independence Avenue, S.W.<br/>
                                Washington, D.C. 20201
                            </address>
                            by calling 1-877-696-6775, or visiting <a
                                    href="http://www.hhs.gov/ocr/privacy/hipaa/complaints/" target="_blank">HHS.GOV Complaints
                                <i class="fa fa-external-link"></i></a>.
                        </li>
                        <li>We will not retaliate against you for filing a complaint.</li>
                    </ul>
                </dd>
            </dl>
        </section>
    </section>

</article>


<article data-type="choices" data-pl-more-info>
    <header><span>Your Choices</span></header>
    <section data-role="contents">
        <h2>You have some choices in the way that we use and share information as we:</h2>
        <ul>
            <li>Tell family and friends about your condition</li>
            <li>Provide disaster relief</li>
            <li>Include you in a hospital directory</li>
            <li>Provide mental health care</li>
            <li>Market our services and sell your information</li>
            <li>Raise funds</li>
        </ul>
        <a data-ng-click="showMoreInfo()" data-role="more-info">See more information on these choices and how to exercise
            them</a>
        <section data-role="more-info-contents">
            <header>
                <h3>For certain health information, you can tell us your choices about what we share.</h3>
                <h4>If you have a clear preference for how we share your information in the situations described below, talk
                    to us. Tell us what you want us to do, and we will follow your instructions.</h4>
            </header>

            <dl>
                <dt>In these cases, you have both the right and choice to tell us to:</dt>
                <dd>
                    <ul>
                        <li>Share information with your family, close friends, or others involved in your care</li>
                        <li>Share information in a disaster relief situation</li>
                        <li>Include your information in a hospital directory</li>
                    </ul>
                </dd>
                <dd>
                    <em>If you are not able to tell us your preference, for example if you are unconscious, we may go ahead
                        and share your information if we believe it is in your best interest. We may also share your
                        information when needed to lessen a serious and imminent threat to health or safety.</em>
                </dd>
            </dl>

            <dl>
                <dt>In these cases we never share your information unless you give us written permission:</dt>
                <dd>
                    <ul>
                        <li>Marketing purposes</li>
                        <li>Sale of your information</li>
                        <li>Most sharing of psychotherapy notes</li>
                    </ul>
                </dd>
            </dl>

            <dl>
                <dt>In the case of fundraising:</dt>
                <dd>
                    <ul>
                        <li>We may contact you for fundraising efforts, but you can tell us not to contact you again.</li>
                    </ul>
                </dd>
            </dl>
        </section>
    </section>
</article>


<article data-type="uses" data-pl-more-info>
    <header><span>Our Uses and Disclosures</span></header>
    <section data-role="contents">
        <h2>We may use and share your information as we:</h2>
        <ul>
            <li>Treat you</li>
            <li>Run our organization</li>
            <li>Bill for your services</li>
            <li>Help with public health and safety issues</li>
            <li>Do research</li>
            <li>Comply with the law</li>
            <li>Respond to organ and tissue donation requests</li>
            <li>Work with a medical examiner or funeral director</li>
            <li>Address workers’ compensation, law enforcement, and other government requests</li>
            <li>Respond to lawsuits and legal actions</li>
        </ul>
        <a data-ng-click="showMoreInfo()" data-role="more-info">See more information on these uses and disclosures</a>

        <section data-role="more-info-contents">
            <header>
                <h3>How do we typically use or share your health information?</h3>
                <h4>We typically use or share your health information in the following ways.</h4>
            </header>

            <dl>
                <dt>Treat you</dt>
                <dd>
                    <ul>
                        <li>We can use your health information and share it with other professionals who are treating you.
                        </li>
                    </ul>
                </dd>
                <dd data-role="example">
                    <span>Example:</span> A doctor treating you for an injury asks another doctor about your overall health
                    condition.
                </dd>
            </dl>

            <dl>
                <dt>Run our organization</dt>
                <dd>
                    <ul>
                        <li>We can use and share your health information to run our practice, improve your care, and contact
                            you when necessary.
                        </li>
                    </ul>
                </dd>
                <dd data-role="example">
                    <span>Example:</span> We use health information about you to manage your treatment and services.
                </dd>
            </dl>

            <dl>
                <dt>Bill for your services</dt>
                <dd>
                    <ul>
                        <li>We can use and share your health information to bill and get payment from health plans or other
                            entities.
                        </li>
                    </ul>
                </dd>
                <dd data-role="example">
                    <span>Example:</span> We give information about you to your health insurance plan so it will pay for
                    your services.
                </dd>
            </dl>


            <header>
                <h3>How else can we use or share your health information?</h3>
                <h4>We are allowed or required to share your information in other ways – usually in ways that contribute to
                    the public good, such as public health and research. We have to meet many conditions in the law before
                    we can share your information for these purposes. For more information see: <a href="http://www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/index.html" target="_blank">HHS.GOV consumer home <i class="fa fa-external-link"></i></a>.</h4>
            </header>

            <dl>
                <dt>Help with public health and safety issues</dt>
                <dd>
                    <ul>
                        <li> We can share health information about you for certain situations such as:
                            <ul>
                                <li>Preventing disease</li>
                                <li>Helping with product recalls</li>
                                <li>Reporting adverse reactions to medications</li>
                                <li>Reporting suspected abuse, neglect, or domestic violence</li>
                                <li>Preventing or reducing a serious threat to anyone’s health or safety</li>
                            </ul>
                        </li>
                    </ul>
                </dd>
                <dd data-role="example"></dd>
            </dl>

            <dl>
                <dt>Do research</dt>
                <dd>
                    <ul>
                        <li>We can use or share your information for health research.</li>
                    </ul>
                </dd>
                <dd data-role="example"></dd>
            </dl>


            <dl>
                <dt>Comply with the law</dt>
                <dd>
                    <ul>
                        <li>We will share information about you if state or federal laws require it, including with the
                            Department of Health and Human Services if it wants to see that we’re complying with federal
                            privacy law.
                        </li>
                    </ul>
                </dd>
                <dd data-role="example"></dd>
            </dl>


            <dl>
                <dt>Respond to organ and tissue donation requests</dt>
                <dd>
                    <ul>
                        <li>We can share health information about you with organ procurement organizations.</li>
                    </ul>
                </dd>
                <dd data-role="example"></dd>
            </dl>


            <dl>
                <dt>Work with a medical examiner or funeral director</dt>
                <dd>
                    <ul>
                        <li>We can share health information with a coroner, medical examiner, or funeral director when an
                            individual dies.
                        </li>
                    </ul>
                </dd>
                <dd data-role="example"></dd>
            </dl>


            <dl>
                <dt>Address workers’ compensation, law enforcement, and other government requests</dt>
                <dd>
                    <ul>
                        <li>We can use or share health information about you:
                            <ul>
                                <li>For workers’ compensation claims</li>
                                <li>For law enforcement purposes or with a law enforcement official</li>
                                <li>With health oversight agencies for activities authorized by law</li>
                                <li>For special government functions such as military, national security, and presidential
                                    protective services</li>
                            </ul>
                        </li>
                    </ul>
                </dd>
                <dd data-role="example"></dd>
            </dl>


            <dl>
                <dt>Respond to lawsuits and legal actions</dt>
                <dd>
                    <ul>
                        <li>We can share health information about you in response to a court or administrative order, or in
                            response to a subpoena.
                        </li>
                    </ul>
                </dd>
                <dd data-role="example"></dd>
            </dl>
        </section>

        <section data-ng-show="getSpecialNotes()">
            <h2>Special Notes</h2>
        </section>

        <section data-ng-show="getStateLaws()">
            <h2>Applicable State and Other Laws</h2>
        </section>

        <section>
            <h2>Electronic Access</h2>
            Leo Health provides electronic access to your health information via PatientPrivilege.
        </section>
    </section>
</article>

<article data-role="em" data-type="responsibilities">
    <header><span>Our Responsibilities</span></header>
    <ul>
        <li>We are required by law to maintain the privacy and security of your protected health information.</li>
        <li>We will let you know promptly if a breach occurs that may have compromised the privacy or security of your
            information.</li>
        <li>We must follow the duties and privacy practices described in this notice and give you a copy of it.</li>
        <li>We will not use or share your information other than as described here unless you tell us we can in writing.
            If you tell us we can, you may change your mind at any time. Let us know in writing if you change your mind.</li>
    </ul>

    <section class="container">
        <section>
            For more information see: <a
                href="http://www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/noticepp.html" target="_blank">HHS.GOV consumer notice<i
                class="fa fa-external-link"></i></a>.
        </section>

        <section>
            <strong>Changes to the Terms of this Notice</strong>

            <p>We can change the terms of this notice, and the changes will apply to all information we have about
                you.
                The new notice will be available upon request, in our office, and on our web site.</p>
        </section>

        <p>This notice is effective as of <strong>12/01/2015</strong></p>

        <p><strong>Nayan Jain, Chief Privacy Officer</strong></p>
    </section>
</article>
</section>
</section>

</section>
    )
  }
});