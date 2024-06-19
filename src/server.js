const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint para processar pagamentos fictícios
app.post('/api/process-payment', async (req, res) => {
    const { cardNumber, cardName, expiryDate, cvv, amount } = req.body;

    // Validação básica de dados
    if (cardNumber.length !== 16 || cvv.length !== 3) {
        return res.status(400).json({ message: 'Invalid card details', status: 'error' });
    }

    try {
        // Inserção da transação fictícia no banco de dados
        const result = await pool.query(
            'INSERT INTO transactions (card_number, card_name, expiry_date, cvv, amount, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [cardNumber, cardName, expiryDate, cvv, amount, 'success']
        );

        const transaction = result.rows[0];
        res.status(200).json({
            message: 'Payment successful',
            status: 'success',
            transactionId: transaction.id,
            transactionDetails: {
                cardName: transaction.card_name,
                amount: transaction.amount,
                status: transaction.status,
                createdAt: transaction.created_at,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', status: 'error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
