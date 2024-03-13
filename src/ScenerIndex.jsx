import React, { useState } from 'react';

const ScenerIndex = ({ children }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    function openFigmaLink() {
        const figmaLink = 'https://www.figma.com/proto/auKRZtC2DQUlbdmg165SYV/VAKA?page-id=0%3A1&type=design&node-id=359-38424&viewport=-162%2C-2429%2C0.14&t=NFPLXSwRQsJajyts-8&scaling=scale-down&starting-point-node-id=359%3A38424&hotspot-hints=0&hide-ui=1';
        const figmaAppIntent = `intent://view?url=${encodeURIComponent(figmaLink)}#Intent;scheme=figma;package=com.figma.android;end`;
        
        // Check if the Figma app is installed
        fetch(figmaAppIntent)
            .then(response => {
                // Figma app is installed, open the link
                window.location.href = figmaAppIntent;
            })
            .catch(error => {
                // Figma app is not installed, open the Figma link in browser
                window.open(figmaLink, '_blank');
            });
    }

    return (
        <div style={{ backgroundColor: 'green', display: 'flex', height:'100vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <a href="/selfie" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 124</a> 
            <a href="/backphoto" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 130</a> 
            <a href="/camura" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 131</a>
            <a href="/selfie" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 132</a>
            <a onClick={openFigmaLink} style={{ fontSize: '2rem', margin: '1rem' }}>Scen 208</a>
            <a href="/camura" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 236</a>
            <a href="/selfie" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 315</a>
            <a href="/livestream" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 420 (uppfälld)</a>
            <a href="/livestream" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 508 (uppfälld)</a>
            <a href="#" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 508 del 2 (ihopfälld)</a>
            <a href="/back" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 609?</a>
            
        </div>
    );
}

export default ScenerIndex;
