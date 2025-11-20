const express = require('express');
const StudentProfileService = require('../../services/StudentProfileService');
const MentorProfileService = require('../../services/MentorProfileService');
const AIService = require('../../services/AIService');

const JWTService = require('../../services/JWTService');

const router = express.Router();
const jwt = JWTService.verifyToken;

router.get('/matching-recommendations', jwt, async (req, res) => {
  const { _id: userId, role } = req.user;
  if (role !== 'STUDENT') {
    return res.status(403).json({ error: 'Only students can access matching recommendations' });
  }

  const studentProfile = await StudentProfileService.getByUserId(userId);
    if (!studentProfile) {
      return res.status(404).json({ error: 'Student profile not found' });
    }
  
   const studentStemInterests = studentProfile.stemInterests || [];
   if (studentStemInterests.length === 0) {
     return res.status(400).json({ error: 'Student profile has no STEM interests specified' });
   }

    const recommendedMentors = await MentorProfileService.getByStemFields(studentStemInterests, 0, 15);
    if (recommendedMentors.length === 0) {
      return res.status(404).json({ error: 'No mentors found matching the student\'s STEM interests' });
    }

    const formattedMentorData = recommendedMentors.map(mentor => ({
      id: mentor._id,
      stemFields: mentor.stemFields,
    }));

    const aiResponse = await AIService.generateMentorRecommendations(studentProfile, formattedMentorData);
    if (!aiResponse) {
      return res.status(400).json({ error: 'Failed to generate mentor recommendations. Try again later.' });
    }

    let recommendations;
    try {
      console.log('AI Response:', aiResponse);
      const parsedResponse = JSON.parse(aiResponse);
        recommendations = parsedResponse.recommendations;
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return res.status(500).json({ error: 'Error parsing AI response' });
    }

    const matchedMentorProfiles = await MentorProfileService.getByProfileIdIn(recommendations);

    return res.status(200).json({ recommendations: matchedMentorProfiles });
});


module.exports = router;