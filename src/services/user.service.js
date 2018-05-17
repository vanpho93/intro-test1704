const { User } = require('../models/user.model');
const { hash } = require('bcrypt');

class UserService {
    static async signIn(email, password) {
        const user = await User.findOne({ email, password });
        if (!user) throw new Error('INVALID_USER_INFO');
        return user;
    }

    static async signUp(email, password, name) {
        const encrypted = await hash(password, 8);
        const user = new User({ email, password: encrypted, name });
        await user.save();
        return user;
    }
}

module.exports = { UserService };
