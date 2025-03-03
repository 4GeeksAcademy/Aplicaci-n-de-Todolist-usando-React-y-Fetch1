import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [input, setInput] = useState("");
	const [tareas, setTareas] = useState([]);

	async function createUser() {
		const response = fetch("https://playground.4geeks.com/todo/users/alex", { method: "POST" });
	}

	async function getTareas() {
		const response = await fetch("https://playground.4geeks.com/todo/users/alex");
		const data = await response.json();
		setTareas(data.todos);
		console.log(data.todos);
	}

	async function addTarea(e) {
		e.preventDefault();

		const response = await fetch("https://playground.4geeks.com/todo/todos/alex", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label: input,
				is_done: false
			})
		});
		setInput("");
		getTareas();
	}

	async function deleteTarea(id) {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		});
		if (response.ok) {
			setTareas(tareas.filter(tarea => tarea.id !== id));
		}
	}

	useEffect(() => {
		createUser().then(() => {
			getTareas()
		});
	}, []);

	return (
		<>
			<form onSubmit={(e) => addTarea(e)}>
				<input type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Introduce tu tarea" />
				<button type="submit">Agregar Tarea</button>
			</form>
			<div className="task-list">
				{tareas.map((tarea, index) => (
					<div key={tarea.id} className="task-item">
						<p>{tarea.label}</p>
						<button
							className="delete-button"
							onClick={() => deleteTarea(tarea.id)}
						>
							Eliminar
						</button>
					</div>
				))}
			</div>
		</>
	);
};

export default Home;