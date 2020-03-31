import React, {Component} from "react";
import Requests from "../../utils/Requests";
import {ListGroup, Spinner} from "react-bootstrap";
import {VacancyItem} from "../VacancyItem/VacancyItem";
import Filter from "../Filter/Filter";
import {SearchString} from "../SearchString/SearchString";
import {formatCurrency} from "../../utils/FormatCurrency";
import {IVacancy} from "../VacancyPage/VacancyPage";
import "./Page.scss"

interface IState {
    loading: boolean;
    vacancies: [];
    currencyDictionary: [];
    employmentDictionary: [];
    areas: [];
    region: string;
    citiesInRegion: [];
    currentArea: string;
    currentEmployment: string;
    currentKeyword: string;
}

export class Page extends Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            vacancies: [],
            loading: false,
            currencyDictionary: [],
            employmentDictionary: [],
            areas: [],
            region: '',
            citiesInRegion: [],
            currentArea: '',
            currentKeyword: '',
            currentEmployment: ''
        };

        this.handlerSelectOption = this.handlerSelectOption.bind(this);
        this.handlerKeyword = this.handlerKeyword.bind(this);
    }

    componentDidMount(): void {

        this.getActualVacancy();

        Requests.fetchDictionaries().then((result: any) => {
            this.setState(
                {
                    currencyDictionary: result.currency,
                    employmentDictionary: result.employment
                })
        });

        Requests.fetchAreas().then((result: any) => {
            this.setState({areas: result})
        })
    }

    getActualVacancy(param?: {}) {
        Requests.fetchVacancies(param).then((result) => {
            this.setState({vacancies: result, loading: true})
        })
    }

    getActualArea(param: string) {
        Requests.fetchCurrentArea(param).then((result: any) => {
            this.setState({citiesInRegion: result})
        })
    }

    handlerKeyword(text: string) {
        this.setState({currentKeyword: text});
        this.getActualVacancy({keyword: text, area: this.state.currentArea})
    }

    handlerSelectOption(type: string, value: string) {
        const {currentArea, currentEmployment, currentKeyword} = this.state;
        switch (type) {
            case 'region':
                this.setState({region: value, currentArea: value});
                this.getActualVacancy({areaId: value, keyword: currentKeyword, employment: currentEmployment});
                this.getActualArea(value);
                break;
            case 'citiesInRegion':
                this.setState({currentArea: value});
                this.getActualVacancy({areaId: value, keyword: currentKeyword, employment: currentEmployment});
                break;
            case 'employment':
                this.setState({currentEmployment: value});
                this.getActualVacancy({areaId: currentArea, keyword: currentKeyword, employment: value});
                break;
            default:
                return '';
        }
    }

    render() {
        const {vacancies, loading, region, citiesInRegion, areas, employmentDictionary} = this.state;

        return (
            <>
                {loading ?
                    <div className="page">
                        <div className="page__container">
                            <div className="page__sidebar">
                                <Filter label="Регион" name="region" data={areas}
                                        handlerSelectOption={this.handlerSelectOption}/>
                                {region ?
                                    <Filter label="Выберете город" name="citiesInRegion"
                                            data={citiesInRegion}
                                            handlerSelectOption={this.handlerSelectOption}/>
                                    : ''}

                                <Filter label="Тип занятости" name="employment" data={employmentDictionary}
                                        handlerSelectOption={this.handlerSelectOption}/>
                            </div>

                            <div className="page__content">

                                <SearchString handlerKeyword={this.handlerKeyword}/>

                                {vacancies.length > 1 ?
                                    <ListGroup className="page__list">

                                        {vacancies.map((vacancy: IVacancy) => {
                                            return (
                                                <VacancyItem key={vacancy.id}
                                                             vacancy={vacancy}
                                                             currency={vacancy.salary ? formatCurrency(this.state.currencyDictionary, vacancy.salary?.currency) : ''}
                                                />
                                            )
                                        })}
                                    </ListGroup>
                                    : <div>Ничего не найдено</div>}
                            </div>
                        </div>
                    </div>
                    : <div className="page">
                        <div className="page__spinnerContainer">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner></div>
                    </div>
                }
            </>
        )
    }
}
