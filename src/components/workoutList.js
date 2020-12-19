import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardDeck } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Dashboard from "./Dashboard";
import styled from 'styled-components';

const WorkoutContainer = styled(Container)`
	height: 100vh;
	padding-top: 25px;
`
const WorkoutList = props => (
	<Card>
		<Card.Body>
			<Card.Title>{props.workout.workout_title}</Card.Title>
			<Card.Subtitle className="mb-4 text-muted">{props.workout.workout_tags}</Card.Subtitle>
			<Card.Text>Description: {props.workout.workout_description}</Card.Text>
			<Card.Text>For: {props.workout.workout_responsible}</Card.Text>
			<Card.Text>Difficulty Level: {props.workout.workout_difficulty}</Card.Text>
			<Card.Text>Times Completed: {props.workout.workout_times_completed}</Card.Text>
			<Card.Link>
				<Link to={'edit/'+ props.workout._id}>Edit</Link>
			</Card.Link>
		</Card.Body>
		<Card.Footer>
				<small className="text-muted">Last completed on: {props.workout.workout_completed_date}</small>
		</Card.Footer>
	</Card>
)