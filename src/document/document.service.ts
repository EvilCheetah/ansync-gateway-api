import { Injectable, Logger , NotFoundException} from "@nestjs/common";
import { EmailService } from "src/notification/email/email.service";
import { DocumentCreateDTO } from "./dto/document-create.dto";
import { spawn } from 'child_process';

const latex = require('node-latex')
const fs = require('fs')


@Injectable()
export class DocumentService
{
    private readonly logger = new Logger(DocumentService.name);

    constructor(
        private readonly emailService: EmailService
    ) {}

    // note to self: this is what is called by the controller during post requests
    create(documentCreateDTO: DocumentCreateDTO)
    {     
        this.logger.debug(documentCreateDTO);
        
        // find the python script
        const pyPath = 'src/populate_temp_table.py';

        // grab the desired template name from the DTO object
        const template_path = ('src/temp_tex_template/' + documentCreateDTO.template_name + '.tex');

        // define outputted PDF 
        const output = fs.createWriteStream('test_output.pdf')

        // turn DTO object back into JSON
        // note: this seems redundant...
        const jsonOutput = JSON.stringify(documentCreateDTO);
       
        // if template exists, then populate data  
        // note: this is NOT async, hopefully that's fine...?
        if (fs.existsSync(template_path)) {

            // prep the python script
            const pythonProcess = spawn('python', [pyPath]);

            // this sends the JSON data into the python script
            pythonProcess.stdin.write(jsonOutput);
            pythonProcess.stdin.end();

            // path 1: script succeeded
            pythonProcess.stdout.on('data', (data) => {

                // if the script was successful, generate PDF
                this.logger.debug(`Generating the document...`);
                const pdf = latex(fs.createReadStream('to_be_processed.tex'))

                // note: why not just "latex(input).pipe(output)"?
                pdf.pipe(output)
                pdf.on('error', err => console.error(err))
                pdf.on('finish', () => console.log('PDF generated!'))

                // need to impl email + saving services somewhere
                this.logger.debug(`Saving the document...`);
                this.logger.debug(`Sending an email...`);
                this.emailService.send_document(`FILE_URI`);

                console.log(`stdout: ${data}`);
            });

            // path 2: script error
            pythonProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });
            
        } else {
            throw new NotFoundException('Template not found!');
        } 
    }

    // i don't understand what's going on here tbh...
    getHello(): string {
        return 'Retrieving PDF';
    }
}