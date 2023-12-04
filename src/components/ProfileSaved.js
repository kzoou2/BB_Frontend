import React, { useState } from 'react';
import {PC,Mobile} from '../components/Responsive';

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