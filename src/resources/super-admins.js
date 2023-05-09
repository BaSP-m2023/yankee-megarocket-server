import { Router } from 'express';
import { writeFile } from 'fs/promises';
import superAdmins from '../data/super-admins.json';

const router = Router();

router.get('/', (req, res) => {
  if (!superAdmins) return res.send('superAdmin error');
  return res.send(superAdmins);
});

router.get('/:id', (req, res) => {
  const superAdminID = req.params.id;
  const foundSuperAdmin = superAdmins.find((superA) => superA.id.toString() === superAdminID);
  if (!foundSuperAdmin) return res.send('SuperAdmin not found');
  return res.send(foundSuperAdmin);
});
router.post('/', async (req, res) => {
  const { id, email, password } = req.body;

  if (!id || !email || !password) {
    res.status(400).json({ error: 'The fields cannot be blank' });
    return;
  }
  try {
    superAdmins.push({ id, email, password });
    await writeFile('src/data/super-admins.json', JSON.stringify(superAdmins, null, 2));
    res.send('Success, Super admin user was created');
  } catch (error) {
    res.status(500).json({ error: 'Error, Super admin user could not be created' });
  }
});

export default router;
