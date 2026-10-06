import React from 'react';

import C4 from '../assets/C4.png';
import D4 from '../assets/D4.png';
import E4 from '../assets/E4.png';
import F4 from '../assets/F4.png';
import G4 from '../assets/G4.png';
import A5 from '../assets/A5.png';
import B5 from '../assets/B5.png';
import C5 from '../assets/C5.png';
import D5 from '../assets/D5.png';
import E5 from '../assets/E5.png';
import F5 from '../assets/F5.png';
import G5 from '../assets/G5.png';


const NOTE_IMAGES = { C4, D4, E4, F4, G4, A5, B5, C5, D5, E5, F5, G5 };

export default function StaffCard({ note }) {
  return (
    <div className="staff-card-content">
      <img
        src={NOTE_IMAGES[note]}
        alt="Musical note on a treble clef staff"
        className="staff-image"
      />
    </div>
  );
}