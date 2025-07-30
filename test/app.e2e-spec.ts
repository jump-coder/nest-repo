import * as request from 'supertest';
import { databaseService, server } from './setup';

describe('AppController (e2e)', () => {


  it('/ (GET)', async () => {
    // 响应应该是一个用户列表
    await databaseService.user.create({
      data: {
        email: 'ceshi@example.com'
      }
    })

    const users = await databaseService.user.count()
    console.log('期待一个用户: ', users);

    return request(server)
      .get('/')
      .expect(200)
      .expect(({ body }) => {
        expect(body.data).toBe('Hello World!')
      });
  });
});
