import { Router } from 'express';
import { writeFile } from 'fs/promises';
import superAdmins from '../data/super-admins.json';

const router = Router();
router.post('/signup', async (req, res) => {
  const { id, email, password } = req.body;

  if (!id || !email || !password) {
    res.status(400).json({ error: 'The fields cannot be blank' });
    return;
  }

  const SuperAdmin = { id, email, password };

  try {
    superAdmins.push(SuperAdmin);
    await writeFile('src/data/super-admins.json', JSON.stringify(superAdmins, null, 2));
    res.send('Success, Super admin user was created');
  } catch (error) {
    res.status(500).json({ error: 'Error, Super admin user could not be created' });
  }
});
export default router;
