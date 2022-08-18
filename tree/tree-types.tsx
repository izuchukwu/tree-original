/** A tree item's type */
export type TreeType =
	| 'text'
	| 'rich'
	| 'number'
	| 'bool'
	| 'list'
	| 'select'
	| 'multi'
	| 'ref'
	| 'object'
	| 'hash'
	| string

/** An object-type tree item's object format */
export type TreeObjectFormatField = {
	name: string
	description: string
	type: TreeType
}

/** A tree item */
export type TreeItem = TreeBaseItem | TreeTypeItem | TreeRuleItem

/** A basic tree item */
export type TreeBaseItem = {
	n: string
	name: string

	d: string
	description: string

	l: string
	label: string

	t: TreeType
	type: TreeType

	lt: TreeItem
	listType: TreeItem

	of: Record<string, TreeObjectFormatField>
	objectFormat: Record<string, TreeObjectFormatField>

	c: string[]
	childIDs: string[]

	ct: Record<string, TreeItem>
	childTree: Record<string, TreeItem>

	da: Record<string, any>
	data: Record<string, any>

	r: string
	ref: string

	ui: 'tree' | 'table' | 'form' | string
}

export type TreeRuleItem = TreeBaseItem & {
	d: TreeRuleItemDataFormat
	data: TreeRuleItemDataFormat
} & ({t: 'rule'} | {type: 'rule'})

/** A tree rule item's data format */
export type TreeRuleItemDataFormat = {
	left: string
	op: 'any:isRequired' | 'text:isEmail' | 'num:gte' | string
	right: string
}

/** A tree type item */
export type TreeTypeItem = TreeBaseItem & {
	d: TreeTypeItemDataFormat
	data: TreeTypeItemDataFormat
} & ({t: 'type'} | {type: 'type'})

/** A tree type item's data format */
export type TreeTypeItemDataFormat = {
	// Name
	n: string
	name: string

	nfn: (string: TreeItem) => string
	nameFn: (string: TreeItem) => string

	// Icon
	i: string | JSX.Element
	icon: string | JSX.Element

	ifn: (item: TreeItem) => string | JSX.Element
	iconFn: (item: TreeItem) => string | JSX.Element

	// Label
	l: string
	label: string

	lfn: (item: TreeItem) => string
	labelFn: (item: TreeItem) => string

	// Children
	cfn: (item: TreeItem) => string[]
	childIDsfn: (item: TreeItem) => string[]

	ctfn: (item: TreeItem) => Record<string, TreeItem>
	childTreesfn: (item: TreeItem) => Record<string, TreeItem>

	// Description
	dfn: (item: TreeItem) => string
	descriptionFn: (item: TreeItem) => string

	// Data Format
	d: TreeItem
	dataFormat: TreeItem

	// Rules
	r: Record<string, TreeRuleItem>
	rules: Record<string, TreeRuleItem>
}
