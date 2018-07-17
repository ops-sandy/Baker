const child_process = require('child_process');
const conf          = require('../../lib/modules/configstore');
const fs            = require('fs-extra')
const path          = require('path');
const Print         = require('../modules/print');
const Servers        = require('../modules/servers');

const { configPath, bakerForMacPath } = require('../../global-vars');

exports.command = 'setupmac'
exports.desc = 'create a Baker server which will be used for provisioning yor VMs'

exports.builder = (yargs) => {
    yargs.options({
        force:{
            alias: 'f',
            describe: `re-configure Baker for Mac`,
            demand: false,
            type: 'boolean'
        },
        ssh:{
            describe: `ssh`,
            demand: false,
            type: 'boolean'
        }
    });
}

exports.handler = async function (argv) {
    const { force, ssh } = argv

    try {
        if(ssh) {
            child_process.execSync(`ssh -i "${path.join(bakerForMacPath, 'baker_rsa')}" -p 6022 -o StrictHostKeyChecking=no root@localhost`, {stdio: ['inherit', 'inherit', 'inherit']});
        }
        else {
            await Servers.setupBakerForMac(force);
        }
    } catch (err) {
        Print.error(err);
    }
  }
