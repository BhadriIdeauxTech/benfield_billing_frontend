
export const phoneValidator = (rule, value, callback) => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (value && !phoneRegex.test(value)) {
        callback('Please enter amount');
    } else {
        callback();
    }
};
