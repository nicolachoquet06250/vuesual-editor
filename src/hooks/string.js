export const match = (regex, str) => {
	if (typeof regex !== "boolean") {
		let m;
		let cmp = 0;

		while ((m = regex.exec(str)) !== null) {
			// This is necessary to avoid infinite loops with zero-width matches
			if (m.index === regex.lastIndex) regex.lastIndex++;

			// The result can be accessed through the `m`-variable.
			m.forEach(() => {
				cmp++;
			});
		}

		return cmp !== 0;
	}
	return false;
}
