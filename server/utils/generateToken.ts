
import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for a specific user ID
 * @param id The user ID to encode
 * @returns A signed JWT token string
 */
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export default generateToken;
