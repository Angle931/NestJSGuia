import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Role } from '@prisma/client';

interface JwtPayload {
  id: number;
  email: string;
  role: Role;
  tenantId: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('Falta configurar JWT_SECRET en .env');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      algorithms: ['HS256'],
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.id,
      email: payload.email,
      role: payload.role,
      tenantId: payload.tenantId,
    };
  }
}