import React from 'react';
import { GITHUB, LINKEDIN } from '../utils/social-media';

export default function Footer()
{
    return(
        <div className="container footer">
            <div className="custom-card">
                <b>
                    © Alexandru-Andrei Carmici
                </b>
                <br/><br/>
                <a className="social-media" href={GITHUB}>
                    <button aria-label='GitHub' className="btn btn-dark">
                        <i className="fa fa-github"/>
                    </button>
                </a>
                <a className="social-media" href={LINKEDIN}>
                    <button aria-label='Linkedin' className="btn btn-dark">
                        <i className="fa fa-linkedin"/>
                    </button>
                </a>
            </div>
        </div>
    );
}