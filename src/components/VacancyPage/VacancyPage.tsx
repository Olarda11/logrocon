import React, {Component} from 'react';
import Requests from "../../utils/Requests";
import {ISalary, Salary} from "../Salary/Salary";
import {formatCurrency} from "../../utils/FormatCurrency";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import "./VacancyPage.scss"

export interface IVacancy {
    name: string;
    id: string;
    created_at: string;
    published_at: string;
    employer: {
        name: string;
    }
    area: {
        name: string;
    }
    snippet: {
        requirement: string;
        responsibility: string;
    }
    salary: ISalary;
    address: IAddress;
    description: string;
}
export interface IAddress {
    city: string;
    street: string;
    building: null;
    raw: string;
}

interface IState {
    vacancy: IVacancy | null;
    loading: boolean;
    currencyDictionary: [];
}

interface IProps {
    url: string;
}

export class VacancyPage extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            loading: false,
            vacancy: null,
            currencyDictionary: []
        }
    }

    componentDidMount(): void {
        let vacancyId = this.props.url.slice(1);

        Requests.fetchCurrentVacancy(vacancyId).then((result: IVacancy) => {
            this.setState({vacancy: result, loading: true})
        });
        Requests.fetchDictionaries().then((result: any) => {
            this.setState({currencyDictionary: result.currency})
        });

    }

    renderAddress(address: IAddress) {
        let addressString = `${address.city} ${address.street ? `, ${address.street}` : ''}${address.building ? ` , ${address.building}` : ''}`;
        return <div>{addressString}</div>
    }

    render() {

        if (!this.state.vacancy) {
            return null
        }
        const {vacancy, loading, currencyDictionary} = this.state;

        return (
            <div>
                {loading ?
                    <div className="vacancy">
                        <div className="vacancy__toHome">
                            <Link to="/">
                                <Button>Обратно</Button>
                            </Link>
                        </div>
                        <div className="vacancy__title">{vacancy.name}</div>
                        <div>{vacancy.area.name}</div>
                        <Salary salary={vacancy?.salary}
                                currency={formatCurrency(currencyDictionary, vacancy.salary?.currency)}/>
                        {vacancy.address ? this.renderAddress(vacancy.address) : ''}

                        <div className="vacancy__info" dangerouslySetInnerHTML={{__html: vacancy.description}}></div>
                    </div>
                    : ''}
            </div>
        )
    }
}
