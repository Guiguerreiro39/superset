import { fromPromise } from "xstate";

type FetchWorkoutsInput = {
  time: number;
};

const fetchWorkouts = fromPromise(
  async ({ input }: { input: FetchWorkoutsInput }) => {
    const timeout = await new Promise((resolve) =>
      setTimeout(() => resolve("Fetched"), input.time),
    );

    if (Math.random() > 0.5) {
      throw new Error("Fetch failed!");
    }

    return [];
  },
);

export default fetchWorkouts;
