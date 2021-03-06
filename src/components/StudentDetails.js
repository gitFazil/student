import React, { memo, useContext, useState } from 'react'
import { StudentContext } from '../App';

function StudentDetails({ student, index }) {
	const { state, setState } = useContext(StudentContext)

	const [addTag, setAddTag] = useState('');
	const [showGrades, setShowGrade] = useState(false)

	const AddTag = (id) => {
		let newList = state.studentList.map(list => {
			if (list.id === id) {
				return {
					...list,
					tags: [...list.tags, addTag]
				}
			}
			return list;
		})
		setState({ studentList: newList })
		setAddTag('')
	}
	return (
		<ul className='' key={index}>
			<li className='title'><h2>{`${student.firstName} ${student.lastName}`}</h2><button onClick={() => setShowGrade(!showGrades)}>{showGrades ? '-' : '+'}</button></li>
			<li><img src={student.pic} /></li>
			<li>{`Email: ${student.email}`}</li>
			<li>{`Skill: ${student.skill}`}</li>
			<li>{`Company: ${student.company}`}</li>
			<li>Avg: {(student.grades.reduce((a, i) => a + parseInt(i), 0) / student.grades.length + true).toFixed(2) + '%'}</li>
			<li>{student.tags.map((item, i) => { return <button key={i}>{item}</button> })}</li>
			<li>
				<input type='text' value={addTag} onChange={(e) => setAddTag(e.target.value)} />
				<button onClick={() => AddTag(student.id)}>+</button>
			</li>

			{showGrades && <li>Grades: {student.grades.map((item, i) => { return <p key={i}>{item}</p> })}</li>}
		</ul>
	)
}

export default memo(StudentDetails)