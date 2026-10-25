/*
 * Building the adjacency list and loading it from edges.txt.
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "graph.h"

void graph_init(Graph *g) {
    g->nodeCount = 0;
    g->edgeCount = 0;
    g->electiveCount = 0;
}

/* Linear search over the node array: O(V). Fine for a few hundred nodes. */
int graph_find(const Graph *g, const char *id) {
    for (int i = 0; i < g->nodeCount; i++)
        if (strcmp(g->nodes[i].id, id) == 0) return i;
    return -1;
}

/* Nodes are created the first time their id appears, so they keep file order. */
int graph_find_or_add(Graph *g, const char *id) {
    int i = graph_find(g, id);
    if (i >= 0) return i;
    if (g->nodeCount >= MAX_NODES) return -1;
    Node *n = &g->nodes[g->nodeCount];
    strncpy(n->id, id, MAX_ID - 1);
    n->id[MAX_ID - 1] = '\0';
    n->head = n->tail = NULL;
    return g->nodeCount++;
}

/* Append at the TAIL so a node's neighbours stay in the order of the file. */
int graph_add_edge(Graph *g, int from, int to, int essential) {
    Edge *e = malloc(sizeof *e);
    if (!e) return -1;
    e->to = to;
    e->essential = essential;
    e->next = NULL;
    Node *n = &g->nodes[from];
    if (n->tail) n->tail->next = e; else n->head = e;
    n->tail = e;
    g->edgeCount++;
    return 0;
}

static int is_elective(const Graph *g, int node) {
    for (int i = 0; i < g->electiveCount; i++)
        if (g->electives[i] == node) return 1;
    return 0;
}

/* Reads edges.txt. Returns 0 on success; prints the problem and returns 1 on error. */
int graph_load(Graph *g, const char *path) {
    FILE *f = fopen(path, "rb");   /* binary: we strip \r ourselves (Windows files) */
    if (!f) { fprintf(stderr, "Cannot open %s\n", path); return 1; }

    char line[512];
    int lineNo = 0;
    while (fgets(line, sizeof line, f)) {
        lineNo++;
        line[strcspn(line, "\r\n")] = '\0';

        char kind[16], a[MAX_ID + 1], b[MAX_ID + 1], strength[16];
        int fields = sscanf(line, "%15s %64s %64s %15s", kind, a, b, strength);
        if (fields <= 0 || kind[0] == '#') continue;           /* blank or comment */

        if ((fields >= 2 && strlen(a) >= MAX_ID) || (fields >= 3 && strlen(b) >= MAX_ID)) {
            fprintf(stderr, "Line %d: id longer than %d characters\n", lineNo, MAX_ID - 1);
            fclose(f); return 1;
        }

        if (strcmp(kind, "ELECTIVE") == 0 && fields == 2) {
            int e = graph_find_or_add(g, a);
            if (e < 0) { fprintf(stderr, "Line %d: too many nodes\n", lineNo); fclose(f); return 1; }
            if (!is_elective(g, e)) g->electives[g->electiveCount++] = e;
        } else if (strcmp(kind, "EDGE") == 0 && fields == 4) {
            int essential;
            if (strcmp(strength, "essential") == 0) essential = 1;
            else if (strcmp(strength, "helpful") == 0) essential = 0;
            else { fprintf(stderr, "Line %d: strength must be essential or helpful\n", lineNo); fclose(f); return 1; }
            int from = graph_find_or_add(g, a);
            int to = graph_find_or_add(g, b);
            if (from < 0 || to < 0) { fprintf(stderr, "Line %d: too many nodes\n", lineNo); fclose(f); return 1; }
            if (graph_add_edge(g, from, to, essential) != 0) { fprintf(stderr, "Out of memory\n"); fclose(f); return 1; }
        } else {
            fprintf(stderr, "Line %d: expected 'ELECTIVE <id>' or 'EDGE <from> <to> <essential|helpful>'\n", lineNo);
            fclose(f); return 1;
        }
    }
    fclose(f);
    return 0;
}

void graph_free(Graph *g) {
    for (int i = 0; i < g->nodeCount; i++) {
        Edge *e = g->nodes[i].head;
        while (e) { Edge *next = e->next; free(e); e = next; }
        g->nodes[i].head = g->nodes[i].tail = NULL;
    }
}
