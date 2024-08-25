const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json());

app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
    const lowercaseAlphabets = alphabets.filter(item => /^[a-z]+$/.test(item));
    const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().reverse()[0]] : [];

    res.json({
        is_success: true,
        user_id: "Aryan_khatri_17082003", 
        email: "aryan.khatri2021@vitstudent.ac.in", 
        roll_number: "21BDS0352", 
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

const PORT = process.env.PORT || 5078;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
