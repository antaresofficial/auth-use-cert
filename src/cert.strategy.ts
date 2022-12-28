import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cert-header';

const users = ['client'];

function lookupUser(cn, done) {
  const user = users.indexOf(cn) >= 0 ? { username: cn } : null;
  done(null, user);
}

@Injectable()
export class CertHeaderStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      header: 'client-cert',
    });
  }
  async validate(payload, done) {
    const { cert } = payload;
    const { subject } = cert;
    let msg = 'Attempting PKI authentication';

    if (!subject) {
      console.log(`${msg} ✘ - no subject`);
      done(null, false);
    } else if (!subject.CN) {
      console.log(`${msg} ✘ - no client CN`);
      done(null, false);
    } else {
      const cn = subject.CN;

      lookupUser(cn, (err, user) => {
        msg = `Authenticating ${cn} with certificate`;

        if (!user) {
          console.log(`${msg} ✘ - no such user`);
          done(null, false);
        } else {
          console.log(`${msg} - ✔`);
          done(null, user);
        }
      });
    }
  }
}
