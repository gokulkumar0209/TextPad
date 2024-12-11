import React, { useState } from "react";

function Home() {
	const [text, setText] = useState("");
	const [findText, setFindText] = useState("");
	const [replaceText, setReplaceText] = useState("");
	const [findCount, setFindCount] = useState(0);
	const [isExact, setIsExact] = useState(false);

	const handleFind = (exact) => {
		setIsExact(exact);
		const regex = exact
			? new RegExp(`\\b${findText}\\b`, "gi")
			: new RegExp(findText, "gi");
		const matches = text.match(regex);
		setFindCount(matches ? matches.length : 0);
	};

	const handleReplace = () => {
		const regex = isExact
			? new RegExp(`\\b${findText}\\b`, "gi")
			: new RegExp(findText, "gi");
		const updatedText = text.replace(regex, replaceText);
		setText(updatedText);
	};

	const highlightedText = () => {
		if (!findText) return text;
		const regex = isExact
			? new RegExp(`\\b(${findText})\\b`, "gi")
			: new RegExp(`(${findText})`, "gi");
		return text.split(regex).map((part, index) =>
			part.toLowerCase() === findText.toLowerCase() &&
			(isExact ? part.match(new RegExp(`^${findText}$`, "i")) : true) ? (
				<span key={index} className="bg-yellow-300 font-bold">
					{part}
				</span>
			) : (
				part
			)
		);
	};

	return (
		<div className="flex flex-col h-screen bg-gray-100 w-screen">
			<header className="bg-blue-600 text-white p-4 text-center font-bold text-lg">
				Find and Replace Tool
			</header>
			<div className="flex-grow flex">
				<div className="w-1/2 p-4 bg-white shadow-md">
					<h2 className="text-xl font-bold mb-4">Input Text</h2>
					<textarea
						className="w-full h-64 border p-2 overflow-y-auto resize-none mb-4 rounded"
						onChange={(e) => setText(e.target.value)}
						value={text}
						placeholder="Type or paste your text here..."
					></textarea>
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<input
								type="text"
								placeholder="Find..."
								className="border p-2 rounded flex-grow"
								value={findText}
								onChange={(e) => setFindText(e.target.value)}
							/>
							<button
								className="p-2 bg-blue-500 text-white rounded"
								onClick={() => handleFind(false)}
							>
								Find All
							</button>
							<button
								className="p-2 bg-green-500 text-white rounded"
								onClick={() => handleFind(true)}
							>
								Find Exact
							</button>
						</div>
						<span className="text-green-600 font-medium">
							{findCount} occurrences found
						</span>
						<div className="flex items-center gap-2">
							<input
								type="text"
								placeholder="Replace with..."
								className="border p-2 rounded flex-grow"
								value={replaceText}
								onChange={(e) => setReplaceText(e.target.value)}
							/>
							<button
								className="p-2 bg-blue-500 text-white rounded"
								onClick={handleReplace}
							>
								Replace
							</button>
						</div>
					</div>
				</div>
				<div className="w-1/2 p-4 bg-gray-50 shadow-md">
					<h2 className="text-xl font-bold mb-4">Highlighted Output</h2>
					<div className="border p-4 bg-white rounded h-64 overflow-y-auto">
						<p className="break-words whitespace-pre-wrap">
							{highlightedText()}
						</p>
					</div>
				</div>
			</div>
			<footer className="bg-gray-800 text-white text-center p-2">
				© 2024 Find and Replace Tool
			</footer>
		</div>
	);
}

export default Home;
