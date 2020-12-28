import * as express from 'express';
import * as path from 'path';

export class Routes {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
    this.setStaticDir();
  }

  private home(): void {
    this.app.get('/', (req, res) => {
      res.sendFile('index.html');
    });
  }
  private chat(): void {
    this.app.get('/chat', (req, res) => {
      res.sendFile('chat.html');
    })
  }


  private setStaticDir(): void {
    this.app.use(express.static(path.join(__dirname, '../views')));
  }

  public getRoutes(): void {
    this.home();
  }
}