import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      // https://www.md5online.org
      // to generate the encryption string
      // gobarberrocketseatnode2 is : f29618255c309de4469993cce24286ea
      token: jwt.sign({ id }, 'f29618255c309de4469993cce24286ea', {
        expiresIn: '7d',
      }),
    });
  }
}

export default new SessionController();
