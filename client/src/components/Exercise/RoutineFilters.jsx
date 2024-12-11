import React from 'react';

function RoutineFilters({
  filterCategory,
  setFilterCategory,
  filterMuscle,
  setFilterMuscle,
}) {
  return (
    <form className="display-content-search">
      <select
        name="filterCategory"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="display-content-form-select"
      >
        <option value="">All Categories</option>
        <option value="strength">Strength</option>
        <option value="cardio">Cardio</option>
        <option value="flexibility">Flexibility</option>
      </select>
      <select
        name="filterMuscle"
        value={filterMuscle}
        onChange={(e) => setFilterMuscle(e.target.value)}
        className="display-content-form-select"
      >
        <option value="">All Muscles</option>
        <option value="chest">Chest</option>
        <option value="back">Back</option>
        <option value="legs">Legs</option>
        <option value="arms">Arms</option>
        <option value="abs">Abs</option>
      </select>
    </form>
  );
}

export default RoutineFilters;
