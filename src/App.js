import toLower from "lodash/toLower";
import { useState } from "react";
import ProfileTagging from "./components/ProfileTagging/ProfileTagging";

const rawProfiles = [
	{
		id: 1,
		name: "Faruk Gerçek",
		username: "favger"
	},
	{
		id: 2,
		name: "Mustafa",
		username: "erzirh"
	},
	{
		id: 3,
		name: "Furkan",
		username: "furko"
	},
	{
		id: 4,
		name: "Ercan",
		username: "ercihan"
	},
	{
		id: 5,
		name: "Test",
		username: "test"
	}
];

const backendProfiles = [
	{
		id: 6,
		name: "Arda",
		username: "arda"
	},
	{
		id: 7,
		name: "Adem",
		username: "adem2"
	},
	{
		id: 8,
		name: "John",
		username: "jhon"
	},
	{
		id: 9,
		name: "Faruk Backup Account",
		username: "farukbackup"
	}
];

const initialTags = [
	{
		id: 1,
		name: "Faruk Gerçek",
		username: "favger",
		pos: {
			x: 207.5,
			y: 325
		}
	}
];

let timerRef = null;

function App() {
	const [tags, setTags] = useState(initialTags);

	const handleSelectTag = (tag, pos) => {
		console.log("handleSelectTag:", tag, pos);
	};

	const handleChange = (tags) => {
		console.log("handleChange:", tags);
		setTags(tags);
	};

	const handleSearch = (search) => {
		return new Promise((resolve) => {
			const findedBackendProfiles = backendProfiles.filter(
				(item) =>
					toLower(item.name).indexOf(toLower(search)) !== -1 ||
					toLower(item.username).indexOf(toLower(search)) !== -1
			);

			// manuel backend delay effect
			clearTimeout(timerRef);
			timerRef = setTimeout(() => resolve(findedBackendProfiles), 2000);
		});
	};

	console.log("tags.", tags);

	return (
		<div className="App">
			{/*begin::ProfileTagging*/}
			<ProfileTagging
				keyField="id"
				localData={rawProfiles}
				tags={initialTags}
				max={3}
				showToggleButton={true}
				guideTooltipText="Click photo to tag people"
				loading="Loading..."
				onSearch={handleSearch}
				onSelect={handleSelectTag}
				onChange={handleChange}>
				<img alt="600" src="./favger-avatar.png" />
			</ProfileTagging>
			{/*end::ProfileTagging*/}
		</div>
	);
}

export default App;
