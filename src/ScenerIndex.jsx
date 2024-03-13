import React, { useState } from 'react';
import { Link } from 'react-router-dom';


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
       <>
  <Link to="/selfie" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 124</Link>
  <Link to="/backphoto" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 130</Link>
  <Link to="/camura" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 131</Link>
  <Link to="/selfie" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 132</Link>
  <a onClick={openFigmaLink} style={{ fontSize: '2rem', margin: '1rem' }}>Scen 208</a>

  <Link to="/camura" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 236</Link>
  <Link to="/selfie" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 315</Link>
  <Link to="/livestream" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 420 (uppfälld)</Link>
  <Link to="/livestream" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 508 (uppfälld)</Link>
  <Link to="#" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 508 del 2 (ihopfälld)</Link>
  <Link to="/back" style={{ fontSize: '2rem', margin: '1rem' }}>Scen 609?</Link>
</>
        </div>
    );
}

export default ScenerIndex;
