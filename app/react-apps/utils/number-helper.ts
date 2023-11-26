export function NumberSeparator (value:number) {
    if(typeof value != 'number'){
        value = Number(value)
    }
    return Number(value).toLocaleString();


}