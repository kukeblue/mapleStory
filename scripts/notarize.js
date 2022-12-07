require('dotenv').config()
const {notarize} = require('electron-notarize')

exports.default = async function notarizing (context) {
  const appName = context.packager.appInfo.productFilename
  const {electronPlatformName, appOutDir} = context
  if (electronPlatformName !== 'darwin') {
    return
  }

  let appPath = `${appOutDir}/${appName}.app`
  let {appleId, appBundleId, ascProvider, appleIdPassword} = process.env

  return await notarize({
    appBundleId,
    appPath,
    ascProvider,
    appleId,
    appleIdPassword
  })
}