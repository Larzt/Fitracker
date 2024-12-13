import { useState, useEffect } from 'react';
import { useRoutine } from '../context/Exercise/RoutineContext';
import { useExers } from '../context/Exercise/ExerciseContext';

function useRoutines(today) {
  const {
    routines,
    getRoutinesByDate,
    deleteRoutine,
    updateRoutine,
    createRoutine,
  } = useRoutine();
  const { exers, getExers } = useExers();

  const [filterCategory, setFilterCategory] = useState('');
  const [filterMuscle, setFilterMuscle] = useState('');
  const [filteredRoutines, setFilteredRoutines] = useState([]);

  useEffect(() => {
    getRoutinesByDate(today);
    getExers();
  }, [today]); // today, getRoutinesByDate, getExers

  useEffect(() => {
    const filtered = routines.filter((routine) => {
      const matchesCategory = filterCategory
        ? routine.category?.toLowerCase() === filterCategory.toLowerCase()
        : true;
      const matchesMuscle = filterMuscle
        ? routine.musclesTargeted?.toLowerCase() === filterMuscle.toLowerCase()
        : true;
      return matchesCategory && matchesMuscle;
    });
    setFilteredRoutines(filtered);
  }, [routines, filterCategory, filterMuscle]); // routines, filterCategory, filterMuscle

  return {
    routines,
    exers,
    filteredRoutines,
    filterCategory,
    setFilterCategory,
    filterMuscle,
    setFilterMuscle,
    deleteRoutine,
    updateRoutine,
    createRoutine,
  };
}

export default useRoutines;
