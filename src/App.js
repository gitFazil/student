import './App.css';
import { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import StudentDetails from './components/StudentDetails';
const initialState = {
  studentList: [],
  showGrades: false,
}
const reducer = (state, action) => {
  return { ...state, ...action };
}
export const StudentContext = createContext();
function App() {
  const [state, setState] = useReducer(reducer, initialState);

  const [search, setSearch] = useState('')
  const [tag, setTag] = useState('');


  useEffect(() => {
    async function api() {
      let list = await fetch('https://api.hatchways.io/assessment/students').then(res => res.json().then(data => data.students))
      let newList = list.map(student => {
        return { ...student, tags: ['collage'] }
      })
      setState({ studentList: newList })
    }
    api();
  }, [])

  let filteredStudent = useMemo(() => {
    return state.studentList.filter(data => {
      if (tag === '' && search === '') {
        return data
      }

      else if (data.firstName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        && data.tags.find(e => e.toLocaleLowerCase().includes(tag.toLocaleLowerCase()))) {
        return data;
      }
    })
  }, [state.studentList, tag, search])



  return (
    <StudentContext.Provider value={{ state, setState }}>
      <div className="App card">
        <div className='search-area'>
          <input type='text' value={search} placeholder='search name..........' onChange={(e) => setSearch(e.target.value)} />
          <input type='text' value={tag} placeholder=' search tag..........' onChange={(e) => setTag(e.target.value)} />
        </div>

        {filteredStudent.map((student, i) => <StudentDetails student={student} key={i} />)}

      </div>
    </StudentContext.Provider>
  );
}

export default App;
