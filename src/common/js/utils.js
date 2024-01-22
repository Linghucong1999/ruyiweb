/**
 * 生成uuid
 * @returns {string}
 */
export const createUUID = function () {
    let date = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        date += performance.now();
    }

    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
};