import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import characterData from "@/user/data/character_slug.json";

interface CharacterFilterProps {
  show: boolean;
  onToggle: () => void;
  selectedCharacters: string[];
  onCharacterToggle: (name: string) => void;
}

const CharacterFilter = ({
  show,
  onToggle,
  selectedCharacters,
  onCharacterToggle,
}: CharacterFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const allCharacters = characterData.map((char) => ({
    name: char.name,
    slug: char.slug,
    icon: char.image,
  }));

  const displayedCharacters = isExpanded
    ? allCharacters
    : allCharacters.slice(0, 5);

  return (
    <div className="my-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center font-medium rounded-md px-2 py-1 transition"
      >
        <span className="hover:underline">Character</span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ${
            show ? "rotate-180" : ""
          }`}
        />
      </button>

      {show && (
        <div className="mt-2 ml-2 space-y-1">
          {displayedCharacters.map((char) => (
            <div
              key={char.slug}
              onClick={() => onCharacterToggle(char.name)}
              className={`flex items-center space-x-2 cursor-pointer select-none p-1 rounded mb-4 ${
                selectedCharacters.includes(char.name)
                  ? "ring-2 ring-gray-400 bg-gray-50"
                  : "hover:underline"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full overflow-hidden ${
                  selectedCharacters.includes(char.name)
                    ? "ring-2 ring-[#b0a7a7]"
                    : ""
                }`}
              >
                <img
                  src={char.icon}
                  alt={char.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-gray-700">{char.name}</span>
            </div>
          ))}

          {allCharacters.length > 5 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-blue-600 hover:text-blue-800 mt-1 ml-1"
            >
              {isExpanded
                ? "− Show Less"
                : `+ Show More (${allCharacters.length - 5})`}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterFilter;
