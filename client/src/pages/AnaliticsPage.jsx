import React from 'react';
import AthletesBySport from '../components/analitics/AthletesBySport';
import AthletesByCountry from '../components/analitics/AthletesByCountry';
import SportsByCountry from '../components/analitics/SportsByCountry';

const AnaliticsPage = () => {
    return (
        <div>
            <h1>Analitics</h1>
            <AthletesBySport/>
            <hr />
            <AthletesByCountry/>
            <hr />
            <SportsByCountry/>
        </div>
    );
}

export default AnaliticsPage;
