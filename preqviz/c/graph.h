/*
 * Preqviz 2.0 — the prerequisite graph.
 *
 * One data structure: a directed graph stored as an adjacency list.
 * Each node (an elective or a topic) keeps a linked list of the nodes it needs.
 * An edge "A -> B" means "A needs B".
 */
#ifndef PREQVIZ_GRAPH_H
#define PREQVIZ_GRAPH_H

#define MAX_NODES 500
#define MAX_ID    64

typedef struct Edge {
    int to;              /* index of the node this one needs           */
    int essential;       /* 1 = essential, 0 = helpful                 */
    struct Edge *next;   /* next edge in this node's adjacency list    */
} Edge;

typedef struct {
    char id[MAX_ID];     /* e.g. "matrix_multiplication"               */
    Edge *head;          /* first edge: what this node needs           */
    Edge *tail;          /* last edge, so new edges keep file order    */
} Node;

typedef struct {
    Node nodes[MAX_NODES];
    int  nodeCount;
    int  edgeCount;
    int  electives[MAX_NODES];   /* node indices, in declaration order  */
    int  electiveCount;
} Graph;

/* Building the graph */
void graph_init(Graph *g);
int  graph_find(const Graph *g, const char *id);         /* -1 if absent */
int  graph_find_or_add(Graph *g, const char *id);        /* -1 if full   */
int  graph_add_edge(Graph *g, int from, int to, int essential);
int  graph_load(Graph *g, const char *path);             /* 0 on success */
void graph_free(Graph *g);

/* Result of one Depth-First Search from an elective */
typedef struct {
    int visit[MAX_NODES];   int visitCount;    /* pre-order: when entered   */
    int finish[MAX_NODES];  int finishCount;   /* post-order: study order   */
    int depth[MAX_NODES];                      /* layout column, by node    */
    int row[MAX_NODES];                        /* layout row, by node       */
    int rows;
    int edgeFrom[MAX_NODES], edgeTo[MAX_NODES], edgeEssential[MAX_NODES];
    int edgeCountTree;                         /* tree edges, in DFS order  */
} Traversal;

/* Algorithms */
int  graph_find_cycle(const Graph *g, int *cycle, int *cycleLen);  /* 1 if found */
void graph_traverse(const Graph *g, int elective, Traversal *t);

#endif
