import gulp from "gulp";
import fs from "fs";
import prettier from "gulp-prettier";
import readline from "readline";
import footer from "gulp-footer";

/* 1. The code will check if the page name already exists in the js/pages, templates, scss/pages and
data/en-gb folders.
2. If the page name already exists, it will print out a red message and skip to the next page name.
3. If the page name does not exist, it will create the page and print out a green message.
4. The code will also update the main.scss file to include the new page. */
export function generate(done) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(
    "\x1b[33m",
    "\nGenerating html, js, scss and json page"
  );
  rl.question(
    "Page name (use space to separate page) : ",
    function (value) {
      var pageName = value.split(" ");

      var successPage = [];
      var failPage = [];

      var i = 0,
        len = pageName.length;
      while (i < len) {
        if (
          fs.existsSync(`js/pages/${pageName[i]}.js`) ||
          fs.existsSync(`templates/${pageName[i]}.html`) ||
          fs.existsSync(
            `scss/pages/_${pageName[i]}.scss`
          ) ||
          fs.existsSync(`data/en-gb/${pageName[i]}.json`)
        ) {
          failPage.push(pageName[i]);
          console.log(
            "\x1b[31mFailed create page: " + pageName[i]
          );
        } else {
          successPage.push(pageName[i]);
          makeHtml(pageName[i]);
          makeScss(pageName[i]);
          makeScript(pageName[i]);
          makeJson(pageName[i]);
          console.log(
            "\x1b[32mCreate page: " + pageName[i]
          );
        }

        i++;
      }
      updateMainScss(successPage);
      console.log("\n");
      rl.close();
      done();
    }
  );
}

/**
 * Create a new HTML file in the `templates` folder
 * @param {string} pageName - The name of the page.
 * @returns Nothing.
 */
function makeHtml(pageName) {
  var pagePath = `templates/${pageName}.html`;
  var writeStream = fs.createWriteStream(pagePath);

  writeStream.write(
    `<div id="${pageName}" class="page">
        <div class="scroll-inner">
            <div class="content-inner"></div>
        </div>
    </div>`
  );
  writeStream.end();
  writeStream.on("close", function () {
    return gulp
      .src(pagePath, {
        base: "./",
      })
      .pipe(
        prettier({
          printWidth: 100,
        })
      )
      .pipe(gulp.dest("./"));
  });
}

/**
 * Create a new file in the scss/pages directory with the name of the page
 * @param {string} pageName - The name of the page.
 */
function makeScss(pageName) {
  var pagePath = `scss/pages/_${pageName}.scss`;
  var writeStream = fs.createWriteStream(pagePath);

  writeStream.write(`#${pageName} {}`);
  writeStream.end();
}

/**
 * Create a JavaScript file for a page
 * @param {string} pageName - The name of the page.
 * @returns Nothing.
 */
function makeScript(pageName) {
  var pagePath = `js/pages/${pageName}.js`;
  var writeStream = fs.createWriteStream(pagePath);

  writeStream.write(
    `function onNextButtonClicked() {goto("");}

    function onPreviousButtonClicked() {goto("");}

    $(function () {animationHandle();gameHandle();});

    function animationHandle() {}

    function gameHandle() {}

    preloadImages("");`
  );
  writeStream.end();
  writeStream.on("close", function () {
    return gulp
      .src(pagePath, {
        base: "./",
      })
      .pipe(
        prettier({
          printWidth: 100,
        })
      )
      .pipe(gulp.dest("./"));
  });
}

/**
 * Create a JSON file with a single key and value
 * @param {string} pageName - The name of the page you want to create.
 * @returns The gulp stream.
 */
function makeJson(pageName) {
  var pagePath = `data/${
    process.env.DEFAULT_LANGUAGE
      ? process.env.DEFAULT_LANGUAGE
      : "en-gb"
  }/${pageName}.json`;
  var writeStream = fs.createWriteStream(pagePath);

  writeStream.write(`[{
        "key":"key",
        "data":{
            "value":"text","validated":false,"comment":""
        }
    }]`);
  writeStream.end();
  writeStream.on("close", function () {
    return gulp
      .src(pagePath, {
        base: "./",
      })
      .pipe(
        prettier({
          printWidth: 100,
        })
      )
      .pipe(gulp.dest("./"));
  });
}

/**
 * @param {Array} pageNames
 *
 * @return gulp stream
 */
function updateMainScss(pageNames) {
  var filePath = `scss/main.scss`;
  let strImportPage = ``;
  for (let i = 0; i < pageNames.length; i++) {
    strImportPage += `@import "pages/${pageNames[i]}";\n`;
  }
  return gulp
    .src(filePath, { base: "./" })
    .pipe(footer(strImportPage))
    .pipe(gulp.dest("./"));
}
