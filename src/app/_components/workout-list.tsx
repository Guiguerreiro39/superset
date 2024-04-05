"use client";

import { useMachine } from "@xstate/react";
import { fetchWorkoutsMachine } from "../machine";

export const WorkoutList = () => {
  const [snapshot, send] = useMachine(fetchWorkoutsMachine);

  return (
    <div className="flex flex-col">
      <span>{snapshot.value}</span>
      <div className="flex items-center gap-4">
        {snapshot.matches("failure") && (
          <span className="text-red-500">{snapshot.context.error}</span>
        )}
        {snapshot.can({ type: "RETRY" }) && (
          <button
            className="bg-red-200"
            onClick={() => send({ type: "RETRY" })}
          >
            RETRY
          </button>
        )}
      </div>
      {snapshot.matches("success") && (
        <ul>
          {snapshot.context.workouts.map((workout) => (
            <li key={workout}>{workout}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
