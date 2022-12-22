import { trpc } from "@/src/utils/trpc";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import { useRef, useState } from "react";

const CreateExamPage: NextPage = () => {
  const [search, setSearch] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const { data } = trpc.question.getQuestions.useQuery();
  const { mutate } = trpc.exam.create.useMutation({
    onSuccess() {
      alert("Success");
    },
  });
  const titleRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mx-auto w-[450px]">
      <form
        className="bg-slate-200 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (titleRef.current) {
            mutate({
              title: titleRef.current.value,
              questions: selectedQuestions,
            });
          }
        }}
      >
        <label className="flex flex-col">
          <p className="text-sm font-semibold">Exam title</p>
          <input type={"text"} required ref={titleRef} />

          <h2 className="mt-6 text-sm font-semibold">Selected questions</h2>
          <div>
            {data
              ?.filter((question) => selectedQuestions.includes(question.id))
              .map((question) => {
                return (
                  <div
                    key={question.id}
                    className="flex justify-between px-4 py-2 odd:bg-blue-200 even:bg-blue-300"
                  >
                    <div>{question.content}</div>
                    <button
                      onClick={() =>
                        setSelectedQuestions((prev) =>
                          prev.filter((id) => id !== question.id)
                        )
                      }
                    >
                      <MinusCircleIcon className="h-6 w-6 text-red-600 hover:text-red-700" />
                    </button>
                  </div>
                );
              })}
          </div>
        </label>
        <button className="mx-auto mt-4 block rounded-md bg-blue-500 px-4 py-2 text-blue-100 hover:bg-blue-600">
          Submit exam
        </button>
      </form>
      <div className="mt-10">
        <h2 className="text-sm font-semibold">Your questions</h2>
        <input
          type={"search"}
          className="w-full"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          {data
            ?.filter((question) => !selectedQuestions.includes(question.id))
            .filter((question) =>
              question.content.toLowerCase().includes(search.toLowerCase())
            )
            .map((question) => {
              return (
                <div
                  key={question.id}
                  className="flex justify-between px-4 py-2 odd:bg-gray-200 even:bg-gray-300"
                >
                  <div>{question.content}</div>
                  <button
                    onClick={() => {
                      setSelectedQuestions((prev) => [...prev, question.id]);
                    }}
                  >
                    <PlusCircleIcon className="h-6 w-6 text-green-600 hover:text-green-700" />
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CreateExamPage;
