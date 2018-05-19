const { User } = require('../models/user.model');
const { Story } = require('../models/story.model');
const { ServerError } = require('../models/server-error.model');
const { verify } = require('../helpers/jwt');
const { checkObjectId } = require('../helpers/checkObjectIds');

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
        await User.findByIdAndUpdate(_id, { $push: { stories: story._id } });
        return Story.populate(story, { path: 'author', select: 'name' });
    }

    static async updateStory() {}

    static async removeStory(token, idStory) {
        const { _id } = await verify(token).catch(() => {
            throw new ServerError('INVALID_TOKEN', 400);
        });
        checkObjectId(idStory);
        const story = await Story.findOneAndRemove({ _id: idStory, author: _id });
        if (!story) throw new ServerError('CANNOT_FIND_STORY', 404);
        return story;
    }
}

module.exports = { StoryService };
