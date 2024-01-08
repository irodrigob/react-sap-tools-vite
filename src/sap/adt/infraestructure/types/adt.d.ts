export type responseSearchObject =
	| Result<ADTSearchObjects>
	| Result<ErrorGeneral>
	| Result<ErrorGraphql>;
