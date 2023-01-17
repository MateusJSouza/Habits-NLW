import { TrackerHeadersColors } from './TrackerHeaderColors';

import { PlusIcon } from '../../assets/icons/PlusIcon';

export function TrackerHeader() {
  return (
    <div className="flex justify-between items-center px-36 pb-16 w-[1280px]">
      <div className="flex flex-col">
        <TrackerHeadersColors />
        <p className="text-5xl font-extrabold text-white mt-4">habits</p>
      </div>

      <button
        className="cursor-pointer flex items-center justify-center gap-3
        w-[174px] h-[52px] px-5 py-4 border border-violet-500 rounded-lg
        text-white font-semibold"
      >
        <PlusIcon />
        <span>Novo hábito</span>
      </button>
    </div>
  );
}
