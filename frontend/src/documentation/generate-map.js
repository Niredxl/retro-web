import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FOLDER WHERE .mdx FILES LIVE
const DOCS_DIR = path.join(__dirname, './docs');
// JSON OUT LOCATION
const OUTPUT_FILE = path.join(__dirname, '../data/sidebarData.json');

function getDirectoryStructure(dir) {
    const results = [];

    if (!fs.existsSync(dir)) {
        console.warn(`Docs directory not found at ${dir}`);
    }

    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const fullPath = path.resolve(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat && stat.isDirectory()) {

            results.push({
                label: path.basename(file),
                type: 'category',
                children: getDirectoryStructure(fullPath)
            });
        } else {
            const ext = path.extname(file);
            if (ext === '.mdx') {
                const relativePath = path.relative(DOCS_DIR, fullPath);
                const urlPath = '/' + relativePath.replace(/\\/g,'/').replace('.mdx', '');
                results.push({
                    label: path.basename(file, '.mdx'),
                    type: 'link',
                    path : urlPath
                });
            }
        }


    });
    return results;
}
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}
console.log(`Scanning directory: ${DOCS_DIR}`);
const structure = getDirectoryStructure(DOCS_DIR);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(structure, null, 2));

console.log(`Success! Sidebar data generated at: ${OUTPUT_FILE}`);