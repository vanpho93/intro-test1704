const { User } = require('../models/user.model');
const { Story } = require('../models/story.model');
const { ServerError } = require('../models/server-error.model');
const { verify } = require('../helpers/jwt');

class StoryService {
    static async getAllStories() {
        return Story.find({}).populate('author', 'name');
    }

    static async createStory(token, content) {
        const { _id } = await verify(token).catch(() => {
            throw new ServerError('INVALID_TOKEN', 400);
        });
        if (!content) throw new ServerError('EMPTY_CONTENT', 400);
        const story = new Story({ author: _id, content });
        await story.save();
        return Story.populate(story, { path: 'author', select: 'name' });
    }

    static async updateStory() {}

    static async removeStory() {}
}

module.exports = { StoryService };
