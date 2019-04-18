const { send, json } = require('micro')
const { router, get, post, put } = require('microrouter')
const cors = require('micro-cors')()
const notfound = (req, res) => send(res, 404, 'Not found route')
 
const monk = require('monk')
const db = monk('mongodb://Buddy89052:NewF0undVerse@cluster0-shard-00-00-2ay1j.mongodb.net:27017,cluster0-shard-00-01-2ay1j.mongodb.net:27017,cluster0-shard-00-02-2ay1j.mongodb.net:27017/Quiz?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
const users = db.get('users')
const Questions = db.get('Questions')

const getQuestions = async (req, res) => {
    const results = await Questions.find({});
    return send(res, 200, results)
}

const getUser = async (req, res) => {
    const results = await users.find({});
    return send(res, 200, results)
}

const createUser = async (req, res) => {
    const data = await json(req)
    console.log(data)
    const results = await users.insert(data);
    console.log('results', results)
    return send (res, 200, results)
}
const updateScore = async (req, res) => {
    const data = await json(req)
    console.log(data) // Validation might go here
    const results = await users.update({ _id: req.params.id }, data);
    return send(res, 200, results)
}

module.exports = cors(
    router(
        put('./user', updateScore),
        post('/user', createUser),
        get('/questions', getQuestions),
        get('/user', getUser),
        get('/*', notfound)
        )
)