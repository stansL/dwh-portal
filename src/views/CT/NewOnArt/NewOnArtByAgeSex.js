import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import * as newOnArtByAgeSexSelectors from '../../../selectors/CT/NewOnArt/newOnArtByAgeSex';

const NewOnArtByAgeSex = () => {
    const [linkageByAgeSex, setNewOnArtByAgeSex] = useState({});
    const ageGroups = useSelector(newOnArtByAgeSexSelectors.getAgeGroups);
    const newOnArtMale = useSelector(newOnArtByAgeSexSelectors.getNewOnArtMale);
    const newOnArtFemale = useSelector(newOnArtByAgeSexSelectors.getNewOnArtFemale);

    const loadNewOnArtByAgeSex = useCallback(async () => {
        setNewOnArtByAgeSex({
            chart: { type: 'bar' },
            title: { text: '' },
            xAxis: [
                { categories: ageGroups, title: { text: '' } },
                { categories: ageGroups, title: { text: '' }, linkedTo: 0, opposite: true }
            ],
            yAxis: [
                { title: { text: 'Number Positive' }, labels: { formatter: function () {
                    return Math.abs(this.value);
                }}}
            ],
            plotOptions: { series: { stacking: 'normal' }, bar: { pointWidth: 18, } },
            tooltip: { formatter: function () {
                return '<b>' + this.series.name + ', Age Group ' + this.point.category + '</b><br/>' +
                        'Number Positive: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
            }},
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Female', data: newOnArtFemale, color: "#EA4C8B" },
                { name: 'Male', data: newOnArtMale, color: "#14084D" }
            ]
        });
    }, [ageGroups, newOnArtMale, newOnArtFemale]);

    useEffect(() => {
        loadNewOnArtByAgeSex();
    }, [loadNewOnArtByAgeSex]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        NEW ON ART DISTRIBUTION BY GROUP AND SEX
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={linkageByAgeSex} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default NewOnArtByAgeSex;
