import dotenv from 'dotenv'

const env = dotenv.config()
env.parsed = {
  ...env.parsed,
  ...dotenv.config({ path: '.env.local' }).parsed
}

if (typeof env.parsed === undefined) {
  throw env.error
}

const ENV = env.parsed

export function getEnv (name: string, defaultValue: string): string {
  return ENV[name] ?? defaultValue
}
