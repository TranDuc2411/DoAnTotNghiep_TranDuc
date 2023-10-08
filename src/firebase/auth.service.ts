// firebase.service.ts

import * as admin from 'firebase-admin';

export class FirebaseService {
  private readonly firebaseAdmin: admin.app.App;

  constructor() {
    // Khởi tạo Firebase Admin SDK với tệp dịch vụ (Service Account Key) bạn đã tải xuống
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert('path/to/your-serviceAccountKey.json'),
      databaseURL: 'https://your-project-id.firebaseio.com', // Thay thế bằng URL của dự án Firebase của bạn
    });
  }

  // Sử dụng Firebase Admin SDK trong các phương thức của bạn
  // Ví dụ:
  async createUser(email: string, password: string) {
    try {
      const user = await this.firebaseAdmin.auth().createUser({
        email,
        password,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
