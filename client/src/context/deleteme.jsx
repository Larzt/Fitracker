function DishPage() {
  const { dishes, getDishesByDate, deleteDish } = useDish();
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
    getDishesByDate(today);
  }, []);

  const handleDeleteSubmit = (id) => {
    deleteDish(id);
    window.location.reload();
  };

  if (!Array.isArray(dishes) || dishes.length === 0) {
    return (
      <div className="dish-container-empty">
        <h1>Dishes for Today</h1>
        <p>No dishes available for today. Try adding some!</p>
        <div className="add-button-empty">
          <Link to={'/food/list'}>
            <AddButton />
          </Link>
        </div>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="dish-container">
      <h1>Dishes for Today</h1>
      <div className="dish-list">
        {dishes.map((dish) => {
          // Validación adicional para evitar errores
          const { food } = dish || {};
          if (!food) {
            console.warn(
              `Dish with ID ${dish._id} has no associated food data.`
            );
            return null;
          }
          return (
            <div key={dish._id} className="dish-card">
              <div className="dish-header">
                <h2>{food.name}</h2>
                <button
                  id="delete-button"
                  onClick={() => handleDeleteSubmit(dish._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
              <div className="dish-info">
                <p>
                  <strong>Calories:</strong> {food.calories}
                </p>
                <p>
                  <strong>Ingredients:</strong> {food.ingredients}
                </p>
              </div>
            </div>
          );
        })}
        <Link to={'/food/list'}>
          <AddButton />
        </Link>
      </div>
      <Navbar />
    </div>
  );
}
