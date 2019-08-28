import {hot} from 'react-hot-loader/root';
import React, {useState} from 'react';

function Root() {
	const [a, setA] = useState('a');

	return (
		<div>
			<p>
				hello world
				{a}
			</p>
			<p>
				<button
					type="button"
					onClick={() => {
						setA('b');
					}}
				>
					push
				</button>
			</p>
		</div>
	);
}

export default hot(Root);
