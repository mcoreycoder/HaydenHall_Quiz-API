const { send, json } = require('micro')
const { router, get, post, put, del } = require('microrouter')
const cors = require('micro-cors')()
 
const monk = require('monk')
const db = monk('mongodb://Buddy89052:NewF0undVerse@cluster0-shard-00-00-2ay1j.mongodb.net:27017,cluster0-shard-00-01-2ay1j.mongodb.net:27017,cluster0-shard-00-02-2ay1j.mongodb.net:27017/Quiz?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')

const users = db.get('users')
const Questions = db.get('Questions')

// working
const getQuestions = async (req, res) => {
    const results = await Questions.find({});
    // console.log('getQuestions',results)
    return send(res, 200, results)
}

// working
const getUsers = async (req, res) => {
    const results = await users.find({});
    // console.log('getUsers',results)
    return send(res, 200, results)
}

// working
const getUser = async (req, res) => {
    let id = req.params.id
    const results = await users.find({_id: id});
    // console.log('getUser',results)
    return send(res, 200, results)
}

// working
const createUser = async (req, res) => {
    const data = await json(req)
    // console.log('createUser',data)
    const results = await users.insert(data);
    // console.log('results', results)
    return send (res, 200, results)
}

// working
const deleteUser = async (req, res) => {
    let id = req.params.id
    // console.log('deleteUser id', id)
    const results = await users.remove({'_id': id})
    // console.log('deleteUser deletedCount',results.deletedCount)
    return send(res, 200, results)
}

//seems to be working
const updateScore = async (req, res) => {
    console.log('req.params.id', req.params.id)
    let id = req.params.id
    const data = await json(req)
    // console.log('updateScore',data) // Validation might go here
    const results = await users.update({ _id: id }, data);
    return send(res, 200, results)
}

const notfound = (req, res) => send(res, 404, 'Not found route')


module.exports = cors(
    router(
        put('/user/:id', updateScore),
        post('/user', createUser),
        get('/questions', getQuestions), // needs id added to make unique, could just pass in all user info 
        get('/users', getUsers),
        get('/user/:id', getUser),
        del('/user/:id',deleteUser),
        get('/*', notfound)
        )
)