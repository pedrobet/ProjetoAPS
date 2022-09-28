export default interface ICreateUserTokenDTO {
  user_id: string;
  expiresAt: Date;
  refresh_token: string;
}
