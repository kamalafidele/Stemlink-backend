const express = require("express")
const UserService = require("../../services/UserService")

const router = express.Router()

router.get(
    "/profile/:id", async(req, res) =>{
        const {id} = req.params

        try {
            const user = await UserService.getUserById(id)
            if(!user || user.role !== "MENTOR"){
                return res.status(404).json({error: "Mentor not found"})
            }
            return res.status(200).json({mentor: user})
        } catch (e) {
            console.log(e.message)
            return res.status(500).json({error: e.message})
        
        }
    }
)

module.exports = router