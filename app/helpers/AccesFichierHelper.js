'use strict';

const fs = require('fs');
const path = require('path');
const { image_supportedExtension: supportedImageExtensions, data_config: dataConfig } = require('../../config/app_config/data_config');

module.exports = class AccesFichierHelper {
  static createFile (filepath) {
    if (!fs.existsSync(filepath)) {
      const stop = filepath.lastIndexOf('/');
      if (stop > 0) {
        const dir = filepath.substring(0, stop);
        AccesFichierHelper.createFolder(dir);
      }
      fs.appendFileSync(filepath, '');
    }
  }

  static deleteFile (filepath) {
    try {
      fs.unlinkSync(filepath);
    } catch (error) {
      throw Error(error);
    }
  }

  static deleteFolder (dirpath) {
    try {
      fs.rmdirSync(dirpath, { recursive: true });
    } catch (error) {
      throw Error(error);
    }
  }

  static writeFileAndCreate (fileName, line) {
    fs.writeFileSync(fileName, line + '\n');
  }

  static createBlankFile (fileName) {
    fs.writeFileSync(fileName, '');
  }

  static writeFile (fileName, line) {
    fs.appendFileSync(fileName, line + '\n');
  }

  static getDirectories (srcpath) {
    return fs.readdirSync(srcpath)
      .filter(filename => fs.statSync(path.join(srcpath, filename)).isDirectory());
  }

  static createFolder (path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }

  static getAllImagesPath (dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
      if (fs.statSync(dirPath + '/' + file).isDirectory()) {
        arrayOfFiles = AccesFichierHelper.getAllImagesPath(dirPath + '/' + file, arrayOfFiles);
      } else {
        for (const extension of supportedImageExtensions) {
          const fileExtension = path.extname(file);
          if (extension === fileExtension) {
            let imagePath = path.join(dirPath, '/', file);
            imagePath = imagePath.replace(dataConfig.depot, '');
            arrayOfFiles.push(imagePath);
            break;
          }
        }
      }
    });

    return arrayOfFiles;
  }
};
