CC = gcc
CFLAGS = -std=c99 -Wall -Wextra -O2

preqviz: c/main.c c/graph.c c/traversal.c c/graph.h
	$(CC) $(CFLAGS) -o preqviz c/main.c c/graph.c c/traversal.c

results: preqviz
	./preqviz data/edges.txt data/results.js
	cmp data/results.js data/results.reference.js && echo "Output matches the reference."

clean:
	rm -f preqviz preqviz.exe
