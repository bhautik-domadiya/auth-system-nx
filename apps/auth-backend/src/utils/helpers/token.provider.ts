import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from './crypto.provider';
import { WinstonLogger } from '../logger/WinstonLogger';
import { ErrorInvalidUserToken } from '../auth/errors/error-invalid-user-token';
import { env } from '../../env';

type JwtPayload = {
  sub: string | number;
};

export interface ITokenProvider {
  createAccessToken(payload: JwtPayload): Promise<string>;
  createRefreshToken(payload: JwtPayload): Promise<string>;
}

@Injectable()
export class TokenProvider implements ITokenProvider {
  constructor(
    private readonly jwtService: JwtService,
    private cryptoService: CryptoService,
    private readonly logger?: WinstonLogger
  ) {}

  public async createAccessToken(payload: JwtPayload): Promise<string> {
    const encryptedSub = this.cryptoService.encrypt(payload.sub.toString());
    payload.sub = JSON.stringify(encryptedSub);

    return this.jwtService.signAsync(payload, {
      secret: env.jwtSecret.accessTokenSecret,
      expiresIn: env.jwtSecret.accessTokenExpiry,
    });
  }

  public async createRefreshToken(payload: JwtPayload): Promise<string> {
    const encryptedSub = this.cryptoService.encrypt(payload.sub.toString());
    console.log("Sub",payload);
    
    payload.sub = JSON.stringify(encryptedSub);

    return this.jwtService.signAsync(payload, {
      secret: env.jwtSecret.refreshTokenSecret,
      expiresIn: env.jwtSecret.refreshTokenExpiry,
    });
  }

  public async decryptRefreshToken(refreshToken: string): Promise<JwtPayload> {
    this.logger.info(`Auth:  | Executing verifying refresh token.`);
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: env.jwtSecret.refreshTokenSecret,
    });

    if (!payload) {
      throw new ErrorInvalidUserToken();
    }
console.log("Payload",payload);

    let subPayload = JSON.parse(payload.sub);
  

    const refreshPayload = {
      sub: this.cryptoService.decrypt(subPayload),
    };
    console.log('Final =>', refreshPayload);

    this.logger.info(`Auth:  | verifying refresh token successfully .`);
    return refreshPayload;
  }
}
