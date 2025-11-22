const JourneyTrackerService = require('../../services/JourneyTrackerService');

// Get journey tracker
exports.getJourney = async (req, res) => {
  try {
    const studentId = req.user.role === 'STUDENT' 
      ? req.user.id 
      : req.query.studentId;

    if (!studentId) {
      return res.status(400).json({ message: 'Student ID required' });
    }

    const journey = await JourneyTrackerService.getJourneyByStudentId(studentId);
    
    if (!journey) {
      return res.status(404).json({ message: 'Journey tracker not found' });
    }

    res.status(200).json(journey);
  } catch (error) {
    console.error('Get journey error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create journey tracker
exports.createJourney = async (req, res) => {
  try {
    const { mentorshipRelationId } = req.body;
    const studentId = req.user.role === 'STUDENT' 
      ? req.user.id 
      : req.body.studentId;

    if (!studentId) {
      return res.status(400).json({ message: 'Student ID required' });
    }

    const journey = await JourneyTrackerService.createJourney(
      studentId, 
      mentorshipRelationId
    );

    res.status(201).json(journey);
  } catch (error) {
    console.error('Create journey error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update/Add skill
exports.updateSkill = async (req, res) => {
  try {
    const studentId = req.user.role === 'STUDENT' 
      ? req.user.id 
      : req.body.studentId;

    const { name, progress, category } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Skill name is required' });
    }

    const journey = await JourneyTrackerService.updateSkill(studentId, {
      name,
      progress: progress || 0,
      category
    });

    res.status(200).json(journey);
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Remove skill
exports.removeSkill = async (req, res) => {
  try {
    const studentId = req.user.role === 'STUDENT' 
      ? req.user.id 
      : req.body.studentId;

    const { skillName } = req.params;

    const journey = await JourneyTrackerService.removeSkill(studentId, skillName);

    res.status(200).json(journey);
  } catch (error) {
    console.error('Remove skill error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Add goal
exports.addGoal = async (req, res) => {
  try {
    const studentId = req.user.role === 'STUDENT' 
      ? req.user.id 
      : req.body.studentId;

    const { name, description, targetDate } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Goal name is required' });
    }

    const journey = await JourneyTrackerService.addGoal(studentId, {
      name,
      description,
      targetDate
    });

    res.status(200).json(journey);
  } catch (error) {
    console.error('Add goal error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update goal
exports.updateGoal = async (req, res) => {
  try {
    const studentId = req.user.role === 'STUDENT' 
      ? req.user.id 
      : req.body.studentId;

    const { goalId } = req.params;
    const updates = req.body;

    const journey = await JourneyTrackerService.updateGoal(
      studentId, 
      goalId, 
      updates
    );

    res.status(200).json(journey);
  } catch (error) {
    console.error('Update goal error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Remove goal
exports.removeGoal = async (req, res) => {
  try {
    const studentId = req.user.role === 'STUDENT' 
      ? req.user.id 
      : req.body.studentId;

    const { goalId } = req.params;

    const journey = await JourneyTrackerService.removeGoal(studentId, goalId);

    res.status(200).json(journey);
  } catch (error) {
    console.error('Remove goal error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Add milestone
exports.addMilestone = async (req, res) => {
  try {
    const studentId = req.user.role === 'STUDENT' 
      ? req.user.id 
      : req.body.studentId;

    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Milestone title is required' });
    }

    const journey = await JourneyTrackerService.addMilestone(studentId, {
      title,
      description
    });

    res.status(200).json(journey);
  } catch (error) {
    console.error('Add milestone error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Add outcome
exports.addOutcome = async (req, res) => {
  try {
    const studentId = req.user.role === 'STUDENT' 
      ? req.user.id 
      : req.body.studentId;

    const { outcome } = req.body;

    if (!outcome) {
      return res.status(400).json({ message: 'Outcome text is required' });
    }

    const journey = await JourneyTrackerService.addOutcome(studentId, outcome);

    res.status(200).json(journey);
  } catch (error) {
    console.error('Add outcome error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update outcomes
exports.updateOutcomes = async (req, res) => {
  try {
    const studentId = req.user.role === 'STUDENT' 
      ? req.user.id 
      : req.body.studentId;

    const { outcomes } = req.body;

    if (!Array.isArray(outcomes)) {
      return res.status(400).json({ message: 'Outcomes must be an array' });
    }

    const journey = await JourneyTrackerService.updateOutcomes(
      studentId, 
      outcomes
    );

    res.status(200).json(journey);
  } catch (error) {
    console.error('Update outcomes error:', error);
    res.status(400).json({ message: error.message });
  }
};