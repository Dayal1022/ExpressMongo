const asyncHandler = require('express-async-handler')
// @desc Get goals
//@route Get api/goals
//@access Private
 
const getGoals = asyncHandler(async (req, res) => {
    
    res.status(200).json({message: 'Get goals'})
})
// @desc Set goal
//@route Set api/goal
//@access Private
 
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: "Set Goals", phone: 1234567890 });
})
// @desc Update goal
//@route Update api/goal
//@access Private
 
const updateGoal = asyncHandler(async (req, res) => {
     res.status(200).json({ message: "Update Goals", phone: `1234567890 ${req.params.id}` });
})
// @desc Get goals
//@route Get api/goals
//@access Private
 
const deleteGoal = asyncHandler(async (req, res) => {
    res
    .status(200)
    .json({ message: "Delete Goals", phone: `1234567890 ${req.params.id}` });
})


module.exports ={
    getGoals,setGoal,updateGoal,deleteGoal
}