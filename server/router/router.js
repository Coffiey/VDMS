const express = require('express');
const {
    createUser,
    getUserByEmail,
    getMonsterList
        } = require('../../callFunc/serverF')

const router = express.Router();
router.post('/user', async (req, res) => {
    try { 
       const id = await createUser(req.body)
       res.status(201).json(id)
    } catch (err) {
        res.status(500).json("something went wrong")
    }
});

router.get('/user', async (req, res) => {
    try {
       const userobj = await getUserByEmail(req.query)
       res.status(201).json(userobj)
    } catch (err) {
        res.status(500).json("something went wrong")
    }
});


router.get('/monster', async (req, res) => {
    try { 
       const monsters = await getMonsterList()
       console.log(monsters)
       res.status(200).json(monsters)
    } catch (err) {
        res.status(500).json("something went wrong")
    }
});

module.exports = router;