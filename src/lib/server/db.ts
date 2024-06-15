import pg from 'postgres';

export const sql = pg({ user: 'postgres', password: 'pass' });
