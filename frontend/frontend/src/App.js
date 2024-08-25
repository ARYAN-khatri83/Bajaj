import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import custom CSS for styling

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const result = await axios.post('http://localhost:5078/bfhl', JSON.parse(jsonInput));
            setResponse(result.data);
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    const renderResponse = () => {
        if (!response) return null;
        return (
            <div className="response-container">
                {selectedOptions.includes('Numbers') && (
                    <div className="response-item">
                        <h4>Numbers:</h4>
                        <p>{response.numbers.join(', ')}</p>
                    </div>
                )}
                {selectedOptions.includes('Alphabets') && (
                    <div className="response-item">
                        <h4>Alphabets:</h4>
                        <p>{response.alphabets.join(', ')}</p>
                    </div>
                )}
                {selectedOptions.includes('Highest lowercase alphabet') && (
                    <div className="response-item">
                        <h4>Highest Lowercase Alphabet:</h4>
                        <p>{response.highest_lowercase_alphabet.join(', ')}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="app-container">
            <h1 className="title">Bajaj Finserv Health Challenge</h1>
            <div className="form-container">
                <textarea
                    className="json-input"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Enter JSON data"
                    rows={6}
                />
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
            <div className="dropdown-container">
                <label className="dropdown-label">Select Data to Display:</label>
                <select
                    className="dropdown"
                    multiple
                    onChange={(e) => setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))}
                >
                    <option value="Numbers">Numbers</option>
                    <option value="Alphabets">Alphabets</option>
                    <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                </select>
            </div>
            {renderResponse()}
        </div>
    );
}

export default App;
