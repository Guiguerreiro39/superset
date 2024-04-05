export const isWorkoutsNotEmpty = (
  _: unknown,
  params: { workouts: string[] },
) => params.workouts.length > 0;
