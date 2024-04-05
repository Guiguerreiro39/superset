import { assign, setup } from "xstate";
import fetchWorkouts from "@/xstate/workouts/actors/fetch-workouts";
import { isWorkoutsNotEmpty } from "@/xstate/workouts/guards/workouts-guards";

type FetchWorkoutsMachineTypes = {
  events: { type: "RETRY" };
  context: {
    workouts: string[];
    error: string | null;
  };
};

export const fetchWorkoutsMachine = setup({
  types: {} as FetchWorkoutsMachineTypes,
  actors: {
    fetchWorkouts,
  },
  guards: {
    isWorkoutsNotEmpty,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMwBcDGALA6gewCcBrPAVzQFkBDbASwDswA6WiAGzAGIAxAUQBUAwgAkA2gAYAuolAAHPLFppaeejJAAPRACZxTACzaArAHYAHAEZjAGhABPRAFoAzGZNMT451aMBfX7aomLiEJOTUdIxMbHhUEAxQnBCqzAwAbnhEzEHY+MRkaLAS0kgg8orKqupaCNoAnGZMFgBsJnXNbka2DgguZnriZg36ziZ+ASA5IfnhNFgMzDFxCZxgBASETLJsVGjIhAC2TFN5YYXF6uVKKmqlNfUWTOJGZkZ1o132Tv0edfUdY38gXQuVCBQi8yiyCotDYpAIXAASgJEQBNC6lK6VW6gGrOJ7aZwjMbdJzafR6CziCxGZrGIGTEHTM4QhbHGFwhGcDSwNC7ZhUZBoNYACl04nEAEpOCcwbNItkOfCwBi5AprlU7ogzM0mKMqe8SV9ehY6kYmADxhN6HgIHB1LKZpQ5gtLursdUnKbtHqzNpLDZjY4XnUms99JaGY6WS6oqwOG6KjdPSb9Ppff6fKTeq53J5vPSJtHwbHFrF4vQoImNTjNDpnPi2v9OtnHOS9CZmmaC+NgcFTiWFUxYKQMBg4PBMe7k1qEN5HnV2uJDZ8esHqRbw5Gi0yB-LIYrYcrqx7Zw2nkZxOYs0G3kxac0KXSrb4gA */
  id: "fetchWorkoutsMachine",
  initial: "loading",
  context: {
    workouts: [],
    error: null,
  },
  states: {
    loading: {
      invoke: {
        id: "fetchWorkouts",
        src: "fetchWorkouts",
        input: () => ({ time: 2000 }),
        onDone: [
          {
            target: "success",
            guard: {
              type: "isWorkoutsNotEmpty",
              params: ({ event }) => ({
                workouts: event.output,
              }),
            },
            actions: assign(({ event }) => ({
              workouts: event.output,
            })),
          },
          {
            target: "empty",
          },
        ],
        onError: {
          target: "failure",
          actions: assign(({ event }) => ({
            error: (event.error as Error).message,
          })),
        },
      },
    },
    empty: {
      on: {
        RETRY: {
          target: "loading",
          actions: assign(() => ({
            workouts: [],
            error: null,
          })),
        },
      },
    },
    success: {
      type: "final",
    },
    failure: {
      on: {
        RETRY: {
          target: "loading",
          actions: assign(() => ({
            workouts: [],
            error: null,
          })),
        },
      },
    },
  },
  output: ({ context }) => context,
});
