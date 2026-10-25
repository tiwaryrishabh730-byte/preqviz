/*
 * The algorithms. Everything here is one recursive Depth-First Search,
 * used in two ways:
 *   1. three-colour marking over the whole graph to detect cycles;
 *   2. one search per elective, recording visit order (the prerequisite list),
 *      finish order (the study order) and a layout for drawing.
 * Each runs in O(V + E) time.
 */
#include <string.h>
#include "graph.h"

/* ---------- 1. Cycle detection ---------- */

enum { WHITE = 0, GREY = 1, BLACK = 2 };   /* unvisited, in progress, done */

typedef struct {
    const Graph *g;
    char colour[MAX_NODES];
    int  path[MAX_NODES];   /* nodes currently in progress, root first */
    int  pathLen;
    int *cycle;
    int *cycleLen;
} CycleSearch;

static int cycle_dfs(CycleSearch *s, int u) {
    s->colour[u] = GREY;
    s->path[s->pathLen++] = u;

    for (Edge *e = s->g->nodes[u].head; e; e = e->next) {
        int v = e->to;
        if (s->colour[v] == GREY) {
            /* v is still in progress, so u reaches back to it: a cycle.
               The cycle is the path from v to u, then v again. */
            int start = 0;
            while (s->path[start] != v) start++;
            int n = 0;
            for (int i = start; i < s->pathLen; i++) s->cycle[n++] = s->path[i];
            s->cycle[n++] = v;
            *s->cycleLen = n;
            return 1;
        }
        if (s->colour[v] == WHITE && cycle_dfs(s, v)) return 1;
    }

    s->pathLen--;
    s->colour[u] = BLACK;
    return 0;
}

int graph_find_cycle(const Graph *g, int *cycle, int *cycleLen) {
    CycleSearch s;
    s.g = g;
    s.pathLen = 0;
    s.cycle = cycle;
    s.cycleLen = cycleLen;
    memset(s.colour, WHITE, sizeof s.colour);
    *cycleLen = 0;

    for (int u = 0; u < g->nodeCount; u++)          /* every node, file order */
        if (s.colour[u] == WHITE && cycle_dfs(&s, u)) return 1;
    return 0;
}

/* ---------- 2. Depth-First Search from one elective ---------- */

typedef struct {
    const Graph *g;
    char visited[MAX_NODES];
    int  maxRow;
    Traversal *t;
} Walk;

static void record_tree_edge(Walk *w, int from, int to, int essential) {
    Traversal *t = w->t;
    t->edgeFrom[t->edgeCountTree] = from;
    t->edgeTo[t->edgeCountTree] = to;
    t->edgeEssential[t->edgeCountTree] = essential;
    t->edgeCountTree++;
}

static void walk(Walk *w, int u, int depth, int row) {
    Traversal *t = w->t;
    w->visited[u] = 1;
    t->visit[t->visitCount++] = u;          /* entered: visit order */
    t->depth[u] = depth;
    t->row[u] = row;
    if (row > w->maxRow) w->maxRow = row;

    int first = 1;
    for (Edge *e = w->g->nodes[u].head; e; e = e->next) {
        if (w->visited[e->to]) continue;
        record_tree_edge(w, u, e->to, e->essential);
        /* first child stays on the parent's row; later children start new rows */
        walk(w, e->to, depth + 1, first ? row : w->maxRow + 1);
        first = 0;
    }

    t->finish[t->finishCount++] = u;        /* all prerequisites done: study order */
}

void graph_traverse(const Graph *g, int elective, Traversal *t) {
    Walk w;
    w.g = g;
    w.maxRow = -1;
    w.t = t;
    memset(w.visited, 0, sizeof w.visited);
    t->visitCount = t->finishCount = t->edgeCountTree = 0;

    /* The elective is the starting point: marked visited, but not listed itself. */
    w.visited[elective] = 1;
    int first = 1;
    for (Edge *e = g->nodes[elective].head; e; e = e->next) {
        if (w.visited[e->to]) continue;
        record_tree_edge(&w, elective, e->to, e->essential);
        walk(&w, e->to, 1, first ? 0 : w.maxRow + 1);
        first = 0;
    }
    t->rows = w.maxRow + 1;
}
