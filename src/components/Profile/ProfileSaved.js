import React from 'react';
import {PC,Mobile} from '../Responsive';

function ProfileSaved({userNickname}){

    return(
        <div>
            <PC>
                <p>{userNickname}    savved!</p>
            </PC>
            <Mobile>
                <p>savved!</p>
            </Mobile>
        </div>

    );
}

export default ProfileSaved;