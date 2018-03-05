"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const tl = require('vsts-task-lib/task');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let echoPath = tl.which('ping');
            let ping = tl.tool(echoPath).arg(tl.getInput('remotehost', true));
            let output = "";
            let execOptions = { silent: true };
            ping.on('stdout', (buffer) => { output += buffer; });
            let result = yield ping.exec(execOptions);
            let match = output.match("(\\d+)(?=% loss\\))");
            tl._writeLine("Output:" + output);
            if (match == null) {
                tl.setResult(tl.TaskResult.Failed, output);
            }
            else {
                let percentage = +match[0];
                if (percentage == 100) {
                    tl.setResult(tl.TaskResult.Failed, "100% Loss");
                }
                else if (percentage == 0) {
                    tl.setResult(tl.TaskResult.Succeeded, "0% Loss");
                }
                else {
                    tl.setResult(tl.TaskResult.Succeeded, percentage + "% Loss");
                }
            }
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
//# sourceMappingURL=ping.js.map