const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


class AIService {
    static replaceAllInString(str, keywords, value) {
        keywords.forEach(keyword => {
            str = str.replace(new RegExp(keyword, 'g'), value);
        });

        return str;
    }

    static async generateMentorRecommendations(studentProfile, recommendedMentors) {
        const prompt = `Given the following student profile and a list of mentor profiles, recommend the top 5 mentors that best 
        match the student's STEM interests and career goals.

Student Profile:
${JSON.stringify(studentProfile, null, 2)} 
Mentor Profiles:
${JSON.stringify(recommendedMentors, null, 2)}
Please return the ids of the recommended mentors in a JSON array: { recommendations: [mentorId1, mentorId2, ...] }.
`;
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });
      

        if (response.choices && response.choices.length > 0) {
        const answer = response['choices'][0]['message']['content'];
        return this.replaceAllInString(answer, ['```json', '```'], '');
      }

        return null;
    }
}

module.exports = AIService;