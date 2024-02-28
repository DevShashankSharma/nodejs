const express = require("express")
const { handleGetAllUsers, handleGetUserByID, handleUpdateUserByID, handleDeleteUserByID, handleCreateNewUser } = require("../controllers/user")

const router = express.Router()

//! Create Routes ---> REST API 
// router.get("/", handleGetAllUsers)
// router.get("/:id", handleGetUserByID)
// router.post("/", handleCreateNewUser)
// router.patch("/:id", handleUpdateUserByID)
// router.delete("/:id", handleDeleteUserByID)

router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

router.route("/:id")
    .get(handleGetUserByID)
    .patch(handleUpdateUserByID)
    .delete(handleDeleteUserByID)


module.exports = router