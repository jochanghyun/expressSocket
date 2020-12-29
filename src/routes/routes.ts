import * as express from 'express';
import * as path from 'path';


const viewsDir = path.join(__dirname, '../views');
console.log(viewsDir);
const srcDir = path.join(__dirname, '../');
export class Routes {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
    this.setStaticDir();
    this.home();
    this.chat();
  }

  private home(): void {
    this.app.get('/', (req, res) => res.render('main.html'));
  }
  private chat(): void {
    this.app.get('/chat', (req, res) => res.render('chat.html'))
  }

  private setStaticDir(): void {
    this.app.use(express.static(viewsDir));
  }

  public getRoutes(): void {
    this.home();
  }
}