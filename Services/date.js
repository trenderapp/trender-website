import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import fr from "dayjs/locale/fr";

dayjs.extend(relativeTime)

export const displayDate = (date) => {
    return ` - ${dayjs(date).locale(fr).fromNow(true).replace("une", "1").replace("un", "1")}`;
}

export const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY - HH:mm:ss");
}