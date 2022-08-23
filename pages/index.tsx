import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Tree as AntTree} from 'antd'
import type {DataNode} from 'antd/es/tree'
import {TreeItem} from '../tree/tree-types'
import {useEffect, useState} from 'react'
import _ from 'lodash'
import {Tree as ArboristTree} from 'react-arborist'

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Tree</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Tree
					root={{
						name: 'Pages',
						type: '[page]',
						children: ['lp', 'signin', 'home'],
						subtree: {
							lp: {
								name: 'Landing Page',
								type: 'page',
								children: ['nav', 'hero', 'body', 'footer'],
								subtree: {
									nav: {name: 'Nav', type: 'page'},
									hero: {name: 'Hero', type: 'page'},
									body: {name: 'Body', type: 'page'},
									footer: {name: 'Footer', type: 'page'}
								}
							},
							signin: {name: 'Sign In', type: 'page'},
							home: {name: 'Home', type: 'page'}
						}
					}}
					path={''}
				/>
			</main>
		</div>
	)
}

/* -- Tree -- */

interface TreeProps {
	root: TreeItem
	path: string
}

const Tree = ({root, path}: TreeProps) => {
	const [antTreeData, setAntTreeData] = useState<DataNode[]>()
	const [arboristData, setArboristData] = useState({id: 'NA'})

	/** Ant Tree Data for Tree Item Effect */
	useEffect(() => {
		setAntTreeData(antTreeDataForTree(root, path))
	}, [root, path])

	/** Arborist Data for Tree Item Effect */
	useEffect(() => {
		setArboristData(arboristDataForTree(root, path) as any)
	}, [root, path])

	return (
		<>
			<AntTree treeData={antTreeData} />
			<ArboristTree data={arboristData}>{Node}</ArboristTree>
		</>
	)
}

const Node = ({ref, styles, data}: any) => {
	return (
		<div ref={ref} style={styles.row}>
			<div style={styles.indent}>{data.name}</div>
		</div>
	)
}

/** TreeItem -> Data for Arborist */
const arboristDataForTree = (root: TreeItem, path: string) => {
	return arboristNodeForTreeItem(root, path, root).children
}

const arboristNodeForTreeItem = (
	root: TreeItem,
	path: string,
	context: TreeItem,
	contextParent?: TreeItem
): any => {
	// 1. Get tree item at path
	const item = resolvePath(root, path, context, contextParent)

	// 2. Convert it to Node data
	const node = {name: item?.name, id: path, children: [] as any[]}

	// 3. Convert its children to DataNode[]
	item?.children?.forEach((childPath) => {
		const childNode = arboristNodeForTreeItem(
			root,
			childPath,
			item,
			context
		)
		node.children?.push(childNode)
	})

	return node
}

/** TreeItem -> DataNode[] for Ant Tree */
const antTreeDataForTree = (root: TreeItem, path: string) => {
	return antDataNodeForTreeItem(root, path, root).children
}

const antDataNodeForTreeItem = (
	root: TreeItem,
	path: string,
	context: TreeItem,
	contextParent?: TreeItem
): DataNode => {
	// 1. Get tree item at path
	const item = resolvePath(root, path, context, contextParent)

	// 2. Convert it to a DataNode
	const dataNode: DataNode = {title: item?.name, key: path, children: []}

	// 3. Convert its children to DataNode[]
	item?.children?.forEach((childPath) => {
		const childNode = antDataNodeForTreeItem(root, childPath, item, context)
		dataNode.children?.push(childNode)
	})

	return dataNode
}

const resolvePath = (
	root: TreeItem,
	path: string,
	context?: TreeItem,
	contextParent?: TreeItem
): TreeItem | null => {
	// Self
	if (path === '') return context ?? null

	// Path
	const pathArray = path.split('/')
	if (pathArray[0] === '.') {
		// Sibling
		return contextParent
			? resolvePath(root, pathArray.slice(1).join('/'), contextParent)
			: null
	} else if (pathArray[0] === '') {
		// Root
		return resolvePath(root, pathArray.slice(1).join('/'), root)
	} else {
		// Subtree
		if (!context) return null
		const child = context.subtree?.[pathArray[0]]
		return child
			? resolvePath(root, pathArray.slice(1).join('/'), child, context)
			: null
	}
}

//

/** Converts a `TreeItem` into `DataNode[]` for Ant Tree */
// const antTreeDataForTreeItem = (tree: TreeItem, rootID: string): DataNode[] => {
// 	const root = tree.subtree[rootID]
// 	return tree.subtree.map((childID) => antTreeDataForTreeItemFromItem())
// }

// /** Converts a `TreeItem` into `DataNode[]` for Ant Tree, starting from a given starting point */
// const antTreeDataForTreeItemFromItem = (
// 	tree: TreeItem,
// 	startingPoint: TreeItem,
// 	parent: TreeItem | null,
// 	itemID: string
// ): DataNode[] => {
// 	return (root.c ?? root.childIDs).forEach((itemID) => {
// 		const item = resolveChild(root, null)
// 	})
// }

/** Resolves a Tree Item's child */
// const resolveChild = (
// 	root: TreeItem,
// 	parent: TreeItem | null,
// 	itemID: string,
// 	childIDPath: string
// ): TreeItem | null => {
// 	// TODO support protocols, this, list items, and chains
// 	const path = childIDPath.split('/')
// 	if (path[0] === '.') {
// 		// Search siblings
// 		const siblingID = path[1]

// 		// Does the path continue?
// 		if (path.length > 2) {
// 			// The path continues
// 			// Search the sibling's children
// 			const childIDPathFromSibling = path.slice(2).join('/')
// 			return resolveChild(root, parent, siblingID, childIDPathFromSibling)
// 		} else {
// 			// The path does not continue
// 			// Return the sibling
// 			return parent?.subtree[siblingID] ?? null
// 		}
// 	} else if (path[0] === '') {
// 		// Search from root
// 		const rootItemID = path[1]

// 		// Does the path continue?
// 		if (path.length > 2) {
// 			// The path continues
// 			// Search the root item's children
// 			const childIDPathFromRootItem = path.slice(2).join('/')
// 			return resolveChild(root, root, rootItemID, childIDPathFromRootItem)
// 		} else {
// 			// The path does not continue
// 			// Return the root item
// 			return root.subtree[rootItemID] ?? null
// 		}
// 	} else if (path[0] === '@') {
// 		// TODO: Search from external trees
// 		return null
// 	} else {
// 		// Search children
// 		const thisItem = parent?.subtree[itemID] ?? null
// 		if (_.isNil(thisItem)) return null
// 		const childID = path[0]
// 		const childItem = root.subtree[childID] ?? null

// 		// Does the path continue?
// 		if (path.length > 2) {
// 			// The path continues
// 			// Search the child's children
// 			const childIDPathFromChild = path.slice(1).join('/')
// 			return resolveChild(root, thisItem, childID, childIDPathFromChild)
// 		} else {
// 			// The path does not continue
// 			// Return the child
// 			return childItem
// 		}
// 	}
// }

export default Home
