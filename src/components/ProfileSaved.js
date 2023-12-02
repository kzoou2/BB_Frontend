import React, { useState } from 'react';
import {PC,Mobile} from '../components/Responsive';
import sample_music from "../Data/sample_music.json";

function ProfileSaved(){

    return(
        <div>
            <PC>
                <p>savved!</p>
            </PC>
            <Mobile>
                <p>savved!</p>
            </Mobile>
        </div>

    );
}

export default ProfileSaved;