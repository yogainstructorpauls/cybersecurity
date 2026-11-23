import morgan  from "morgan";
import fs from "fs"

const devLogger = morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"')
const writeLogger = fs.createWriteStream('logger.txt', {flags: "a"})
export { devLogger, writeLogger }