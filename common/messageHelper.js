const RemoveCommand = (text) => {
    return text.replace(/\/\w+ /, "").trim();
}

module.exports = {
    RemoveCommand: RemoveCommand
}