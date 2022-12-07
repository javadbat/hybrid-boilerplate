import jalaliday from 'jalaliday';
import dayjs from 'dayjs';
if (typeof dayjs.calendar !== "function") {
    dayjs.extend(jalaliday);
}

function getDateDiff(date1, date2) {

    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60) - (diffDays * 24));
    const diffMinutes = Math.floor(diffTime / (1000 * 60) - (diffHours * 60) - (diffDays * 24 * 60));
    const date = (dayjs(date2).calendar('jalali').locale('fa').format('YYYY/MM/DD'));

    return (
        {
            milliseconds: diffTime,
            minutes: diffMinutes,
            hours: diffHours,
            days: diffDays,
            date: date
        }
    );
}

function getDateDiffString(date1, date2) {

    const diffObj = getDateDiff(date1, date2);
    if (diffObj.days > 0) {
        return diffObj.date;
    }
    else if (diffObj.hours > 0) {
        return diffObj.hours + ' ساعت';
    }
    else if (diffObj.minutes > 0) {
        return diffObj.minutes + ' دقیقه';
    }
    else return 'هم اکنون';
}

export { getDateDiff, getDateDiffString };