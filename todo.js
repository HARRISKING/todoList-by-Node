const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'db')
const command = process.argv[2]
const content = process.argv[3]
const index = Number(process.argv[4] - 1)

let list = []

initDb()

switch (command) {
    case 'add':
        list.push({
            content: content,
            isComplete: false
        })
        break
    case 'ls':
        JSON.parse(fs.readFileSync(filePath, 'utf-8')).map(item => console.log(
            `${item.isComplete ? '[o]' : '[x]'} ${item.content}`
        ))
        break
    case 'edit':
        list[index]['content'] = content
        break
    case 'ok':
        list[content - 1].isComplete = true
        break
    case 'delete':
        list.splice(content - 1, 1)
        break
    case 'clear':
        fs.unlinkSync(filePath)
        break
    default:
        console.log('你输入的命令是:' + command + '我不懂你要做什么')
        break
}

if (command !== 'clear' && command !== 'ls') {
    write(filePath, JSON.stringify(list))
}

// help function
function initDb() {
    if (fs.existsSync(filePath)) {
        list = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    } else {
        write(filePath, '')
    }
}

function write(filePath, content) {
    fs.writeFileSync(filePath, content)
}
