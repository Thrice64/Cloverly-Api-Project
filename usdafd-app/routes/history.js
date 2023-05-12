const fs = require('fs').promises;

const HISTORY_FILE = './history.json';

async function loadHistory() {
    try {
        await fs.access(HISTORY_FILE);
        const historyRaw = await fs.readFile(HISTORY_FILE);
        return JSON.parse(historyRaw);
    } catch (err) {
        // If the file doesn't exist, return an empty array
        if (err.code === 'ENOENT') {
            return [];
        } else {
            throw err;
        }
    }
}

async function saveSearch(keyword, resultCount) {
    const history = await loadHistory();
    const newEntry = { search: keyword, resultCount };
    history.push(newEntry);
    await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
}

module.exports = {
    saveSearch
};
