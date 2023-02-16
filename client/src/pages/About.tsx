import React, { useEffect, useState } from 'react';

export interface IAboutPageProps {}

const AboutPage: React.FunctionComponent<IAboutPageProps> = (props) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', alignItems: 'center', color: '#ffffff', textShadow: '1px 1px 5px black', margin: '10px' }}>
            Stack:
            <ul>
                <li>Postgres</li>
                <li>Express</li>
                <li>React</li>
                <li>Node</li>
            </ul>
        </div>
    );
};

export default AboutPage;
