import { beforeEach, jest } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
    insertDB: jest.fn(),
    getDB: jest.fn(),
    saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import('../src/db.js');
const { newNote, getAllnotes, removeNotes } = await import('../src/notes.js')

beforeEach(() => {
    insertDB.mockClear();
    getDB.mockClear();
    saveDB.mockClear();
})