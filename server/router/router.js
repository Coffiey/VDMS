const express = require('express');
const {
    createUser,
    getUserByEmail,
    getMonsterList,
    getMonsterByurl,
        } = require('../../callFunc/serverF')

const router = express.Router();
router.post('/api/user', async (req, res) => {
    try { 
       const id = await createUser(req.body)
       res.status(201).json(id)
    } catch (err) {
        res.status(500).json("something went wrong")
    }
});

router.get('/api/user', async (req, res) => {
    try {
       const userobj = await getUserByEmail(req.query)
       res.status(201).json(userobj)
    } catch (err) {
        res.status(500).json("something went wrong")
    }
});


router.get('/api/monster', async (req, res) => {
    try {
       const monsters = await getMonsterList()
           res.status(200).json(monsters)
    } catch (err) {
        res.status(500).json("something went wrong")
    }
});

router.get('/api/monster/object', async (req, res) => {
    try {
       const monster = await getMonsterByurl(req.query["url"])
           res.status(200).json(monster)
    } catch (err) {
        res.status(500).json("something went wrong")
    }
});

module.exports = router;