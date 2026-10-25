# What the C program must do

The C program is the heart of Preqviz. It reads `data/edges.txt`, builds **one directed graph** (an adjacency list), runs **Depth-First Search**, and writes `data/results.js`. The web page only draws what this file contains.

Your C program is correct when its `results.js` is **byte-for-byte identical** to `data/results.reference.js` (generated from the same `edges.txt`). Check with:

```
diff data/results.js data/results.reference.js
```

No output from `diff` means you match.

---

## 1. Reading `edges.txt`

- Skip blank lines and lines starting with `#`.
- `ELECTIVE <id>` — declares an elective. Remember electives in the order they appear.
- `EDGE <from> <to> <essential|helpful>` — `<from>` needs `<to>`.
- A node is created the first time its id appears on any line. Keep nodes in **first-appearance order** (this matters for cycle detection).
- **Add each edge at the END of `<from>`'s list**, so a node's neighbours stay in file order. (Inserting at the head of a linked list reverses the order and breaks the match.)
- Ids are at most 63 characters, contain no spaces, and there are fewer than 500 nodes.

## 2. Cycle detection (three-colour Depth-First Search)

- Colour every node white. Go through nodes in first-appearance order; for each white node, run a recursive Depth-First Search.
- Entering a node: colour it grey and push it on a path stack. Leaving: pop it and colour it black.
- Reaching a **grey** neighbour means a cycle. The cycle is the part of the path stack from that grey node to the top, followed by the grey node again. Example: path `a → b`, and `b` needs `a` → cycle `["a", "b", "a"]`.
- Stop at the first cycle found. If there is one, write the cycle file (section 4) and do nothing else.

## 3. One Depth-First Search per elective

For each elective, in declaration order, start a fresh search (a fresh visited set) from the elective:

- The elective itself is marked visited but is **not** listed in `visit` or `finish`.
- For each neighbour in list order, skip it if already visited; otherwise record the edge and recurse into it.
- **visit**: append a topic when you first enter it (pre-order).
- **finish**: append a topic when you leave it, after all its neighbours (post-order). This is the study order.
- **edges**: append `[from, to, strength]` each time you are about to recurse into an unvisited node (tree edges only), in the order you recurse.
- **layout** gives each topic `[depth, row]`:
  - depth = 1 for the elective's direct neighbours, parent's depth + 1 below that.
  - row: keep `maxRow` (start at −1). The **first** child explored from any node (including the elective) takes its parent's row (the elective's first child takes row 0). **Every later child** takes `maxRow + 1`. After assigning a row, `maxRow = max(maxRow, row)`.
- **rows** = `maxRow + 1` (0 when the elective has no edges).

## 4. Output format (exact)

Write `data/results.js` with these lines. Strings in double quotes; `", "` between items; `": "` after keys; one elective per line; a comma after every elective line except the last.

No cycle:

```
window.PREQVIZ_RESULTS = {
"format": 1,
"cycle": null,
"electives": {
"<id>": {"visit": [...], "finish": [...], "rows": N, "layout": {"<topic>": [depth, row], ...}, "edges": [["<from>", "<to>", "<strength>"], ...]},
"<id>": {...}
}
};
```

`layout` lists topics in **visit** order. An elective with no edges is written as:
`"<id>": {"visit": [], "finish": [], "rows": 0, "layout": {}, "edges": []}`

With a cycle:

```
window.PREQVIZ_RESULTS = {
"format": 1,
"cycle": ["a", "b", "a"],
"electives": {
}
};
```

The page shows the cycle as an error banner, which makes a good live demo of cycle detection.

## 5. Worked example

Input:

```
ELECTIVE deep_learning
EDGE deep_learning matmul essential
EDGE deep_learning gradient_descent essential
EDGE matmul vectors essential
EDGE gradient_descent partial_derivatives essential
EDGE partial_derivatives derivatives helpful
```

Expected output:

```
window.PREQVIZ_RESULTS = {
"format": 1,
"cycle": null,
"electives": {
"deep_learning": {"visit": ["matmul", "vectors", "gradient_descent", "partial_derivatives", "derivatives"], "finish": ["vectors", "matmul", "derivatives", "partial_derivatives", "gradient_descent"], "rows": 2, "layout": {"matmul": [1, 0], "vectors": [2, 0], "gradient_descent": [1, 1], "partial_derivatives": [2, 1], "derivatives": [3, 1]}, "edges": [["deep_learning", "matmul", "essential"], ["matmul", "vectors", "essential"], ["deep_learning", "gradient_descent", "essential"], ["gradient_descent", "partial_derivatives", "essential"], ["partial_derivatives", "derivatives", "helpful"]]}
}
};
```

Step by step: enter `matmul` (row 0, first child of the elective) → enter `vectors` (row 0, first child of `matmul`) → finish `vectors`, finish `matmul` → enter `gradient_descent` (later child of the elective, so row `maxRow + 1` = 1) → `partial_derivatives` (row 1) → `derivatives` (row 1) → finish them in reverse.

Test this small example first, then the cycle example (`x → a → b → a` gives `"cycle": ["a", "b", "a"]`), then the full `edges.txt`.

## 6. Complexity (for your report)

Loading is O(V × L) with a linear-scan id lookup (V nodes, L lines), negligible at this size. Cycle detection and each elective's Depth-First Search run in O(V + E). Memory is O(V + E) for the adjacency list.
