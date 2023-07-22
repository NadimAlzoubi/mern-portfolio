import React from 'react'
import './Error.css'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>404</h1>
				<h2>Page not found</h2>
			</div>
			<Link to='/home'>Back to home page</Link>
		</div>
	</div>
  )
}

export default Error