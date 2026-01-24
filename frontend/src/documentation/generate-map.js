import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, './docs');
const OUTPUT_FILE = path.join(__dirname, '../../data/sidebarData.json');

function getDirectoryStructure(dir) {
    const results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {

            results.push({
                label: path.basename(file),
                type: 'category',
                children: getDirectoryStructure(file)
            });
        } else {
            const ext = path.extname(file);
            if (ext === '.mdx') {
                results.push({
                    label: path.basename(file, '.mdx'),
                    type: 'link',
                    path : file.split('src/docs')[1].replace(/\\/g,'/')
                });
            }
        }


    });
    return results;
}

if (!fs.existsSync(path.join(__dirname, 'src/data'))){
    fs.mkdirSync(path.join(__dirname, 'src/data'));
}

const structure = getDirectoryStructure(DOCS_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(structure, null, 2));

console.log("Sidebar data generated!");