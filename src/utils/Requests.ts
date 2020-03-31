const serverUrl = 'https://api.hh.ru/'

interface IqueryParams {
    areaId?: string;
    order_by?: string;
    keyword?: string;
    employment?: string
}

interface IDictionary {
    currency: [],
    employment: []
}

export const Requests = {
    fetchVacancies(queryParams?: IqueryParams) {

        let query = {
            order_by: 'publication_time',
            area: queryParams?.areaId ? queryParams.areaId : '',
            text: queryParams?.keyword ? queryParams?.keyword : '',
            employment: queryParams?.employment ? queryParams?.employment : ''
        };

        const queryString = Object.entries(query).map(([key, value]) => {
            return value ? `${key}=${value}` : ''
        }).join('&');

        return fetch(serverUrl + `vacancies?${queryString}`)
            .then(response => response.json())
            .then(result => {
                // console.log(result.items, 'result.items')
                return result.items
            })
            .catch(e => {
                console.log(e);
            })
    },

    fetchCurrentVacancy(vacancyId: string){
        return fetch(`${serverUrl}vacancies/${vacancyId}`)
            .then(response => response.json())
            .then(result => {
               console.log(result)
                return result
            })
            .catch(e => {
                console.log(e);
            })
    },

    fetchAreas() {
        let result;
        return fetch(serverUrl + 'areas')
            .then(response => response.json())
            .then(areas => {
                result = areas.find((area: any) => {
                    return area.name === 'Россия' // взяла только Россию
                });
                result.areas.sort((a: any, b: any) => {
                        return a.id - b.id
                    }
                );
                return result.areas
            })
            .catch(e => {
                console.log(e);
            })
    },

    fetchCurrentArea(areaId: string) {
        return fetch(serverUrl + `areas/${areaId}`)
            .then(response => response.json())
            .then(result => {
                return result.areas
            })
            .catch(e => {
                console.log(e);
            })
    },

    fetchDictionaries() {
        let dictionary = {} as IDictionary;
        return fetch(serverUrl + 'dictionaries')
            .then(response => response.json())
            .then((dictionaries) => {
                dictionary.currency = dictionaries.currency;
                dictionary.employment = dictionaries.employment;
                return dictionary
            })
            .catch(e => {
                console.log(e);
            })
    },


};

export default Requests;
