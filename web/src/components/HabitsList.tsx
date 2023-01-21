import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

interface HabitsListProps {
  date: Date
}

interface HabitsInfoProps {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[]
}

export function HabitsList({ date }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfoProps>();

  useEffect(() => {
    api.get('day', {
      // Vai ser convertido para queryParams
      params: {
        date: date.toISOString(),
      }
    }).then(response => {
      setHabitsInfo(response.data);
    });
  }, []);

  return (


    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map(habit => {
        return (
          <Checkbox.Root
            key={habit.id}
            checked={habitsInfo.completedHabits.includes(habit.id)} // quando o ID do hábito está dentro da lista dos hábitos completos, quer dizer que ele foi completado
            className="flex items-center gap-3 group" // adicionando a prop group
          >
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500" // se o estado for checked, aplica o background no checkbox
            >
              <Checkbox.Indicator>
                <Check size={20} className="text-white"/>
              </Checkbox.Indicator>
            </div>

            <span
              className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
            >
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
