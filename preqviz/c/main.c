/*
 * Preqviz 2.0 — command-line program.
 *
 *   preqviz data/edges.txt data/results.js
 *       Build the graph, check for cycles, run Depth-First Search for every
 *       elective and write the results the web page draws.
 *
 *   preqviz --show <elective_id> data/edges.txt
 *       Print one elective's prerequisites and study order in the terminal.
 */
#include <stdio.h>
#include <string.h>
#include "graph.h"

static Graph graph;          /* static: too large for the stack */
static Traversal trav;

static void write_ids(FILE *f, const Graph *g, const int *nodes, int n) {
    fputc('[', f);
    for (int i = 0; i < n; i++)
        fprintf(f, "%s\"%s\"", i ? ", " : "", g->nodes[nodes[i]].id);
    fputc(']', f);
}

static int write_results(const Graph *g, const char *path, const int *cycle, int cycleLen) {
    FILE *f = fopen(path, "wb");   /* binary: "\n" line endings on every system */
    if (!f) { fprintf(stderr, "Cannot write %s\n", path); return 1; }

    fprintf(f, "window.PREQVIZ_RESULTS = {\n\"format\": 1,\n");
    if (cycleLen > 0) {
        fprintf(f, "\"cycle\": ");
        write_ids(f, g, cycle, cycleLen);
        fprintf(f, ",\n\"electives\": {\n}\n};\n");
        fclose(f);
        return 0;
    }

    fprintf(f, "\"cycle\": null,\n\"electives\": {\n");
    for (int k = 0; k < g->electiveCount; k++) {
        int e = g->electives[k];
        graph_traverse(g, e, &trav);

        fprintf(f, "\"%s\": {\"visit\": ", g->nodes[e].id);
        write_ids(f, g, trav.visit, trav.visitCount);
        fprintf(f, ", \"finish\": ");
        write_ids(f, g, trav.finish, trav.finishCount);
        fprintf(f, ", \"rows\": %d, \"layout\": {", trav.rows);
        for (int i = 0; i < trav.visitCount; i++) {
            int v = trav.visit[i];
            fprintf(f, "%s\"%s\": [%d, %d]", i ? ", " : "", g->nodes[v].id, trav.depth[v], trav.row[v]);
        }
        fprintf(f, "}, \"edges\": [");
        for (int i = 0; i < trav.edgeCountTree; i++)
            fprintf(f, "%s[\"%s\", \"%s\", \"%s\"]", i ? ", " : "",
                    g->nodes[trav.edgeFrom[i]].id, g->nodes[trav.edgeTo[i]].id,
                    trav.edgeEssential[i] ? "essential" : "helpful");
        fprintf(f, "]}%s\n", k < g->electiveCount - 1 ? "," : "");
    }
    if (g->electiveCount == 0) fputc('\n', f);
    fprintf(f, "}\n};\n");
    fclose(f);
    return 0;
}

static void print_cycle(const Graph *g, const int *cycle, int cycleLen) {
    fprintf(stderr, "Cycle found: ");
    for (int i = 0; i < cycleLen; i++)
        fprintf(stderr, "%s%s", i ? " -> " : "", g->nodes[cycle[i]].id);
    fprintf(stderr, "\nA topic cannot depend on itself. Fix edges.txt and run again.\n");
}

static int show(const Graph *g, const char *id) {
    int e = graph_find(g, id);
    if (e < 0) { fprintf(stderr, "No elective called %s\n", id); return 1; }
    graph_traverse(g, e, &trav);

    printf("\n%s: %d prerequisite topics\n\n", id, trav.visitCount);
    printf("Depth-First Search visit order (what the replay shows):\n");
    for (int i = 0; i < trav.visitCount; i++) {
        int v = trav.visit[i];
        printf("  %2d. %*s%s\n", i + 1, (trav.depth[v] - 1) * 2, "", g->nodes[v].id);
    }
    printf("\nStudy order (Depth-First Search finish order):\n");
    for (int i = 0; i < trav.finishCount; i++)
        printf("  %2d. %s\n", i + 1, g->nodes[trav.finish[i]].id);
    printf("\n");
    return 0;
}

int main(int argc, char **argv) {
    int showMode = argc == 4 && strcmp(argv[1], "--show") == 0;
    if (!showMode && argc != 3) {
        fprintf(stderr, "Usage:\n  %s <edges.txt> <results.js>\n  %s --show <elective_id> <edges.txt>\n", argv[0], argv[0]);
        return 2;
    }

    graph_init(&graph);
    if (graph_load(&graph, showMode ? argv[3] : argv[1]) != 0) return 1;
    printf("Graph built: %d nodes, %d edges, %d electives (adjacency list)\n",
           graph.nodeCount, graph.edgeCount, graph.electiveCount);

    int cycle[MAX_NODES + 1], cycleLen = 0;
    int hasCycle = graph_find_cycle(&graph, cycle, &cycleLen);
    fflush(stdout);
    if (hasCycle) print_cycle(&graph, cycle, cycleLen);
    else printf("Cycle check: none found (three-colour Depth-First Search)\n");

    int status;
    if (showMode) {
        status = hasCycle ? 1 : show(&graph, argv[2]);
    } else {
        status = write_results(&graph, argv[2], cycle, cycleLen);
        if (status == 0)
            printf("%s written for %d electives\n", argv[2], hasCycle ? 0 : graph.electiveCount);
        if (hasCycle) status = 1;
    }

    graph_free(&graph);
    return status;
}
