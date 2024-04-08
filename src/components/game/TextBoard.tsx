import React from "react";

type TextBoardProps = {
  phrase: string;
  typedText: string;
  startIdx: number;
  enemiesProgress: Record<string, number>;
};

const TextBoard: React.FC<TextBoardProps> = ({
  phrase,
  typedText,
  startIdx,
  enemiesProgress,
}) => {
  const renderCharacterSpan = (char: string, index: number) => {
    const isCompleted = index < startIdx;
    const isMatching = startIdx <= index && index < startIdx + typedText.length;
    const isMisMatching = isMatching && char !== typedText[index - startIdx];
    const isEnemyProgress = Object.values(enemiesProgress).includes(index);

    const classNames = [
      "inline-block",
      isCompleted ? "text-green-300" : "",
      isMatching ? "text-green-500" : "",
      isMisMatching ? "text-red-500" : "",
      isEnemyProgress ? "bg-purple-300" : "",
    ].join(" ");

    return (
      <span key={index} className={classNames}>
        {char === " " ? "\u00A0" : char}
      </span>
    );
  };

  const renderCharacterSpans = () => {
    return phrase
      .split("")
      .map((char, index) => renderCharacterSpan(char, index));
  };

  const insertCursor = (spanArr: JSX.Element[]) => {
    const cursorSpan = (
      <span key="cursor" className="inline-block text-black">
        |
      </span>
    );
    return [
      ...spanArr.slice(0, startIdx + typedText.length),
      cursorSpan,
      ...spanArr.slice(startIdx + typedText.length),
    ];
  };

  const spans = renderCharacterSpans();
  const spansWithCursor = insertCursor(spans);

  return (
    <div className="text-3xl font-bold text-gray-800 p-4 max-w-lg mx-auto">
      {spansWithCursor}
    </div>
  );
};

export default TextBoard;
