import Routine from '../models/routine.model.js';

export const getRoutines = async (req, res) => {
  try {
    const routines = await Routine.find({
      user: req.user.id,
    })
      .populate('exer') // Descomentamos esta línea para hacer el populate del campo 'exer'
      .populate('user');

    console.log('getRoutines:', routines);
    if (!routines || routines.length === 0)
      return res.status(404).json({ message: 'Routines not found' });
    res.json(routines);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching routines', error: error.message });
  }
};

export const getRoutine = async (req, res) => {
  try {
    const routine = await Routine.find({ exer: req.params.id })
      .populate('exer')
      .populate('name')
      .populate('user');

    if (!routine) return res.status(404).json({ message: 'Routine not found' });
    res.json(routine);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Routine not found' });
  }
};

export const createRoutine = async (req, res) => {
  try {
    const { category, musclesTargeted } = req.body;
    const newRoutine = new Routine({
      category,
      musclesTargeted,
      exer: req.params.id,
      user: req.user.id,
    });

    const savedRoutine = await newRoutine.save();
    res.json(savedRoutine);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Routine not created' });
  }
};

export const updateRoutine = async (req, res) => {
  try {
    const { category, musclesTargeted } = req.body;

    // Verificar que se envíen datos válidos
    if (!category && !musclesTargeted) {
      return res.status(400).json({ message: 'No data provided to update' });
    }

    // Buscar la rutina por ID
    const routine = await Routine.findById(req.params.id);
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    // Actualizar los campos si se proporcionan
    if (category) routine.category = category;
    if (musclesTargeted) routine.musclesTargeted = musclesTargeted;

    // Guardar los cambios
    const updatedRoutine = await routine.save();

    // Verificar si la actualización fue exitosa
    return res.status(200).json(updatedRoutine);
  } catch (error) {
    console.error('Error updating routine:', error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

export const addExtraData = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedRoutine = await Routine.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    res.status(200).json(updatedRoutine);
  } catch (error) {
    res.status(500).json({ error: `Error updating routine: ${error}` });
  }
};

export const deleteRoutine = async (req, res) => {
  try {
    const routine = await Routine.findByIdAndDelete(req.params.id);
    if (!routine) return res.status(404).json({ message: 'Routine not found' });
    return res.status(204);
  } catch (error) {
    if (error) return res.status(404).json({ message: 'Routine not found' });
  }
};

// Controlador para obtener rutinas por fecha
export const getRoutinesByDate = async (req, res) => {
  try {
    const { date } = req.params; // Obtener la fecha de los query params
    if (!date) {
      return res.status(404).json({ message: 'Date is required' });
    }

    // Convertir la fecha en rango de inicio y fin del día
    const startOfDay = new Date(date).setHours(0, 0, 0, 0);
    const endOfDay = new Date(date).setHours(23, 59, 59, 999);

    // Buscar platos en ese rango
    const routines = await Routine.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      user: req.user.id,
    }).populate('exer user'); // Popula las referencias si es necesario

    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener rutinas por categoria
export const getRoutinesByCategory = async (req, res) => {
  try {
    const { category } = req.params; // Obtener la fecha de los query params
    if (!category) {
      return res.status(404).json({ message: 'Muscles Targeted is required' });
    }

    // Buscar platos en ese rango
    const routines = await Routine.find({
      category,
    }).populate('exer user'); // Popula las referencias si es necesario

    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener rutinas por musculo
export const getRoutinesByMuscle = async (req, res) => {
  try {
    const { musclesTargeted } = req.params; // Obtener la fecha de los query params
    if (!musclesTargeted) {
      return res.status(404).json({ message: 'Muscles Targeted is required' });
    }

    // Buscar platos en ese rango
    const routines = await Routine.find({
      musclesTargeted,
    }).populate('exer user'); // Popula las referencias si es necesario

    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAdditionalData = async (req, res) => {
  try {
    const { id } = req.params; // ID de la rutina
    const { label } = req.body; // Label del dato a eliminar

    if (!label) {
      return res.status(400).json({ message: 'Label is required' });
    }

    // Buscar la rutina por ID y eliminar el dato del campo additionalData
    const routine = await Routine.findByIdAndUpdate(
      id,
      { $pull: { additionalData: { label } } }, // Eliminar el dato con el label especificado
      { new: true } // Retornar el documento actualizado
    );

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    res.status(200).json(routine);
  } catch (error) {
    console.error('Error deleting additional data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
