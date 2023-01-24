import gulp from "gulp";
import { deleteAsync } from "del";
import fs from "fs";
import shell from "shelljs";
import prettier from "gulp-prettier";

import {
  deepListDir,
  deepListDirSync,
} from "deep-list-dir";

export async function preload(done) {
  await deleteAsync(["js/controller/preload.js"]);

  var writeStream = fs.createWriteStream(
    "js/controller/preload.js"
  );

  writeStream.write(
    "function preloadImages(expression) {\r\n"
  );
  // [start] switch
  writeStream.write("switch (expression) {\r\n");

  // preload general file
  writeStream.write("// general \r\n");
  // [start] case
  writeStream.write("case 'general': \r\n");
  writeStream.write("$.preloadImages( \r\n");

  // preload general file
  await deepListDir("images/general").then(function (item) {
    var i = 0,
      len = item.length;
    while (i < len) {
      if (!item[i].includes("DS_Store"))
        writeStream.write(
          "'" + item[i].replace(/\\/g, "/") + "', \r\n"
        );
      i++;
    }
  });

  writeStream.write(")\r\n");
  writeStream.write("break; \r\n\r\n");

  // preload page file
  var pages = shell.ls("images/pages");

  var i = 0,
    len = pages.length;
  while (i < len) {
    await writeStream.write("// " + pages[i] + " \r\n");
    await writeStream.write(
      "case '" + pages[i] + "': \r\n"
    );
    await writeStream.write("$.preloadImages( \r\n");

    await deepListDir("images/pages/" + pages[i], {
      minimatchOptions: { matchBase: false },
    }).then(function (item) {
      var i = 0,
        len = item.length;
      while (i < len) {
        // console.log(item);
        if (!item[i].includes("DS_Store"))
          writeStream.write(
            "'" + item[i].replace(/\\/g, "/") + "', \r\n"
          );
        i++;
      }
    });

    await writeStream.write(")\r\n");
    await writeStream.write("break; \r\n\r\n");

    i++;
  }

  writeStream.write("}\r\n");
  writeStream.write("}");
  // [end] switch

  writeStream.end();

  writeStream.on("close", function () {
    return gulp
      .src("js/controller/preload.js", { base: "./" })
      .pipe(prettier({ printWidth: 100 }))
      .pipe(gulp.dest("./"));
  });
}
