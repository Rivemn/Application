interface DecodedToken {
  sub: string;
  email: string;
  fullName: string;
  exp: number;
  iat?: number;
}
