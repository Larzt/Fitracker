import React from 'react';
import { BaseDashboardPage } from '../BaseDashboardPage';
import { useDishLogic } from '../../hooks/useDishLogic';
import { DishTable } from '../../components/Food/DishTable';
import { AddDish } from '../../components/Food/AddDish';

export const DishPage = () => {
  const {
    filteredDishes,
    foods,
    filterCategory,
    setFilterCategory,
    addDish,
    toggleAddMode,
    editRow,
    editedCategory,
    handleCategoryChange,
    toggleEditMode,
    saveCategory,
    handleDeleteSubmit,
    handleFoodSelect,
  } = useDishLogic();

  return (
    <BaseDashboardPage
      content={
        <div className="display-content">
          <div className="display-content-header">
            <h1>Today's Dishes</h1>
            <button
              className="display-content-header-button"
              onClick={toggleAddMode}
            >
              <i className="fa-solid fa-circle-plus"></i>
              <p>New dish</p>
            </button>
          </div>
          <form className="display-content-search">
            <select
              name="filterCategory"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="display-content-form-select"
            >
              <option value="">All Categories</option>
              <option value="desayuno">Desayuno</option>
              <option value="almuerzo">Almuerzo</option>
              <option value="merienda">Merienda</option>
              <option value="cena">Cena</option>
              <option value="aperitivo">Aperitivo</option>
            </select>
          </form>
          <DishTable
            filteredDishes={filteredDishes}
            editRow={editRow}
            editedCategory={editedCategory}
            handleCategoryChange={handleCategoryChange}
            toggleEditMode={toggleEditMode}
            saveCategory={saveCategory}
            handleDeleteSubmit={handleDeleteSubmit}
          />
          <AddDish
            addDish={addDish}
            foods={foods}
            handleFoodSelect={handleFoodSelect}
          />
        </div>
      }
    />
  );
};

export default DishPage;
