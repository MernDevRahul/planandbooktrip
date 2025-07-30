import "./Terms.css";


const Terms = () => {

    return (
        <>
            <div className="terms-container">
                <h1 className="terms-title">Terms and Services</h1>
                <p className="terms-text">
                    Welcome to our Jivyuv Pan and Book Trip Travel Agency. By using our services, you agree to the following terms and conditions.
                </p>

                <h2 className="terms-subtitle">1. Booking and Payments</h2>
                <ul className="terms-list">
                    <li>All bookings require full or partial payment in advance.</li>
                    <li>We accept payments via credit card, PayPal, and bank transfers.</li>
                    <li>Failure to complete payment may result in cancellation.</li>
                </ul>

                <h2 className="terms-subtitle">2. Cancellations and Refunds</h2>
                <ul className="terms-list">
                    <li>Cancellations made 7 days before departure are fully refundable.</li>
                    <li>Last-minute cancellations may incur a fee.</li>
                    <li>Refund processing time is 5-10 business days.</li>
                </ul>

                <h2 className="terms-subtitle">3. Travel Responsibilities</h2>
                <ul className="terms-list">
                    <li>Customers must carry valid identification and travel documents.</li>
                    <li>We are not responsible for delays caused by third-party providers.</li>
                    <li>Insurance is recommended for all travelers.</li>
                </ul>

                <h2 className="terms-subtitle">4. Contact Us</h2>
                <p className="terms-text">
                If you have any questions, please contact us at <strong>contact@planandbooktrip.com,geetu@planandbooktrip.complete</strong>.
                </p>
            </div>
        </>
    );
};

export default Terms;