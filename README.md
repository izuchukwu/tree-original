# Tree

When we write code, we manipulate models.
[Programming should be closer to manipulating models.](https://yoyo-code.com/programming-breakthroughs-we-need/)

Tree lets you write software by designing models.
Tree then makes UIs that manipulate those models.

## Getting interesting

By representing data as trees, we can do many things with all forms of data by building them once:
- Automatic UIs for viewing, editing, reordering, and deleting data
- Automatic forms for creating data
- Automatic CRDT support for your data
- Automatic representation of data across database engines
- Automatic APIs and GraphQL endpoints your data
- Adapters to reference data in API sources like Airtable or Google Sheets as if they were trees
- Automatic data model undo & redo
- Instant UIs for complex sorting and filtering with rules

## Getting weirder

If you represent low-level software things like heaps, databases, functions, UIs, and entire apps as trees, you go into weirder territory:
- Trees become executable
- Automatic UIs for reordering actions in a function, adding databases to apps, and editing UI component properties
- Automatic, shareable, rewindable tree snapshots of runtime app state across data, functions and UI for live debugging, remote debugging, and bug reports

This turns the entire software ecosystem—every app and every user, every database and every row, every function and every API format—into one giant, interconnected, instantly visualizable tree.

# Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install it and run the dev server:

```bash
git clone https://github.com/izuchukwu/tree
cd tree
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.