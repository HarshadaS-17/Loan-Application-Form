import axios from 'axios';
import { asyncHandler } from '../Utils/asyncHandler.js';


const checkCibilScore = asyncHandler(async (req, res) => {
    const { name, pan, dob, mobile, email } = req.body;

    if (!name || !pan || !dob || !mobile || !email) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Call the CIBIL API
        const response = await axios.post(process.env.CIBIL_API_URL, {
            name,
            pan,
            dob,
            mobile,
            email
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.CIBIL_API_KEY}`
            }
        });

        // Response from CIBIL API
        res.status(200).json({
            score: response.data.score,
            report: response.data.report
        });

    } catch (error) {
        console.error('Error fetching CIBIL score:', error);
        res.status(500).json({
            message: 'Failed to fetch CIBIL Score',
            error: error.response ? error.response.data : error.message
        });
    }
});


export {
    checkCibilScore
}