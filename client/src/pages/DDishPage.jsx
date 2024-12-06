import React, { useEffect, useState } from 'react';
import { DashboardPage } from './DashboardPage';
import { useDish } from '../context/DishContext';
import { useFood } from '../context/FoodContext';

function DDishPage() {
  const { dishes, getDishesByDate, deleteDish } = useDish();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
    getDishesByDate(today);
  }, []);

  const handleDeleteSubmit = (id) => {
    deleteDish(id);
    window.location.reload();
  };

  const DishTable = () => (
    <div className="display-content-table">
      <table>
        <thead>
          <tr className="display-content-table-header text-left">
            <th>Name</th>
            <th>Ingredients</th>
            <th>Calories</th>
            <th className="text-center">Edit</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {dishes.length > 0 ? (
            // Filtra los platos que tienen datos de 'food'
            dishes.filter((dish) => dish.food).length > 0 ? (
              dishes.map((dish) => {
                const { food } = dish || {};
                if (!food) {
                  console.warn(
                    `Dish with ID ${dish._id} has no associated food data.`
                  );

                  return null;
                }
                return (
                  <tr key={dish._id}>
                    <td className="text-left">
                      {food?.name || 'No food added'}
                    </td>
                    <td className="text-left">{food?.ingredients || 'N/A'}</td>
                    <td className="text-left">{food?.calories || 'N/A'}</td>
                    <td className="text-center">
                      <button className="edit-btn">
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteSubmit(dish._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">No dishes available for today</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan="5">No dishes available for today</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <DashboardPage
        content={
          <div className="display-content">
            <div className="display-content-header">
              <h1>Today Dishes</h1>
              <div className="display-content-header-button">
                <button>
                  <i className="fa-solid fa-circle-plus"></i>
                  <p>New dish</p>
                </button>
              </div>
            </div>
            <div className="display-content-search">
              <input type="text" placeholder="Filter by name" />
            </div>
            <DishTable />
          </div>
        }
      />
    </div>
  );
}

export default DDishPage;
