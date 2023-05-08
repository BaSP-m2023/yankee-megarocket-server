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
  const found = [];
  for (let i = 0; i < superAdmins.length; i += 1) {
    if (superAdminId === superAdmins[i].id.toString()) {
      const idFound = true;
      found.push(idFound);
    }
  }
  if (found[0]) {
    fs.writeFile('src/data/super-admins.json', JSON.stringify(filterSAdmins, null, 2), (err) => {
      if (err) {
        res.send('Error! Could not delete super admin!');
      } else {
        res.send('Super admin has been deleted');
      }
    });
  } else {
    res.send('Error. Id does not exist');
  }
});

export default router;
