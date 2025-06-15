import  config from '@/lib/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';


const sql = neon(config.env.databaseUrl || 'postgresql://neondb_owner:npg_UzM9ALuw8tOK@ep-purple-block-a1z49phl-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');



export const db = drizzle( { client: sql , casing: "snake_case"});
