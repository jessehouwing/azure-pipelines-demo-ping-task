import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');

async function run() {
    try {
        let echoPath = tl.which('ping');
        let ping = tl.tool(echoPath).arg(tl.getInput('remotehost', true));
        let output: string = "";
        let execOptions = { silent: true } as trm.IExecOptions;
        ping.on('stdout', (buffer: Buffer) => { output += buffer; });
 
        let result: number = await ping.exec(execOptions);

        let match = output.match("(\\d+)(?=% loss\\))");
        tl._writeLine("Output:"+ output)
        if (match == null)
        {
            tl.setResult(tl.TaskResult.Failed, output);
        }
        else
        {
            tl._writeLine("Result:"+ match[0])
            let percentage: number = +match[0];
            tl._writeLine("Percentage: " + percentage)
            if (percentage == 100)
            {
                tl.setResult(tl.TaskResult.Failed, "100% Loss");
            }
            else if (percentage == 0)
            {
                tl.setResult(tl.TaskResult.Succeeded, "0% Loss");
            }
            else
            {
                tl.setResult(tl.TaskResult.Succeeded, percentage + "% Loss");
            }
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();