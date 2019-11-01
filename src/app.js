const { app, BrowserWindow } = require('electron')


const DbContext = require('./config/dbContext');
const ProjectRepository = require('./repositories/projectRepository');
const TaskRepository = require('./repositories/taskRepository');

const ctx = new DbContext('database.sqlite3');
const taskRepository = new TaskRepository(ctx);
const projectRepository = new ProjectRepository(ctx);

let win;

async function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
  })

  win.loadFile('src/index.html');

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

  await taskRepository.createTable();
  await projectRepository.createTable();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (win === null) {
   await createWindow();
  }
});
