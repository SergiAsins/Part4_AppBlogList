import bcrypt from 'bcrypt';
import express from 'express';
const usersRouter = express.Router();
import User from '../models/user.js';

usersRouter.post('/', async (request, response) => {
    const body = request.body

    console.log('Request body:', body);
    
    if (!body.username) {
        return response.status(400).json({ error: 'Username is required' });
    }

    if (!body.password || body.password.length < 3) {
        return response.status(400).json({ error: `User validation failed: password is shorter than the minimum allowed length(3)`})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password || 'cacau', saltRounds)

    const user = new User ({
        username: body.username,
        name: body.name, 
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs', { url:1, title:1, author:1 })
    response.json(users.map(user => user.toJSON()))
})

export default usersRouter