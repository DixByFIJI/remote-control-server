import { Sequelize } from 'sequelize';
import { promises as fs } from 'fs';
import { join } from 'path';

export default {
  init: async (sequelize: Sequelize) => {
    const files = await fs.readdir(__dirname);
    const scripts = files.filter(
      (file) => !file.startsWith('.') && file.endsWith('.sql')
    );

    const asyncTasks = scripts.map(async (script) => {
      const buffer = await fs.readFile(join(__dirname, script));
      const source = buffer.toString();

      return sequelize.query(source);
    });

    return Promise.all(asyncTasks);
  },

  preload: async (sequelize: Sequelize) => {
    const commands = [
      {
        phrase: '[un]mute',
        body: 'Enable or disable system sounds',
        code: 'MUTE',
      },
      {
        phrase: 'turn off [in <time> (seconds|minutes|hours)]',
        body: 'Shutdown the computer',
        code: 'SHUTDOWN',
      },
      {
        phrase: 'reboot [in <timeout> (seconds|minutes|hours)]',
        body: 'Shutdown the computer',
        code: 'REBOOT',
      },
      {
        phrase: 'cancel',
        body: 'Cancel the last scheduled shutdown',
        code: 'CANCEL',
      },
      {
        phrase: 'log out',
        body: 'Lock the screen',
        code: 'LOGOUT',
      },
      {
        phrase: 'toggle',
        body: 'Show or hide desktop',
        code: 'TOGGLE',
      },
      {
        phrase: 'switch',
        body: 'Switch between opened windows',
        code: 'SWITCH',
      },
      {
        phrase: 'close',
        body: 'Close the current window',
        code: 'CLOSE',
      },
      {
        phrase: 'google <query>',
        body: 'Make google search request',
        code: 'GOOGLE',
      },
      {
        phrase: 'search <query>',
        body: 'Search in the system search',
        code: 'SEARCH',
      },
      {
        phrase: 'browse <web-resource>',
        body: 'Open web-resource in browser',
        code: 'BROWSE',
      },
      {
        phrase: '<text> save note [as <filename>]',
        body: 'Note pronounced text (if no filename provided, the current date will be used)',
        code: 'NOTE',
      },
      {
        phrase: 'type <text>',
        body: 'Type pronounced text in the focused area',
        code: 'TYPE',
      },
      {
        phrase: '<key>',
        body: 'Press key on the keyboard (use full names, e.g. "escape", "windows")',
        code: 'KEY',
      },
    ];

    return Promise.all([
      sequelize.models.Command.bulkCreate(commands, {
        updateOnDuplicate: ['code'],
      }),
    ]);
  },
};
