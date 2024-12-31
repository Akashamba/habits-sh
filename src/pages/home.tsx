import { Plus } from "lucide-react";
import React from "react";
import { Habit } from "../components/Habit";
import { CreateModal } from "../components/modals/CreateModal";
import { Page } from "../components/Page";
import { Habit as HabitType, useUser } from "../state/user";
import { Reorder } from "framer-motion";

export default function Home() {
  const { habits, createHabit, updateUserInfo } = useUser();
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [habitsList, setHabitsList] = React.useState<HabitType[]>();

  React.useEffect(() => {
    setHabitsList(habits);
  }, [habits]);

  React.useEffect(() => {
    updateUserInfo();
  }, [localStorage]);

  return (
    <>
      {showCreateModal && (
        <CreateModal onClose={() => setShowCreateModal(false)} />
      )}

      <Page>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-6xl font-bold">habits</h1>
          <h2 className="text-light-gray">Track your habits every day</h2>
        </div>

        <div className="flex w-full max-w-full flex-col gap-2 md:max-w-[750px]">
          <Reorder.Group
            axis="y"
            onReorder={setHabitsList}
            values={habitsList ?? []}
          >
            <div className="flex w-full max-w-full flex-col gap-2 md:max-w-[750px]">
              {habitsList?.map((habit) => (
                <Habit habit={habit} key={habit.id} />
              ))}
            </div>
          </Reorder.Group>

          <button
            className="flex h-24 w-full items-center justify-center gap-2 rounded-lg bg-gray text-xl font-bold duration-100 hover:bg-opacity-80"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="size-8" /> Create
          </button>
        </div>
      </Page>
    </>
  );
}
