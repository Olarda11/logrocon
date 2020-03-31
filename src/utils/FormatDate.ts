export const FormatDate = (date: string) => {
    const monthsArr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const day = new Date(date).getDate();
    const month = monthsArr[new Date(date).getMonth()]
    return `${day} ${month}`
}
