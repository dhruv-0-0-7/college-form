import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { debounce } from '@mui/material/utils';
import { BRANCH_NAME, COURSE, TYPE_OF_EXAM } from "./utils";

function App() {
  const [date, setDate] = useState(dayjs(new Date()));
  const [faculties, setFaculties] = useState();
  const [amount, setAmount] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [courseState, setCourseState] = useState(0);
  const [typeOfExamState, setTypeOfExamState] = useState(0);
  const [branchNameState, setBranchNameState] = useState(0);
  const [examinerNameState, setExaminerNameState] = useState('');
  const [semesterState, setSemesterState] = useState(1);

  useEffect(() => { fetchFaculties({ target: { value: 0 } }); }, []);

  async function fetchFaculties(e) {
    setBranchNameState(e.target.value);
    const res = await fetch(`/api/faculties?dept=${e.target.value}`);
    const data = await res.json();

    setFaculties(data.faculties);
  }

  async function updateTotalAmount(e) {
    setAmount(amount => {
      amount[e.target.name] = e.target.value ? parseFloat(e.target.value) : 0;
      return amount;
    });

    setTotalAmount(Object.values(amount).reduce((acc, val) => (acc + val), 0));
  }

  async function formSubmitHandler(e) {
    e.preventDefault();

    const body = {
      course: COURSE[e.target.elements.course.value],
      typeOfExam: TYPE_OF_EXAM[e.target.elements.typeofexam.value],
      dateOfExam: date.format('MM/DD/YYYY'),
      branch: BRANCH_NAME[e.target.elements.branch.value],
      semester: e.target.semester.value,
      subjectCode: e.target.subcode.value,
      subjectName: e.target.subname.value,
      external_examiner: {
        name: e.target.elements.eename.value,
        instituteName: e.target.elements.eeinstitutename.value,
        mobile: e.target.elements.eenumber.value,
        email: e.target.elements.eeemail.value,
        bank: e.target.elements.eebankname.value,
        accountNumber: e.target.elements.eebankaccountno.value,
        ifsc: e.target.elements.eebankifsc.value,
        amount: parseFloat(e.target.elements.eehonorarium.value),
        da: e.target.elements.eeda.value,
        ta: e.target.elements.eeta.value,
        accomodation: e.target.elements.eeaccomodation.value,
      },
      internal_examiner: {
        name: faculties[parseInt(e.target.elements.finame.value) - 1],
        amount: parseFloat(e.target.elements.fihonorarium.value),
      },
      lab_assistant: {
        name: e.target.elements.laoiname.value || 'NA',
        amount: parseFloat(e.target.elements.laoihonorarium.value ?? 0)
      },
      electrician: {
        name: e.target.elements.ename.value || 'NA',
        amount: parseFloat(e.target.elements.ehonorarium.value ?? 0)
      },
      peon: {
        name: e.target.elements.pname.value || 'NA',
        amount: parseFloat(e.target.elements.phonorarium.value ?? 0)
      },
      totalAmount
    };

    const res = await fetch('/api/record/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const { message } = await res.json();
    alert('Record saved Successfully.');
    e.target.reset();
    e.target.elements.finame.value = '';
    await fetchFaculties({ target: { value: 0 } });

    setCourseState(0);
    setTypeOfExamState(0);
    setDate(dayjs(new Date()));
    setSemesterState(1);
    setExaminerNameState('');
  }

  return (
    <Stack
      useFlexGap={true}
      sx={{ paddingTop: 5 }}
      rowGap={5}
    >
      <Typography
        variant="h4"
        fontWeight='bold'
        textAlign='center'>
        Some kind of Form
      </Typography>
      <form onSubmit={formSubmitHandler}>
        <Stack
          useFlexGap={true}
          sx={{ margin: 'auto', width: '50%' }}
          rowGap={5}
          justifyContent='center'
          alignItems='center'>
          <FormControl fullWidth>
            <InputLabel id='course-select-label'>Course</InputLabel>
            <Select
              value={courseState}
              onChange={(e) => setCourseState(e.target.value)}
              labelId="course-select-label"
              id="course"
              name="course"
              label='Course'>
              <MenuItem value={0}>BE</MenuItem>
              <MenuItem value={1}>ME</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id='type-of-exam-select-label'>Type of Exam</InputLabel>
            <Select
              required
              value={typeOfExamState}
              onChange={(e) => setTypeOfExamState(e.target.value)}
              labelId="type-of-exam-select-label"
              id="type-of-exam"
              name="typeofexam"
              label='Type of Exam'>
              <MenuItem value={0}>Regular</MenuItem>
              <MenuItem value={1}>Remedial</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <DatePicker
              value={date}
              onChange={setDate}
              label='Date of Exam'
              views={["year", "month", "day"]}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id='branch-name-select-label'>Branch Name</InputLabel>
            <Select
              onChange={fetchFaculties}
              value={branchNameState}
              required
              name="branch"
              labelId="branch-name-select-label"
              id="branch-name"
              label='Branch Name'>
              <MenuItem disabled value={''}>Choose</MenuItem>
              <MenuItem value={0}>05 - Chemical Engineering</MenuItem>
              <MenuItem value={1}>06 - Civil Engineering</MenuItem>
              <MenuItem value={2}>07 - Computer Engineering</MenuItem>
              <MenuItem value={3}>09 - Electrical Engineering</MenuItem>
              <MenuItem value={4}>11 - Electronics and Communication</MenuItem>
              <MenuItem value={5}>16 - Information Technology</MenuItem>
              <MenuItem value={6}>17 - Instrumentation and Control</MenuItem>
              <MenuItem value={7}>19 - Mechanical Engineering</MenuItem>
              <MenuItem value={8}>24 - Power Electronics</MenuItem>
              <MenuItem value={9}>Applied Mechanics</MenuItem>
              <MenuItem value={10}>Science and Humanities</MenuItem>
              <MenuItem value={11}>{'Computer Science and Engineering (Data Science)'}</MenuItem>
              <MenuItem value={12}>Electronics and Instrumentation Engineering</MenuItem>

            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id='semester-select-label'>Semester</InputLabel>
            <Select
              required
              name="semester"
              value={semesterState}
              onChange={(e) => setSemesterState(e.target.value)}
              labelId="semester-select-label"
              id="semester"
              label='Semester'>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="subcode"
              label='Subject Code'
              required />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name='subname'
              label='Full Name of Subject'
              required />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name='eeinstitutename'
              label="External Examiner's Institute Name"
              required
              type="text"
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="eenumber"
              label="External Examiner's Mobile Number"
              required
              type='tel'
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name='eeemail'
              label="External Examiner's Email ID"
              required
              type='email' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name='eename'
              label="Name of External Examiner (As per Bank Passbook)"
              required
              type='text' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="eebankname"
              required
              label="External Examiner's Bank Name"
              type='text' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="eebankaccountno"
              label="External Examiner's Bank Account Number"
              required
              type='text' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="eebankifsc"
              label="External Examiner's Bank IFSC"
              required
              type='text' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="eehonorarium"
              onChange={debounce(updateTotalAmount, 500)}
              label="External Examiner's Honorarium"
              required
              type='number' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="eeda"
              label="External Examiner's DA"
              required
              type='text' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="eeta"
              label="External Examiner's TA"
              required
              type='text' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="eeaccomodation"
              label="External Examine Accomodation"
              required
              type='text' />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel required id='first-internal-faculty-label'>{'Name of 1st Internal Examiner (As per Bank Passbook)'}</InputLabel>
            <Select
              required
              name='finame'
              value={examinerNameState}
              onChange={(e) => setExaminerNameState(e.target.value)}
              labelId="first-internal-faculty-label"
              id="first-internal-faculty-label"
              label='Name of 1st Internal Examiner (As per Bank Passbook)'>
              <MenuItem value={''} disabled>Choose</MenuItem>
              {
                faculties?.map((faculty, index) => <MenuItem key={index + 1} value={index + 1}>{faculty}</MenuItem>)
              }
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="fihonorarium"
              required
              onChange={debounce(updateTotalAmount, 500)}
              label="Honorarium of 1st Internal Examiner"
              type='number' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="laoiname"
              label="Name of Laboratory Assistant/Instructor (As per Bank Passbook)"
              type='text' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="laoihonorarium"
              onChange={debounce(updateTotalAmount, 500)}
              label="Laboratory Assistant/Instructor's Honorarium"
              type='number' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="ename"
              label="Name of Electrician (As per Bank Passbook)"
              type='text' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name="ehonorarium"
              onChange={debounce(updateTotalAmount, 500)}
              label="Electrician's Honorarium"
              type='number' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name='pname'
              label="Name of Peon (As per Bank Passbook)"
              type='text' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              name='phonorarium'
              onChange={debounce(updateTotalAmount, 500)}
              label="Peon's Honorarium"
              type='number' />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              disabled
              label="Total Amount"
              value={totalAmount}
              required
              type='number' />
          </FormControl>

          <FormControl>
            <Button type="submit" variant="contained" sx={{ backgroundColor: 'black' }}>Submit</Button>
          </FormControl>
        </Stack >
      </form>
    </Stack>
  );
}

export default App;
