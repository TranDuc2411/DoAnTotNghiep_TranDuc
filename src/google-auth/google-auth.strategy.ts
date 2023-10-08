import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '727143753659-ktehlrh35teqhprctp6fr9j8ll3qa3eh.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth02/login',
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    // Handle user data returned from Google here
    const user = {
      googleId: profile.id,
      email: profile.emails[0].value,
      displayName: profile.displayName,
      // Add any other user information you need
    };
    done(null, user);
  }
}
