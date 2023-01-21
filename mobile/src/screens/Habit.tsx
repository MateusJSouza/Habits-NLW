import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

import { api } from '../lib/axios';
import { generateProgressPercentage } from '../utils/generate-progress-percentage';

import { BackButton } from '../components/BackButton';
import { ProgressBar } from '../components/ProgressBar';
import { Checkbox } from '../components/Checkbox';
import { Loading } from '../components/Loading';
import { HabitsEmpty } from '../components/HabitsEmpty';

interface Params {
  date: string;
}

interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[]
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  // Cálculo dos hábitos
  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length)
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get('/day', { params: { date }, });
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);

    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    // Verificando se nos hábitos completos já existe o id desde hábito que estou querendo fazer o toggle
    if (completedHabits.includes(habitId)) {
      // Percorre todos os hábitos, retornando todos os hábitos, menos o que tenha este habitId
      setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId));
    } else {
      // Caso contrário, significa que é um hábito que ainda não foi marcado
      setCompletedHabits(prevState => [...prevState, habitId]);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitsProgress} />

        <View className="mt-6">
          {
            dayInfo?.possibleHabits ?
              dayInfo.possibleHabits?.map(habit => (
                <Checkbox
                  key={habit.id}
                  title={habit.title}
                  checked={completedHabits.includes(habit.id)}
                  onPress={() => handleToggleHabit(habit.id)}
                />
              ))
              :
              <HabitsEmpty />
          }
        </View>

        {
          isDateInPast && (
            <Text className="text-white mt-10 text-center">
              Você não pode editar hábitos de uma data passada.
            </Text>
          )
        }
      </ScrollView>
    </View>
  );
}
