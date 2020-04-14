import React from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components'

const Quote = styled(Card)`
	color: black;

`

const Screen = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

function Dashboard(props) {
	const quotes = [
		{
			quote: 'Whatever the mind can conceive and believe, the mind can achieve.',
			author: 'Napoleon Hill'
		},
	]

	return (
		<Screen>
			<Quote>
				<Card.Body>
					<blockquote className="blockquote mb-0">
						<p>{quotes[0].quote}</p>
						<footer className="blockquote-footer">{quotes[0].author}
						</footer>
					</blockquote>
				</Card.Body>
			</Quote>
		</Screen>
	);
}

export default Dashboard;