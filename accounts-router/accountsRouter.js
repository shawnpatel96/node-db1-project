const express = require('express');
// database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();


router.get('/', (req, res) => {
	db.select('*')
	.from('accounts') 
	.then(rows => {
		res.status(200).json({ data: rows });
	})
	.catch(err => {
		res.status(500).json({message: 'Error' });
	});
});
router.get('/:id', (req, res) => {
	db('accounts').where({id: req.params.id})
	.first()
	.then(account => {
		res.status(200).json({ data: account });
	})
	.catch(err => {
		res.status(500).json({message: 'Error' });
	});
});
router.post('/', (req, res) => {
	db('accounts').insert(req.body, 'id') 
	.then(ids => {
		res.status(201).json({ results: ids });
	})
	.catch(err => {
		res.status(500).json({message: 'Error' });
	});
});
router.put('/:id', (req, res) => {
    db('accounts')
	.where({ id: req.params.id }) 
	.update(req.body) 
	.then(count => {
		if (count > 0) {
			res.status(200).json({ message: 'record updated' });
		} else {
			res.status(404).json({ message: 'record not found' });
		}
	})
    .catch(err => {
		res.status(500).json({message: 'Error' });
	}); 
});
router.delete('/:id', (req, res) => {
	db('accounts')
	.where({ id: req.params.id }) 
	.del()
	.then(count => {
		if (count > 0) {
			res.status(200).json({ message: 'record deleted' });
		} else {
			res.status(404).json({ message: 'record not found.' });
		}
	})
	.catch(err => {
		res.status(500).json({message: 'Error' });
	}); 
});



module.exports = router;