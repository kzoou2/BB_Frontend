import React from 'react';
import { PC, Mobile } from '../Responsive';

function ProfilePlayList() {

    return (
        <div>
            <PC>
                <a href='/BB_Frontend/playlistDetail'>PlaylistDetail 이동</a>
            </PC>
            <Mobile>
                <a href='/BB_Frontend/playlistDetail'>PlaylistDetail 이동</a>
            </Mobile>
        </div>


    );
}

export default ProfilePlayList;