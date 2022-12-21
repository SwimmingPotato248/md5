import { MinusCircleIcon } from "@heroicons/react/24/solid";
import { type FC } from "react";

type AnswerFieldProps = {
  handleAnswerChange: (values: string) => void;
  handleCorrectCheck: () => void;
  removeAnswer: () => void;
  removable: boolean;
};

const AnswerField: FC<AnswerFieldProps> = ({
  handleAnswerChange,
  handleCorrectCheck,
  removeAnswer,
  removable,
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="radio"
        name="correct"
        required={true}
        onChange={() => handleCorrectCheck()}
      />
      <textarea
        className="resize-none"
        rows={1}
        cols={32}
        onChange={(e) => {
          e.target.rows = Math.floor(e.target.value.length / e.target.cols) + 1;
          handleAnswerChange(e.target.value);
        }}
        required
      ></textarea>
      {removable && (
        <button type="button" onClick={() => removeAnswer()}>
          <MinusCircleIcon className="h-4 w-4 text-red-600" />
        </button>
      )}
    </div>
  );
};

export default AnswerField;
