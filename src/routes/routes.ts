import * as express from 'express';
import * as path from 'path';
import * as moment from 'moment';

const viewsDir = path.join(__dirname, '../views');
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
    this.app.get('/', (req, res) => res.render('main/main'));
  }
  private chat(): void {
    this.app.get('/chat', (req, res) => {

      res.render('chat/chat', {
        userName: req.query.username,
        roomName: req.query.room,
        time: moment().format('YYYY-MM-DD \t HH : MM'),
        contents: req.query.username + '님 입장하셨습니다.'
      });
    });
  }

  private setStaticDir(): void {
    this.app.use(express.static(viewsDir));
  }

  public getRoutes(): void {
    this.home();
  }
}