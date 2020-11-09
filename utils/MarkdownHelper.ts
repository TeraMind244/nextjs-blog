export const prependMetadata = (title: string, date: number, markdown: string) => {
	return [
		"---",
		`title: "${title}"`,
		`date: "${date}"`,
		"---",
		""
	].join("\n") + markdown;
}
