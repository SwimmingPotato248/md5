import { MinusCircleIcon } from "@heroicons/react/24/solid";
import { type FC } from "react";

type AnswerFieldProps = {
  handleAnswerChange: (values: string) => void;
  isCorrect: boolean;
  removeAnswer?: () => void;
};

const AnswerField: FC<AnswerFieldProps> = ({
  handleAnswerChange,
  isCorrect,
  removeAnswer,
}) => {
  return (
    <div className="flex items-center gap-2">
      <textarea
        className={`resize-none ${isCorrect ? "bg-green-500" : ""}`}
        rows={1}
        cols={32}
        onChange={(e) => {
          e.target.rows = Math.floor(e.target.value.length / e.target.cols) + 1;
          handleAnswerChange(e.target.value);
        }}
        required
      ></textarea>
      {removeAnswer && (
        <button type="button" onClick={() => removeAnswer()}>
          <MinusCircleIcon className="h-4 w-4 text-red-600" />
        </button>
      )}
    </div>
  );
};

export default AnswerField;
