import React from "react";
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import {IVacancy} from "../VacancyPage/VacancyPage";
import {FormatDate} from "../../utils/FormatDate";
import {FormatText} from "../../utils/FormatText";
import {Salary} from "../Salary/Salary"
import "./VacancyItem.scss";

interface VacancyProps {
    vacancy: IVacancy;
    currency: string;
}

export const VacancyItem = (props: VacancyProps) => {
    const {vacancy, currency} = props;
    return (
        <ListGroup.Item className="vacancyItem">
            <div className="vacancyItem__header">
                <Link className="vacancyItem__title" to={vacancy.id}>
                    {vacancy.name}
                </Link>

                <Salary salary={vacancy.salary} currency={currency}/>
            </div>

            <div className="vacancyItem__employer_name">{vacancy.employer.name}</div>
            <div className="vacancyItem__city">{vacancy.area.name}</div>
            <div className="vacancyItem__info">{FormatText(vacancy.snippet.requirement)}</div>
            <div className="vacancyItem__info">{FormatText(vacancy.snippet.responsibility)}</div>
            <div className="vacancyItem__publish_date">{FormatDate(vacancy.published_at)}</div>
        </ListGroup.Item>
    )
};

