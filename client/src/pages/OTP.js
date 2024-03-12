import React, { useState } from 'react';

const OTP = () => {
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle the OTP here
        console.log(otp); // Example: Log the OTP to the console
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>Enter OTP</h2>
                <input 
                    type="text" 
                    placeholder='One-Time Passcode' 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ margin: '10px 0', padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Verify</button>
            </form>
        </div>
    );
};

export default OTP;