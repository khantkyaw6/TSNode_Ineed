export interface ITag {
	title: String;
	color: String;
}

export interface INeedCreate {
	header: String;
	body: String;
	tags: [ITag];
	user: String;
}
