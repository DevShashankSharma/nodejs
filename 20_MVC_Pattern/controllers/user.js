const User = require("../Models/user")

const handleGetAllUsers = async (req, res) => {
    const allDbUsers = await User.find({});
    res.json(allDbUsers)
}

const handleGetUserByID = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).send({ status: "Failed to find user" })
    }
    return res.json(user)
}

const handleUpdateUserByID = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, { last_name: 'sshdgf' })
    return res.send({ status: "Successfully user updated", user })
}

const handleDeleteUserByID = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.send({ status: "Successfully user deleted" })
}

const handleCreateNewUser = async (req, res) => {
    let body = req.body
    if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title || !body) {
        return res.status(400).send({ status: "Failed to create new user" })
    }

    const newUser = await User.create({
        ...body
    })
    return res.status(201).send({ status: "Successfully new user created", id: newUser._id })
}

module.exports = {
    handleGetAllUsers,
    handleGetUserByID,
    handleUpdateUserByID,
    handleDeleteUserByID,
    handleCreateNewUser
}