import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

function App() {
  return (
    <form >
      <Stack
        useFlexGap={true}
        sx={{ margin: 'auto', width: '50%' }}
        rowGap={5}
        justifyContent='center'
        alignItems='center'>
        <FormControl fullWidth>
          <InputLabel id='course-select-label'>Course</InputLabel>
          <Select
            labelId="course-select-label"
            id="course"
            label='Course'>
            <MenuItem value={0}>BE</MenuItem>
            <MenuItem value={1}>ME</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id='type-of-exam-select-label'>Type of Exam</InputLabel>
          <Select
            required
            labelId="type-of-exam-select-label"
            id="type-of-exam"
            label='Type of Exam'>
            <MenuItem value={0}>Regular</MenuItem>
            <MenuItem value={1}>Remedial</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <DatePicker
            label='Date of Exam'
            views={["year", "month", "day"]}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id='branch-name-select-label'>Branch Name</InputLabel>
          <Select
            required
            labelId="branch-name-select-label"
            id="branch-name"
            label='Branch Name'>
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
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id='semester-select-label'>Semester</InputLabel>
          <Select
            required
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
          <TextField label='Subject Code' required />
        </FormControl>

        <FormControl fullWidth>
          <TextField label='Full Name of Subject' required />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="External Examiner's Institute Name"
            required
            type="text"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="External Examiner's Mobile Number"
            required
            type='tel'
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="External Examiner's Email ID"
            required
            type='email' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Name of External Examiner (As per Bank Passbook)"
            required
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="External Examiner's Bank Name"
            required
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="External Examiner's Bank Account Number"
            required
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="External Examiner's Bank IFSC"
            required
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="External Examiner's Honorarium"
            required
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="External Examiner's DA"
            required
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="External Examiner's TA"
            required
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="External Examine Accomodation"
            required
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Name of 1st Internal Examiner (As per Bank Passbook)"
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Honorarium of 1st Internal Examiner"
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Name of 2nd Internal Examiner (In case of Project only - As per Bank Passbook)"
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Honorarium of 1st Internal Examiner"
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Honorarium of 1st Internal Examiner"
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Name of Laboratory Assistant/Instructor (As per Bank Passbook"
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Laboratory Assistant/Instructor's Honorarium"
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Name of Electrician (As per Bank Passbook)"
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Electrician's Honorarium"
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Name of Peon (As per Bank Passbook)"
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Peon's Honorarium"
            type='text' />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Total Amount"
            required
            type='number' />
        </FormControl>
      </Stack >
    </form>
  );
}

export default App;
