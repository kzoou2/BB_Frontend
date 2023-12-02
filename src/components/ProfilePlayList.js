import React, { useState } from 'react';
import {PC,Mobile} from '../components/Responsive';
import sample_music from "../Data/sample_music.json";


function ProfilePlayList(){

    return(
        <div>
            <PC>
                <p>playlist!!!!</p>
            </PC>
            <Mobile>
                <p>playlist!!!!</p>
            </Mobile>
        </div>


    );
}

export default ProfilePlayList;