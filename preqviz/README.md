# Preqviz 2.0

See what every elective expects before you pick it. Preqviz maps each Semester 4 elective for Bachelor of Technology, Artificial Intelligence students to the topics it builds on, shows them as a graph, gives a study order, and checks readiness against the subjects a student has completed.

Data structure: **one directed graph** (adjacency list), with **Depth-First Search** for the prerequisite list, the study order and cycle detection — all in C.

## Run it

Double-click `index.html`. It works offline (fonts load when you are online).

## How it fits together

```
data/edges.txt   ──►  C program (graph + Depth-First Search)  ──►  data/results.js  ──►  index.html draws it
data/content.js  ───────────────────────────────────────────────────────────────►  names and explanations
```

| File | Written by | What it holds |
| --- | --- | --- |
| `data/edges.txt` | You | Every elective and prerequisite link. The only input the C program reads. |
| `data/results.js` | The C program | Visit order, study order, layout and cycle check for every elective. |
| `data/results.reference.js` | Provided | The correct output for the current `edges.txt`. Your C program must match it exactly. |
| `data/content.js` | You | Names, subjects, explanations shown on the page. |
| `index.html` | — | The web app. Contains **no graph logic**; it only reads `results.js`. |
| `docs/C-OUTPUT-SPEC.md` | — | Exact rules the C program must follow, with a worked example. |


## The C program (the data structure)

Source: `c/graph.h`, `c/graph.c` (adjacency list and loader), `c/traversal.c` (cycle detection and Depth-First Search), `c/main.c` (command line and output). About 400 lines.

`data/results.js` in this folder was produced by this C program and matches `data/results.reference.js` byte for byte.

**Windows** (needs gcc, for example from MSYS2: install it, open "MSYS2 UCRT64" and run `pacman -S mingw-w64-ucrt-x86_64-gcc`, then add `C:\msys64\ucrt64\bin` to your PATH):

```
build.bat
```

**macOS or Linux:**

```
make results
```

Useful commands:

| Command | What it shows |
| --- | --- |
| `preqviz data/edges.txt data/results.js` | Builds the graph, checks for cycles, writes the results the page draws |
| `preqviz --show information_theory data/edges.txt` | One elective's Depth-First Search visit order and study order, in the terminal |
| `preqviz data/edges-with-cycle.txt data/results.js` | Cycle detection demo: reports the cycle, and the page shows a warning banner. Run the first command again to restore. |

After changing `edges.txt`, run the program again and commit the new `results.js` (and copy it over `results.reference.js` once you have checked it).

## Deploy on Vercel

1. Push this folder to a GitHub repository (public or private).
2. On vercel.com, sign in with GitHub → **Add New → Project** → import the repository.
3. Framework preset: **Other**. Leave the build command empty. Deploy.

Every push redeploys automatically. Run the C program on your own machine and commit `results.js`; do not compile C on Vercel.

## Data status

- Program electives: topic-level maps drafted from the official syllabi. **Check these before launch.**
- Open electives: subject-level estimates from the catalogue; syllabi are released after selection, so they are marked "Partial".
- Robotic Process Automation and Data Analytics are left out: Artificial Intelligence students are not eligible.
