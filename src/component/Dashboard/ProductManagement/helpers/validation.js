import moment from 'moment';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]{8,}$/s;

export const spaceValidation = (value) => (value) ? value.toString().trim() !== '' : true;

export const passwordValidation = (value) => value && PASSWORD_REGEX.test(value);

export const ignoreNegativeValue = (value) => value && value > 0;

export const onlyNumbers = (value) => value ? /^[0-9]+$/.test(value) : true;

export const numberLetterValidation = (value) => value ? /^[0-9a-zA-Z]+$/.test(value) : true;

export const maxLengthValidation = (len) => (value) => value ? String(value)?.length <= len : true;

export const minLengthValidation = (len) => (value) => value ? String(value)?.length >= len : true;

export const experienceValidate = (data, experienceYear, setError, errorName, errorType, shouldFocus) => {
    if (data?.length > 0) {
        let momentDates = data?.map(x => x && moment(x?.passingYear)).filter(Boolean);
        const minDate = moment.min(momentDates);
        const diffYear = moment().get('year') - moment(minDate).get('year');

        if (+experienceYear && (diffYear < +experienceYear)) {
            if (setError && errorName && errorType) {
                setError(errorName, { type: errorType, shouldFocus });
                return false;
            }
        }
    }
    return true;
}

export const numberInput = event => {
    if (
        (event?.keyCode === 8) ||
        (event?.keyCode >= 48 && event?.keyCode <= 57) ||
        (event?.keyCode >= 37 && event?.keyCode <= 49)
    ) {
        return true;
    } else {
        event.preventDefault();
    }
}