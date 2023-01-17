import { Habit } from './components/Habit';
import './styles/global.css';

export function App() {
  return (
    <>
      <Habit completed={3} />
      <Habit completed={10} />
      <Habit completed={20} />
      <Habit completed={30} />
    </>
  );
}
