import { api } from "@/trpc/server";
import {
  startOfToday,
  getDate,
  startOfMonth,
  endOfMonth,
  isMonday,
  previousMonday,
  isSunday,
  nextSunday,
  eachDayOfInterval,
} from "date-fns";
import HistoryItem from "./history-item";

const WorkoutsMonthHistory = async () => {
  const today = startOfToday()

  const startOfMonthDate = startOfMonth(today);
  const endOfMonthDate = endOfMonth(today);

  const firstMonday = isMonday(startOfMonthDate)
    ? startOfMonthDate
    : previousMonday(startOfMonthDate);
  const lastSunday = isSunday(endOfMonthDate)
    ? endOfMonthDate
    : nextSunday(endOfMonthDate);

  const daysOfInterval = eachDayOfInterval({
    start: firstMonday,
    end: lastSunday
  })
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun']

  const monthlyWorkouts = await api.workout.getAllByDateRange({ lte: lastSunday, gte: firstMonday })

  return (<div className="border-slate-200 border-2 rounded-md w-full grid grid-cols-7 gap-2 p-2">
    {
      daysOfWeek.map(day => (
        <p key={day} className="text-center text-sm font-medium">{day}</p>
      ))
    }
    {
      daysOfInterval.map((date) => {
        return <HistoryItem key={date.toDateString()} date={date} isWorkoutComplete={monthlyWorkouts.some(workout => getDate(workout.createdAt) === getDate(date))} />
      })
    }
  </div>);
}

export default WorkoutsMonthHistory;