import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import helper from './test_helper.js';
import supertest from 'supertest';
import app from '../app.js';
import User from '../models/user.js';
const api = supertest(app);

describe('when there is initiallity one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('serket', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'Esmorçaret12',
          name: 'Anem A. Esmorçar',
          password: 'cacau',
        }

        await api 
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Esmorçaret12',  //canviar l'altre newUser
            name: 'Superuser',
            password: 'cacau',
        }

        const result = await api 
            .post('api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'Esmorçaret12',
        name: 'Anem A. Esmorçar',
        password: 'cacau',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

  afterAll(() => {
      mongoose.connection.close()
    })
})