import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useSelector } from 'react-redux';
import * as covidAdultPLHIVVaccinatedByGenderSelectors
    from '../../../selectors/CT/Covid/covidAdultPLHIVVaccinatedByGender';

const COVIDAdultPLHIVVaccinatedByGender = () => {
    const [covidVaccinatedByGender, setCovidVaccinatedByGender] = useState({});

    const vaccinated = useSelector(covidAdultPLHIVVaccinatedByGenderSelectors.getAdultPLHIVVaccinatedByGender);

    const loadVaccinatedBySex = useCallback(async () => {
        setCovidVaccinatedByGender({
            title: { text: '' },
            plotOptions: { column: { stacking: 'normal' } },
            xAxis: [{ categories: vaccinated.gender, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', reversed: true, verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'PARTIALLY VACCINATED', data: vaccinated.partiallyVaccinated.map(obj => obj.text), type: 'column', color: "#F08532" },
                { name: 'FULLY VACCINATED', data: vaccinated.fullyVaccinated.map(obj => obj.text), type: 'column', color: "#69B34C" },
            ]
        });
    }, [vaccinated]);

    useEffect(() => {
        loadVaccinatedBySex();
    }, [loadVaccinatedBySex]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                ADULT PLHIV VACCINATED AGAINST COVID-19 BY GENDER
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={covidVaccinatedByGender} />
                </div>
            </CardBody>
        </Card>
    );
};

export default COVIDAdultPLHIVVaccinatedByGender;
