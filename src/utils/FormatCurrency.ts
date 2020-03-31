interface ICurrency {
    code: string;
    abbr: string;
    name: string;
    default: boolean;
    rate: number;
    in_use: boolean;
}

export const formatCurrency = (currencyDictionary: [], salary: string) => {
    const result = currencyDictionary.filter((value: ICurrency) => {
        return value.code === salary
    }) as ICurrency[];

    if (!result[0]) {
        return ''
    }
    return result[0].abbr
};
