const { exec } = require("child_process");

exec("cd webpanel && next dev", (error, stdout, stderr, est, twa) => {
    if (error) {
        console.error(error.message);
        return;
    }
    if (stderr) {
        console.error(stderr);
        return;
    }
    console.log(stdout);
});
