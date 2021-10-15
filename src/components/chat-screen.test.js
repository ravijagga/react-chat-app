const chat_screen = require("./chat-screen")

// @ponicode
describe("componentDidMount", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Pierre Edouard", "Michael", "George"], ["Anas", "Pierre Edouard", "George"], ["Anas", "George", "Pierre Edouard"]]
        inst = new chat_screen.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("sendMessage", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Anas", "Michael", "Edmond"], ["Anas", "Jean-Philippe", "Jean-Philippe"], ["Pierre Edouard", "Edmond", "Michael"]]
        inst = new chat_screen.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.sendMessage("Message recipient is not the grader, the person being graded, or the controller")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.sendMessage("Could not find an existing submission in location.  rubric is original.")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.sendMessage("Error:")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.sendMessage("Invalid data: No data found in any of the field(s)!!!")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.sendMessage("Error getting key from: %s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.sendMessage(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("sendTypingEvent", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["George", "Jean-Philippe", "Edmond"], ["George", "Anas", "Pierre Edouard"], ["Jean-Philippe", "George", "Jean-Philippe"]]
        inst = new chat_screen.default(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.sendTypingEvent()
        }
    
        expect(callFunction).not.toThrow()
    })
})
