/** A tree item's type */
export type TreeType =
	| 'text'
	| 'rich'
	| 'number'
	| 'bool'
	| 'select'
	| 'multi'
	| 'ref'
	| 'object'
	| 'hash'
	| 'converter'
	| 'action'
	| 'type'
	| string

/** A tree item */
export type TreeItem = TreeBaseItem | TreeTypeItem | TreeRuleItem

/** A basic tree item */
export type TreeBaseItem = {
	name?: string
	type: TreeType
	subtype?: TreeItem | Record<string, TreeItem>
	children?: string[]
	subtree?: Record<string, TreeItem>
	data?: Record<string, any>
}

export type TreeRuleItem = TreeBaseItem & {
	type: 'rule'
	data: {
		left: string
		op: 'any:isRequired' | 'text:isEmail' | 'num:gte' | string
		right: string
	}
}

/** A tree type item */
export type TreeTypeItem = TreeBaseItem & {
	type: 'type'
	data: {
		name: string
		nameFn: (string: TreeItem) => string

		icon: string | JSX.Element
		iconFn: (item: TreeItem) => string | JSX.Element

		label: string
		labelFn: (item: TreeItem) => string

		// Function-only
		childrenFn: (item: TreeItem) => string[]
		treeFn: (item: TreeItem) => Record<string, TreeItem>
		descriptionFn: (item: TreeItem) => string

		dataFormat: TreeItem
		rules: Record<string, TreeRuleItem>
	}
}
