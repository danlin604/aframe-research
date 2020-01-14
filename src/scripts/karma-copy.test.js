const fs = require('fs');

fs.copyFile(
  'src/scripts/karma-context.html',
  'node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/karma-context.html',
  (err) => {
    if (err) throw err;
  }
);

fs.copyFile(
  'src/scripts/karma-debug.html',
  'node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/karma-debug.html',
  (err) => {
    if (err) throw err;
  }
);
