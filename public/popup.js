// Grip Strength Challenge Registration Popup
// Embeds on Universal Truck Service website

(function() {
    'use strict';
    
    // Configuration - UPDATE THIS URL AFTER DEPLOYING TO RAILWAY
    const API_BASE = 'https://YOUR-RAILWAY-APP-URL.railway.app/api';
    const POPUP_REAPPEAR_DELAY = 45000; // 45 seconds
    
    let popupShown = false;
    let registrationComplete = false;
    let participantCount = 0;
    
    // Check if user already registered
    if (localStorage.getItem('gripStrengthRegistered')) {
        registrationComplete = true;
    }
    
    // Create popup HTML
    function createPopupHTML() {
        return `
            <div id="gripStrengthPopup" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.85);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                font-family: Arial, sans-serif;
            ">
                <div style="
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    border-radius: 20px;
                    padding: 2rem;
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                    max-height: 90vh;
                    overflow-y: auto;
                    border: 2px solid #ffd700;
                ">
                    <span id="gripStrengthClose" style="
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 28px;
                        cursor: pointer;
                        color: #93c5fd;
                        font-weight: bold;
                    ">&times;</span>
                    
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <div style="font-size: 60px; margin-bottom: 10px;">💪</div>
                        <h2 style="margin: 0 0 5px 0; font-size: 26px; color: #ffd700;">GRIP STRENGTH CHALLENGE</h2>
                        <p style="margin: 0; color: #93c5fd; font-size: 1.1rem;">Test Your Strength. Win Big!</p>
                    </div>
                    
                    <!-- Prizes -->
                    <div style="
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        margin-bottom: 1.5rem;
                    ">
                        <div style="text-align: center;">
                            <div style="font-size: 1.5rem;">🥇</div>
                            <div style="font-weight: bold; color: #ffd700;">$200</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 1.5rem;">🥈</div>
                            <div style="font-weight: bold; color: #c0c0c0;">$100</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 1.5rem;">🥉</div>
                            <div style="font-weight: bold; color: #cd7f32;">$50</div>
                        </div>
                    </div>
                    
                    <div id="gripStrengthCounter" style="
                        background: rgba(255, 215, 0, 0.1);
                        border: 2px solid #ffd700;
                        border-radius: 8px;
                        padding: 12px;
                        margin-bottom: 1.5rem;
                        text-align: center;
                        color: #ffd700;
                        font-weight: bold;
                    ">
                        Join <span id="gripStrengthCount">${participantCount}</span> others competing for prizes!
                    </div>
                    
                    <div id="gripStrengthSuccess" style="
                        background: rgba(16, 185, 129, 0.2);
                        border: 2px solid #10b981;
                        color: #6ee7b7;
                        padding: 20px;
                        border-radius: 8px;
                        text-align: center;
                        font-weight: bold;
                        margin-bottom: 1.5rem;
                        display: none;
                    ">
                        ✅ Registration successful! Head to the competition area when ready.
                    </div>
                    
                    <form id="gripStrengthForm">
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #93c5fd;">Full Name *</label>
                            <input type="text" id="gripStrengthName" name="name" required style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid #3b82f6;
                                border-radius: 8px;
                                font-size: 16px;
                                box-sizing: border-box;
                                background: rgba(0,0,0,0.3);
                                color: white;
                            ">
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #93c5fd;">Email Address *</label>
                            <input type="email" id="gripStrengthEmail" name="email" required style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid #3b82f6;
                                border-radius: 8px;
                                font-size: 16px;
                                box-sizing: border-box;
                                background: rgba(0,0,0,0.3);
                                color: white;
                            ">
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #93c5fd;">Phone Number *</label>
                            <input type="tel" id="gripStrengthPhone" name="phone" required style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid #3b82f6;
                                border-radius: 8px;
                                font-size: 16px;
                                box-sizing: border-box;
                                background: rgba(0,0,0,0.3);
                                color: white;
                            ">
                        </div>
                        
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #93c5fd;">Company/Organization *</label>
                            <input type="text" id="gripStrengthCompany" name="company" required style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid #3b82f6;
                                border-radius: 8px;
                                font-size: 16px;
                                box-sizing: border-box;
                                background: rgba(0,0,0,0.3);
                                color: white;
                            ">
                        </div>
                        
                        <button type="submit" id="gripStrengthSubmit" style="
                            width: 100%;
                            background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
                            color: white;
                            border: none;
                            padding: 15px;
                            border-radius: 8px;
                            font-size: 18px;
                            font-weight: bold;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">
                            💪 Join the Challenge!
                        </button>
                    </form>
                    
                    <p style="text-align: center; margin-top: 1rem; font-size: 12px; color: #93c5fd;">
                        Your information is secure and will only be used for this competition.
                    </p>
                </div>
            </div>
        `;
    }
    
    // Show popup
    function showPopup() {
        // If already shown and visible, don't create duplicate
        if (document.getElementById('gripStrengthPopup')) return;
        
        const popup = document.createElement('div');
        popup.innerHTML = createPopupHTML();
        document.body.appendChild(popup);
        
        popupShown = true;
        
        // Load participant count
        loadParticipantCount();
        
        // Add event listeners
        document.getElementById('gripStrengthClose').addEventListener('click', closePopup);
        document.getElementById('gripStrengthForm').addEventListener('submit', handleSubmit);
        
        // Close popup when clicking outside
        document.getElementById('gripStrengthPopup').addEventListener('click', function(e) {
            if (e.target.id === 'gripStrengthPopup') {
                closePopup();
            }
        });
    }
    
    // Close popup
    function closePopup() {
        const popup = document.getElementById('gripStrengthPopup');
        if (popup) {
            popup.remove();
            popupShown = false;
        }
    }
    
    // Load participant count
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
    
    // Handle form submission
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
                // Success
                localStorage.setItem('gripStrengthRegistered', 'true');
                registrationComplete = true;
                
                // Hide form, show success message
                document.getElementById('gripStrengthForm').style.display = 'none';
                document.getElementById('gripStrengthSuccess').style.display = 'block';
                
                // Update participant count
                loadParticipantCount();
                
                // Close popup after 3 seconds
                setTimeout(closePopup, 3000);
                
            } else {
                const error = await response.json();
                alert(error.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            alert('Network error. Please check your connection.');
        }
        
        submitBtn.textContent = '💪 Join the Challenge!';
        submitBtn.disabled = false;
    }
    
    // Initialize popup behavior
    function init() {
        if (registrationComplete) return;
        
        // Show popup after 1 second
        setTimeout(showPopup, 1000);
        
        // Set up reappearance timer
        setInterval(() => {
            if (!registrationComplete && !popupShown) {
                showPopup();
            }
        }, POPUP_REAPPEAR_DELAY);
    }
    
    // Expose function to manually trigger popup (for "Sign Up Now" button)
    window.openGripStrengthPopup = function() {
        showPopup();
    };
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
