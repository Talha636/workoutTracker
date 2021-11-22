const router = require("express").Router();
const Workout = require("../models/Workout");

router.get('/', async (req, res) => {
  try {
    const workout = await Workout.aggregate([
      { $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }}
    ])
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/api/workouts', async (req, res) => {
  try {
    const workout = await Workout.create({ exercises: req.body });
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/api/workouts/:id', async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body }},
      { new: true }
    );
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
