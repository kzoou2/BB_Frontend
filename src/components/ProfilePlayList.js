import React, { useState } from 'react';
import {PC,Mobile} from '../components/Responsive';
import sample_music from "../Data/sample_music.json";


function ProfilePlayList(){

    return(
        <div>
            <PC>
                <p>playlist!!!!</p>
            </PC>
            <Mobile></Mobile>
        </div>


    );
}

export default ProfilePlayList;