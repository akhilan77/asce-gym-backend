const db = require('../db');

exports.getAllSchedules = (req, res) => {
  const sql = `
    SELECT cs.id, cs.class_name, cs.day_of_week, cs.start_time, cs.end_time, t.name as trainer
    FROM class_schedule cs
    LEFT JOIN trainers t ON cs.trainer_id = t.id
    ORDER BY cs.day_of_week, cs.start_time
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
