const express = require('express');
const router = express.Router();
const User = require('./../models/User');

router.get('/', async (req, res) => {
  try {

    const users = await User.findAll({

      attributes: ['id', 'email'],
      //where:{}
    }
    );

    if (users) {
            
      
    }
    res.status(200).json({ success: true, message: 'ok', data: users });
    
  } catch (error) {
    //errorLogger.error(JSON.stringify(errorMessage));
    res.status(500).json({ message: error.message });
  }
});


// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ success: true, message: 'ok', data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [updated] = await User.update({ name, email }, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    const user = await User.findByPk(req.params.id);
    res.status(200).json({ success: true, message: 'ok', data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ success: true, message: 'Deleted Successful' });
    //res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
