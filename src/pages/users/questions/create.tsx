import AnswerField from "@/src/components/AnswerField";
import { type NextPage } from "next";
import { Fragment, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import { trpc } from "@/src/utils/trpc";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export type Answer = {
  id: string;
  content: string;
  status: boolean;
};

const CreateQuestionPage: NextPage = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = trpc.question.getCategory.useQuery();
  const { mutate, isLoading: isSubmitting } = trpc.question.create.useMutation({
    onSuccess() {
      setOpen(true);
    },
  });
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const [answers, setAnswers] = useState<Answer[]>([
    {
      id: uuidv4(),
      content: "",
      status: false,
    },
    {
      id: uuidv4(),
      content: "",
      status: false,
    },
  ]);

  const handleAnswerChange = (id: string) => {
    return (values: string) => {
      setAnswers((prev) => {
        return prev.map((answer) => {
          if (answer.id === id) {
            return {
              id: answer.id,
              content: values,
              status: answer.status,
            };
          }
          return answer;
        });
      });
    };
  };

  const handleCorrectCheck = (id: string) => {
    return () => {
      setAnswers((prev) => {
        return prev.map((answer) => {
          if (answer.id === id) {
            return {
              id: answer.id,
              content: answer.content,
              status: true,
            };
          }
          return {
            id: answer.id,
            content: answer.content,
            status: false,
          };
        });
      });
    };
  };

  const removeAnswer = (id: string) => {
    return () => {
      setAnswers((prev) => {
        return prev.filter((answer) => answer.id !== id);
      });
    };
  };
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (isLoading || isError) return <div>Loading</div>;

  return (
    <div className="flex w-full justify-center">
      <form
        className="flex w-96 flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (categoryRef.current?.value && contentRef.current?.value) {
            mutate({
              category: categoryRef.current.value,
              answers,
              questionContent: contentRef.current.value,
            });
          }
        }}
      >
        <h2>Create Question Form</h2>
        <label className="flex flex-col text-sm">
          Question content
          <textarea
            className="resize-none"
            rows={4}
            cols={20}
            ref={contentRef}
            required
          ></textarea>
        </label>

        <label className="flex flex-col text-sm">
          Category
          <select ref={categoryRef}>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </label>

        <div className="text-sm">
          <p>Answers (mark the correct answers)</p>
          {answers.map((answer, i) => {
            return (
              <AnswerField
                key={answer.id}
                handleAnswerChange={handleAnswerChange(answer.id)}
                handleCorrectCheck={handleCorrectCheck(answer.id)}
                removeAnswer={removeAnswer(answer.id)}
                removable={i > 1}
              />
            );
          })}
        </div>

        <button
          type="button"
          className="w-full border border-gray-800 py-1"
          onClick={() => {
            setAnswers((prev) => {
              return [
                ...prev,
                {
                  id: uuidv4(),
                  content: "",
                  status: false,
                },
              ];
            });
          }}
        >
          <PlusIcon className="mx-auto h-5 w-5" />
        </button>

        <button
          type="submit"
          className={`mx-auto rounded-lg bg-blue-600 py-2 px-4 font-semibold text-blue-200 hover:bg-blue-700 disabled:cursor-progress disabled:bg-gray-500`}
          disabled={isSubmitting}
        >
          Submit question
        </button>
      </form>

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => router.reload()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Questions Created!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-gray-500">
                      Question successfully created! Do you want to create
                      another quesion?
                    </p>
                  </div>

                  <div className="mt-4 flex gap-4">
                    <Link
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-red-200 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-300"
                      href={"/users/questions"}
                    >
                      <ArrowLeftIcon className="h-3 w-3" />
                      Go back
                    </Link>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-blue-200 hover:bg-blue-700"
                      onClick={() => router.reload()}
                    >
                      Create another question
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CreateQuestionPage;
