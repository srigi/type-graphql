import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

// Extend dayjs with the advancedFormat plugin
dayjs.extend(advancedFormat);

export const advancedDayjs = dayjs;
