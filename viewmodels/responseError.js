module.exports = function(err){
    return {
        message:err.message,
        name:err.name,
        stack:err.stack
    }
}