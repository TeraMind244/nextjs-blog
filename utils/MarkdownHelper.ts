export const prependMetadata = (title: string, dateString: string, markdown: string) => {
	return [
		"---",
		`title: "${title}"`,
		`date: "${dateString}"`,
		"---",
		""
	].join("\n") + markdown;
}
