const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../utility/validatorHandle');


const User = require('./../models/User');
const { createErrorResponse, createSuccessResponse } = require('../utility/responseHandler');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware,async (req, res) => {
  try {
    
    const users = await User.findAll({

      attributes: ['id', 'email','name'],
      //where:{}
    }
    );

    if (users) {
            
      
    }
    res.status(200).json(createSuccessResponse(users));
    
  } catch (error) {
    //errorLogger.error(JSON.stringify(errorMessage));
    res.status(500).json(createErrorResponse(error.message));
  }
});


// Get a user by ID
router.get('/:id',authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(createSuccessResponse(user));
  } catch (error) {
    res.status(500).json(createErrorResponse(error.message));
  }
});

// Update a user
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    const [updated] = await User.update({ name, email }, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    const user = await User.findByPk(req.params.id);
    res.status(200).json(createSuccessResponse(user));
  } catch (error) {
    res.status(500).json(createErrorResponse(error.message));
  }
});

// Delete a user
router.delete('/:id',authMiddleware, async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(createSuccessResponse(null,'Deleted Successful'));
    //res.status(204).send();
  } catch (error) {
    res.status(500).json(createErrorResponse(error.message));
  }
});

router.post(
  '/',
  authMiddleware,
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
    
    const validationErrors = handleValidationErrors(req);

    // If validation fails, return errors
    if (validationErrors) {
      return res.status(400).json(createErrorResponse( validationErrors ));
    }


    try {
      // Create user
      const { name, email } = req.body;
      const user = await User.create({ name, email });

      res.status(201).json(createSuccessResponse(user)); // Respond with created user
    } catch (error) {
      res.status(500).json(createErrorResponse( error.message));
    }
  }
);

module.exports = router;
