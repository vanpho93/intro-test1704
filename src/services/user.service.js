const { User } = require('../models/user.model');
const { hash, compare } = require('bcrypt');

class UserService {
    static async signIn(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('INVALID_USER_INFO');
        const same = await compare(password, user.password);
        if (!same) throw new Error('INVALID_USER_INFO');
        const userInfo = user.toObject();
        delete userInfo.password;
        return userInfo;
    }

    static async signUp(email, password, name) {
        const encrypted = await hash(password, 8);
        const user = new User({ email, password: encrypted, name });
        await user.save();
        const userInfo = user.toObject();
        delete userInfo.password;
        return userInfo;
    }
}

module.exports = { UserService };
