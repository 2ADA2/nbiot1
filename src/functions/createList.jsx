export const createList = (mass) => {
    let list = ``
    for (let i = 0; i <= mass.MeasList.length - 1; i++) {
        list += `${mass.MeasList[i]} => ${mass.MeasState[i]} \n`
    }
    return list
}
