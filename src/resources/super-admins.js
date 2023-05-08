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
  const superId = req.params.id;
  const filteredSuperAdmin = superAdmins.filter((SA) => SA.id.toString() !== superId);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(filteredSuperAdmin, null, 2), (err) => {
    if (err) {
      res.send('Super Admin could not be deleted');
    } else {
      res.send('Super Admin has been removed');
    }
  });
});

export default router;
