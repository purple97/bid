import fs from 'fs';
function RequireFileToJSON(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`不存在文件${filePath}`);
        return;
    }
    let fileContent = fs.readFileSync(filePath).toString();
    let json = JSON.parse(fileContent);
    return json;
}
export default RequireFileToJSON;
