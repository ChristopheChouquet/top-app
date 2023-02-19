//jsonwebtoken permet créer et viérifier des tokens d'authentifications.
//On importe jsonwebtoken (npm install jsonwebtoken pour l'obtenir).
import jwt from 'jsonwebtoken';


/* Ce middleware vérifie si un token est présent dans le cookie token de la requête. 
Si c'est le cas, il décode le token en utilisant la clé secrète "RANDOM_TOKEN_SECRET" et extrait l'ID de l'utilisateur.
Ensuite, il vérifie si l'ID de l'utilisateur dans le token correspond à celui dans la requête.
Si c'est le cas, il ajoute l'ID de l'utilisateur à la requête et appelle la fonction next() pour passer au middleware suivant.
Sinon, il renvoie une erreur 401. */
const auth = (req, res, next) => {
    
  const token = req.cookies.token;
  console.log('req.cookies.token', req.cookies.token);
  console.log('req.headers.cookie', req.headers.cookie);
  console.log('req.body.headers', req.body.headers);
  if (!token) {
    return res.status(401).json({ message: 'Authentification requise.' });
  }
  try {
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable';
    } else {
      req.userId = userId;
      next();
    }
  } catch {
    res.status(401).json({ message: 'Authentification requise.' });
  }
};

export default auth;
