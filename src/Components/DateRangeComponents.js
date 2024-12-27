import React from 'react'
import { getCurrentMonthDates, getPreviousMonthDates, getFullYear } from '../utils/getDaysRange'
import { Select } from './Form/Select';

export const DateRangeComponents = ({ name,label,onChange }) => {

    const currentMonthDates = getCurrentMonthDates();
    const PreviousMonthDates = getPreviousMonthDates();
    const FullYear = getFullYear();

    const rangeSelOptions = [
        { label: 'This Month', value: `${currentMonthDates.startOfMonthDate},${currentMonthDates.endOfMonthDate}` },
        { label: 'Last Month', value: `${PreviousMonthDates.PreStartOfMonthDate},${PreviousMonthDates.PreEndOfMonthDate}` },
        { label: 'This Year', value: `${FullYear.startOfYearDate},${FullYear.endOfYearDate}` },
    ];


    const SetDateRanges = (selectedValue) => {
        onChange(selectedValue);
    }


    return (
        <Select name={name} label={label} options={rangeSelOptions} onChange={SetDateRanges} />
    )
}




// ================   Usage Of Dage Range Component  ===============

// import { DateRangeComponents } from '../../../Components/DateRangeComponents'
// import { getCurrentMonthDates } from '../../../utils/getDaysRange'


// const currentMonthDates = getCurrentMonthDates();

// ===============  Initial Value For date Range 
//   const [dateRange, setDateRange] = useState([]);
//   const [initialDateRange, setInitialDateRange] = useState([dayjs(`${currentMonthDates.startOfMonthDate}`), dayjs(`${currentMonthDates.endOfMonthDate}`)]);

// initialValues={
//     {
//       range: initialDateRange,
//       rangeselector:'This Month'
//     }
//   }

// const SetDateRanges = (value) => {
//     const dateString = value;
//     const newDateRange = dateString.split(',').map((dateString) => dayjs(dateString));
//     setInitialDateRange(newDateRange);
//     setDateRange(newDateRange);
//     form.setFieldsValue({ range: newDateRange });

// const dateObject = { startDate: dateArray[0], endDate: dateArray[1] }; // Create an object with startDate and endDate properties
// const jsonString = JSON.stringify(dateObject); // Convert the object to a JSON string
// }

// <DateRangeComponents onChange={SetDateRanges} />