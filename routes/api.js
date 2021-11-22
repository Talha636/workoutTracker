const router = require("express").Router();
const Workout = require("../models/Workout");

router.get('/api/workouts', async (req, res) => {
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
    const workout = await Workout.create({});
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
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

router.get('/api/workouts/range', async (req, res) => {
  try {
    const workout = await Workout.aggregate([
      { $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }},
      { $sort: {
        day: -1
      }},
      { $limit: 7 }
    ])
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
