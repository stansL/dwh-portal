import React, { Component } from "react";

class CountyFooter extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <span className="reporting-rates-overview-text">
                                The overall reporting rate for March, 2020 is the number of EMR
                                sites that uploaded data in March, 2020.
                            </span>
                        </div>
                        <div className="col-6">
                            <div className="reporting-rates-overview-copyright">
                                &copy; 2020 Palladium Group
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CountyFooter;
