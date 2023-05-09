import { Router } from 'express';
import { writeFile } from 'fs/promises';
import superAdmins from '../data/super-admins.json';

const fs = require('fs');

const router = Router();
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

router.delete('/:id', (req, res) => {
  const superAdminId = req.params.id;
  const filterSAdmins = superAdmins.filter((sprAdmin) => sprAdmin.id.toString() !== superAdminId);
  const superAdminFound = superAdmins.find((superA) => superA.id.toString() === superAdminId);
  if (!superAdminFound) {
    return res.status(404).send('Super Admin not found!');
  }
  fs.writeFile('src/data/super-admins.json', JSON.stringify(filterSAdmins, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error! could not delete superadmin');
    }
    return res.send('Superadmin deleted');
  });
  return null;
});

export default router;
