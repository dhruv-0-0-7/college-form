const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const { MongoClient } = require('mongodb');
const { Parser } = require('json2csv');

const app = express();
const PORT = process.env.PORT || 4000;
const parser = new Parser({
    fields: [
        {
            label: 'Course',
            value: 'course'
        },
        {
            label: 'Type of Exam',
            value: 'typeOfExam'
        },
        {
            label: 'Date of Exam',
            value: 'dateOfExam'
        },
        {
            label: 'Branch Name',
            value: 'branch'
        },
        {
            label: 'Semester',
            value: 'semester'
        },
        {
            label: 'Subject Code',
            value: 'subjectCode'
        },
        {
            label: 'Subject Name',
            value: 'subjectName'
        },
        {
            label: 'External Examiner\'s Name',
            value: 'external_examiner.name'
        },
        {
            label: 'External Examiner\'s Institute Name',
            value: 'external_examiner.instituteName'
        },
        {
            label: 'External Examiner\'s Mobile Number',
            value: 'external_examiner.mobile'
        },
        {
            label: 'External Examiner\'s Email Address',
            value: 'external_examiner.email'
        },
        {
            label: 'External Examiner\'s Bank Name',
            value: 'external_examiner.bank'
        },
        {
            label: 'External Examiner\'s Bank Account Number',
            value: 'external_examiner.accountNo'
        },
        {
            label: 'External Examiner\'s Bank IFSC',
            value: 'external_examiner.ifsc'
        },
        {
            label: 'External Examiner\'s Honorarium',
            value: 'external_examiner.amount'
        },
        {
            label: 'External Examiner\'s DA',
            value: 'external_examiner.da'
        },
        {
            label: 'External Examiner\'s TA',
            value: 'external_examiner.ta'
        },
        {
            label: 'External Examiner\'s Accomodation',
            value: 'external_examiner.accomodation'
        },
        {
            label: 'Internal Examiner\'s Name',
            value: 'internal_examiner.name'
        },
        {
            label: 'Internal Examiner\'s Honorarium',
            value: 'internal_examiner.amount'
        },
        {
            label: 'Laboratory Assistant/Instructor\'s Name',
            value: 'lab_assistant.name'
        },
        {
            label: 'Laboratory Assistant/Instructor\'s Honorarium',
            value: 'lab_assistant.amount'
        },
        {
            label: 'Electrician\'s Name',
            value: 'electrician.name'
        },
        {
            label: 'Electrician\'s Honorarium',
            value: 'electrician.amount'
        },
        {
            label: 'Peon\'s Name',
            value: 'peon.name'
        },
        {
            label: 'Peon\'s Honorarium',
            value: 'peon.amount'
        },
        {
            label: 'Total',
            value: 'totalAmount'
        }
    ]
});

app.use(express.json());

const client = new MongoClient('mongodb://localhost:5000/someform');
const db = client.db().collection('records');

app.post('/api/record/add', async (req, res) => {
    await db.insertOne(req.body);

    res.status(200).send({
        message: 'Success'
    });
});

app.get('/api/records', async (req, res) => {

    const data = await db.find().toArray();
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('records.csv');
    res.send(csv);
});

app.get('/api/faculties', async (req, res) => {
    const data = JSON.parse(await fs.readFile(path.join(__dirname, '../faculty_details.json')));

    res.status(200).send({
        faculties: data[req.query.dept]
    });
});

app.listen(PORT, () => {
    console.log('Server is up on Port: ', PORT);
});