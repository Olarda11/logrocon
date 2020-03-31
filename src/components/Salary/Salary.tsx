import React from "react";

export interface ISalary {
    from: number;
    to: number;
    currency: string;
}

interface SalaryProps {
    salary: ISalary,
    currency: string
}

export const Salary = (props: SalaryProps) => {
    const {salary, currency} = props;

    if (salary) {
        if (!salary.to) {
            return <div>от {salary.from} {currency}</div>
        } else if (!salary.from) {
            return <div>до {salary.to} {currency}</div>
        } else {
            return <div>{salary.from} - {salary.to} {currency}</div>
        }
    } else {
        return null
    }
}
