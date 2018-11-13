const glob = require("@now/build-utils/fs/glob.js");
const { dirname } = require("path");
const { runNpmInstall } = require("@now/build-utils/fs/run-user-scripts.js");
const download = require("@now/build-utils/fs/download.js");
const getWritableDirectory = require("@now/build-utils/fs/get-writable-directory.js");

const Bundler = require("parcel-bundler");

const defaultConfig = {
  outDir: "./dist",
  outFile: "index.html",
  publicUrl: "./",
  watch: false,
  cache: true,
  cacheDir: ".cache",
  contentHash: true,
  minify: true,
  scopeHoist: false,
  target: "browser",
  logLevel: 2,
  hmr: false,
  sourceMaps: false,
  detailedReport: false
};

async function downloadFiles(files, entrypoint, workPath) {
  console.log("Downloading files...");
  const downloadedFiles = await download(files, workPath);
  const entryPath = downloadedFiles[entrypoint].fsPath;
  return { files: downloadedFiles, entryPath };
}

async function installDependencies(files, workPath) {
  const hasPkgJSON = Boolean(files["package.json"]);
  if (hasPkgJSON) {
    console.log("Installing dependencies...");
    await runNpmInstall(workPath, ["--prefer-offline", "--production"]);
  } else {
    throw new Error("Missing package.json");
  }
}

async function getBundlerConfiguration(config) {
  console.log("Defining bundler configuration...");
  const outDir = await getWritableDirectory();
  return {
    ...defaultConfig,
    ...config,
    outDir,
    watch: false,
    cache: false,
    cacheDir: ".cache",
    hmr: false
  };
}

async function bundle(entryPath, options) {
  console.log("Running bundler...");
  process.env.PARCEL_WORKERS = 1;
  const bundler = new Bundler(entryPath, options);
  await bundler.bundle();
}

function saveFiles(entrypoint, outDir) {
  console.log("Saving files...");
  const mountpoint = dirname(entrypoint);
  return glob("**", outDir, mountpoint);
}

exports.build = async ({ files, entrypoint, workPath, config = {} } = {}) => {
  const { files: downloadedFiles, entryPath } = await downloadFiles(
    files,
    entrypoint,
    workPath
  );
  await installDependencies(downloadedFiles, workPath);
  const options = await getBundlerConfiguration(config);
  await bundle(entryPath, options);
  return saveFiles(entrypoint, options.outDir);
};
