const express = require('express');
const router = express.Router();
const User = require('./../models/User');

router.get('/', async (req, res) => {
  try {

    const users = await User.findAll({

      attributes: ['id', 'email','name'],
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

router.post(
  '/',
  [
    // Validation rules
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long'),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email address')
      .custom(async (email) => {
        // Check for duplicate email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          throw new Error('Email already in use');
        }
        return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // If validation fails, return errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create user
      const { name, email } = req.body;
      const user = await User.create({ name, email });

      res.status(201).json(user); // Respond with created user
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }
);


module.exports = router;
