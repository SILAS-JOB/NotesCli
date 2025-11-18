import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { findNotes, getAllNotes, newNote, removeNote, removeAllNotes } from './notes.js';
import { start } from './server.js';


const listNotes = notes => {
    notes.forEach(({id, content, tags}) => {
        console.log('id', id)
        console.log('tags', tags)
        console.log('content', content)
        console.log('\n')

    })
}

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', yargs => {
    return yargs.positional('note', {
      type: 'string',
      description: 'The content of the note to create'
    })
  }, async (argv) => {
    const tags = argv.tags ? argv.tags.split(',') : []
    const notes = await newNote(argv.note, tags)
    console.log('New Note !', notes)
  })
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'    
  })
  .command('all', 'get all notes', () => {}, async (argv) =>{
    const notes = await getAllNotes()
    listNotes(notes)
  })
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to the content',
      type: 'string'
    })
  }, async (argv) => {
    const matches = await findNotes(argv.filter)
    listNotes(matches)
  })

  .command('remove <id>', 'remove a note based on the id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async(argv) => {
    const id =  await removeNote(argv.id)
    if (id != null) {
      console.log(`Sucessfully removed the note: ${id}`)
    } else {
      console.log("Could'nt find the note of specified id")
    }
  })

  .command('web [port]', 'lauch website to see the notes', yargs => {
    return yargs 
      .positional('port', {
        describe: 'port to bind on',
        default: '4000',
        type: 'number'
      })
  }, async(argv) => {
    const notes = await getAllNotes()
    start(notes, argv.port)
  })

  .command('clean', 'remove all the notes', () => {}, async (argv) => {
    await removeAllNotes()
    console.log('All notes have been cleaned')
  })

  .demandCommand(1)
  .parse()
