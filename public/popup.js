// Grip Strength Challenge Registration Popup
// Add to WordPress by including this script

(function() {
    'use strict';
    
    const API_BASE = 'https://grip-strength-final-production.up.railway.app/api';
    const POPUP_REAPPEAR_DELAY = 60000; // 60 seconds
    
    let popupShown = false;
    let registrationComplete = false;
    let participantCount = 0;
    
    if (localStorage.getItem('gripStrengthRegistered')) {
        registrationComplete = true;
    }
    
    function createPopupHTML() {
        return `
            <div id="gripStrengthPopup" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                font-family: 'Segoe UI', Arial, sans-serif;
            ">
                <div style="
                    background: #0a0a0a;
                    border: 1px solid #333;
                    padding: 40px;
                    max-width: 450px;
                    width: 90%;
                    position: relative;
                    max-height: 90vh;
                    overflow-y: auto;
                ">
                    <span id="gripStrengthClose" style="
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 24px;
                        cursor: pointer;
                        color: #555;
                        font-weight: bold;
                    ">✕</span>
                    
                    <div style="text-align: center; margin-bottom: 30px;">
                        <p style="font-size: 0.75rem; color: #cc0000; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 10px 0;">Join the Competition</p>
                        <h2 style="margin: 0 0 8px 0; font-size: 1.6rem; color: #fff; text-transform: uppercase; letter-spacing: 2px;">Grip Strength Challenge</h2>
                        <p style="margin: 0; color: #666; font-size: 0.9rem;">Register to compete for cash prizes</p>
                    </div>
                    
                    <!-- Prizes -->
                    <div style="
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        margin-bottom: 25px;
                        padding: 15px 0;
                        border-top: 1px solid #222;
                        border-bottom: 1px solid #222;
                    ">
                        <div style="text-align: center;">
                            <div style="font-size: 0.65rem; color: #555; text-transform: uppercase; letter-spacing: 1px;">1st</div>
                            <div style="font-weight: 700; color: #cc0000; font-size: 1.1rem;">$200</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.65rem; color: #555; text-transform: uppercase; letter-spacing: 1px;">2nd</div>
                            <div style="font-weight: 700; color: #888; font-size: 1.1rem;">$100</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.65rem; color: #555; text-transform: uppercase; letter-spacing: 1px;">3rd</div>
                            <div style="font-weight: 700; color: #8B4513; font-size: 1.1rem;">$50</div>
                        </div>
                    </div>
                    
                    <div id="gripStrengthCounter" style="
                        background: #111;
                        border: 1px solid #222;
                        padding: 12px;
                        margin-bottom: 25px;
                        text-align: center;
                        color: #888;
                        font-size: 0.85rem;
                    ">
                        <span id="gripStrengthCount">${participantCount}</span> competitors registered
                    </div>
                    
                    <div id="gripStrengthSuccess" style="
                        background: rgba(0, 150, 0, 0.1);
                        border: 1px solid #0a0;
                        color: #0c0;
                        padding: 20px;
                        text-align: center;
                        font-weight: 600;
                        margin-bottom: 20px;
                        display: none;
                    ">
                        Registration successful. Head to the competition area when ready.
                    </div>
                    
                    <form id="gripStrengthForm">
                        <div style="margin-bottom: 15px;">
                            <input type="text" id="gripStrengthName" name="name" placeholder="Full Name *" required style="
                                width: 100%;
                                padding: 14px;
                                border: 1px solid #333;
                                font-size: 1rem;
                                box-sizing: border-box;
                                background: #111;
                                color: #fff;
                            ">
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <input type="email" id="gripStrengthEmail" name="email" placeholder="Email Address *" required style="
                                width: 100%;
                                padding: 14px;
                                border: 1px solid #333;
                                font-size: 1rem;
                                box-sizing: border-box;
                                background: #111;
                                color: #fff;
                            ">
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <input type="tel" id="gripStrengthPhone" name="phone" placeholder="Phone Number *" required style="
                                width: 100%;
                                padding: 14px;
                                border: 1px solid #333;
                                font-size: 1rem;
                                box-sizing: border-box;
                                background: #111;
                                color: #fff;
                            ">
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <input type="text" id="gripStrengthCompany" name="company" placeholder="Company / Organization *" required style="
                                width: 100%;
                                padding: 14px;
                                border: 1px solid #333;
                                font-size: 1rem;
                                box-sizing: border-box;
                                background: #111;
                                color: #fff;
                            ">
                        </div>
                        
                        <button type="submit" id="gripStrengthSubmit" style="
                            width: 100%;
                            background: #cc0000;
                            color: white;
                            border: none;
                            padding: 16px;
                            font-size: 1rem;
                            font-weight: 600;
                            cursor: pointer;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                        ">
                            Register Now
                        </button>
                    </form>
                    
                    <p style="text-align: center; margin-top: 15px; font-size: 0.75rem; color: #444;">
                        Your information will only be used for this competition.
                    </p>
                </div>
            </div>
        `;
    }
    
    function showPopup() {
        if (document.getElementById('gripStrengthPopup')) return;
        
        const popup = document.createElement('div');
        popup.innerHTML = createPopupHTML();
        document.body.appendChild(popup);
        
        popupShown = true;
        
        loadParticipantCount();
        
        document.getElementById('gripStrengthClose').addEventListener('click', closePopup);
        document.getElementById('gripStrengthForm').addEventListener('submit', handleSubmit);
        
        document.getElementById('gripStrengthPopup').addEventListener('click', function(e) {
            if (e.target.id === 'gripStrengthPopup') {
                closePopup();
            }
        });
    }
    
    function closePopup() {
        const popup = document.getElementById('gripStrengthPopup');
        if (popup) {
            popup.remove();
            popupShown = false;
        }
    }
    
    async function loadParticipantCount() {
        try {
            const response = await fetch(`${API_BASE}/count`);
            const data = await response.json();
            const countElement = document.getElementById('gripStrengthCount');
            if (countElement) {
                countElement.textContent = data.count;
            }
        } catch (error) {
            console.error('Failed to load participant count:', error);
        }
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('gripStrengthSubmit');
        const formData = new FormData(e.target);
        
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            company: formData.get('company')
        };
        
        submitBtn.textContent = 'Registering...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${API_BASE}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                localStorage.setItem('gripStrengthRegistered', 'true');
                registrationComplete = true;
                
                document.getElementById('gripStrengthForm').style.display = 'none';
                document.getElementById('gripStrengthCounter').style.display = 'none';
                document.getElementById('gripStrengthSuccess').style.display = 'block';
                
                setTimeout(closePopup, 3000);
                
            } else {
                const error = await response.json();
                alert(error.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            alert('Network error. Please check your connection.');
        }
        
        submitBtn.textContent = 'Register Now';
        submitBtn.disabled = false;
    }
    
    function init() {
        if (registrationComplete) return;
        
        setTimeout(showPopup, 2000);
        
        setInterval(() => {
            if (!registrationComplete && !popupShown) {
                showPopup();
            }
        }, POPUP_REAPPEAR_DELAY);
    }
    
    window.openGripStrengthPopup = function() {
        showPopup();
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
