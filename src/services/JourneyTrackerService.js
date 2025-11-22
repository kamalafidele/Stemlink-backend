const JourneyTracker = require('../models/JourneyTracker');
const User = require('../models/User');

class JourneyTrackerService {
  
  // Get journey tracker for a student
  async getJourneyByStudentId(studentId) {
    const journey = await JourneyTracker.findOne({ student: studentId })
      .populate('student', 'firstName lastName email')
      .populate('mentorshipRelation');
    
    return journey;
  }

  // Create new journey tracker
  async createJourney(studentId, mentorshipRelationId = null) {
    // Check if journey already exists
    const existing = await JourneyTracker.findOne({ student: studentId });
    if (existing) {
      throw new Error('Journey tracker already exists for this student');
    }

    // Verify student exists
    const student = await User.findById(studentId);
    if (!student || student.role !== 'STUDENT') {
      throw new Error('Invalid student ID');
    }

    const journey = new JourneyTracker({
      student: studentId,
      mentorshipRelation: mentorshipRelationId,
      skills: [],
      goals: [],
      milestones: [],
      outcomes: []
    });

    await journey.save();
    return journey;
  }

  // Add or update a skill
  async updateSkill(studentId, skillData) {
    const journey = await JourneyTracker.findOne({ student: studentId });
    if (!journey) {
      throw new Error('Journey tracker not found');
    }

    const existingSkillIndex = journey.skills.findIndex(
      s => s.name.toLowerCase() === skillData.name.toLowerCase()
    );

    if (existingSkillIndex >= 0) {
      // Update existing skill
      journey.skills[existingSkillIndex] = {
        ...journey.skills[existingSkillIndex].toObject(),
        ...skillData
      };
    } else {
      // Add new skill
      journey.skills.push(skillData);
    }

    await journey.save();
    return journey;
  }

  // Remove a skill
  async removeSkill(studentId, skillName) {
    const journey = await JourneyTracker.findOne({ student: studentId });
    if (!journey) {
      throw new Error('Journey tracker not found');
    }

    journey.skills = journey.skills.filter(
      s => s.name.toLowerCase() !== skillName.toLowerCase()
    );

    await journey.save();
    return journey;
  }

  // Add a goal
  async addGoal(studentId, goalData) {
    const journey = await JourneyTracker.findOne({ student: studentId });
    if (!journey) {
      throw new Error('Journey tracker not found');
    }

    journey.goals.push(goalData);
    await journey.save();
    return journey;
  }

  // Update goal (mark complete/incomplete)
  async updateGoal(studentId, goalId, updates) {
    const journey = await JourneyTracker.findOne({ student: studentId });
    if (!journey) {
      throw new Error('Journey tracker not found');
    }

    const goal = journey.goals.id(goalId);
    if (!goal) {
      throw new Error('Goal not found');
    }

    Object.assign(goal, updates);
    
    if (updates.completed && !goal.completedAt) {
      goal.completedAt = new Date();
    } else if (!updates.completed) {
      goal.completedAt = null;
    }

    await journey.save();
    return journey;
  }

  // Remove a goal
  async removeGoal(studentId, goalId) {
    const journey = await JourneyTracker.findOne({ student: studentId });
    if (!journey) {
      throw new Error('Journey tracker not found');
    }

    journey.goals.pull(goalId);
    await journey.save();
    return journey;
  }

  // Add a milestone
  async addMilestone(studentId, milestoneData) {
    const journey = await JourneyTracker.findOne({ student: studentId });
    if (!journey) {
      throw new Error('Journey tracker not found');
    }

    journey.milestones.push(milestoneData);
    await journey.save();
    return journey;
  }

  // Add an outcome
  async addOutcome(studentId, outcome) {
    const journey = await JourneyTracker.findOne({ student: studentId });
    if (!journey) {
      throw new Error('Journey tracker not found');
    }

    journey.outcomes.push(outcome);
    await journey.save();
    return journey;
  }

  // Update outcomes array
  async updateOutcomes(studentId, outcomes) {
    const journey = await JourneyTracker.findOne({ student: studentId });
    if (!journey) {
      throw new Error('Journey tracker not found');
    }

    journey.outcomes = outcomes;
    await journey.save();
    return journey;
  }

  // Delete journey
  async deleteJourney(studentId) {
    const result = await JourneyTracker.findOneAndDelete({ student: studentId });
    if (!result) {
      throw new Error('Journey tracker not found');
    }
    return result;
  }
}

module.exports = new JourneyTrackerService();
