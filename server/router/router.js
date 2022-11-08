const express = require('express');
const {
    createUser,
    getUserByEmail,
    getMonsterList
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
    console.log(req.query["search"])
    try {
       const monsters = await getMonsterList(req.query["search"])
           res.status(200).json(monsters)
    } catch (err) {
        res.status(500).json("something went wrong")
    }
});

module.exports = router;