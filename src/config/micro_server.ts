const n = process.env.NODE_ENV

export const server_user =
  n === 'development' || n === 'test'
    ? 'http://localhost:3001'
    : process.env.SERVER_USER || 'https://mole-server-user.crowfx.online/'

export const server_promo =
  n === 'development' || n === 'test'
    ? 'http://localhost:3002'
    : process.env.SERVER_PROMO || 'DOMAIN_NAME_HERE'
