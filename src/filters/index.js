/**
 * 封装过滤器
 */
import dayjs from "dayjs";

const filter = {
    //日期格式化
    dateFormat: function (value) {
        return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    }
};

export default filter;