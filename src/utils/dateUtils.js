import moment from "moment";

export const checkInterval = (startDate, endDate) => {
  const momentStartDate = moment(startDate);
  const momentEndDate = moment(endDate);

  if (momentEndDate.isBefore(momentStartDate)) {
    throw new Error("The end date cannot be before the start date");
  }

  if (momentStartDate.add(7, "days").isBefore(momentEndDate)) {
    throw new Error(" The max range in one query is 7 days");
  }
};
