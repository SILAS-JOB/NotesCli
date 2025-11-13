import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', yargs => {
    return yargs.positional('note', {
      type: 'string',
      description: 'The content of the note to create'
    })
  }, (argv) => {
    console.log('hello', argv.note)
  })
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'    
  })
  .command('all', 'get all notes', () => {}, async (argv) =>{

  })
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to the content',
      type: 'string'
    })
  }, async (argv) => {

  })

  .command('remove <id>', 'remove a note based on the id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async(argv) => {

  })

  .command('web [port]', 'lauch website to see the notes', yargs => {
    return yargs 
      .positional('port', {
        describe: 'port to bind on',
        default: '5000',
        type: 'number'
      })
  }, async(argv) => {

  })

  .command('clean', 'remove all the notes', () => {}, async (argv) => {

  })

  .demandCommand(1)
  .parse()
