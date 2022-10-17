#!/usr/bin/env python
# -*- coding:utf-8 -*-



# def longest_common_substring(s1, s2):
#    m = [[0] * (1 + len(s2)) for i in range(1 + len(s1))]
#    longest, x_longest = 0, 0
#    for x in range(1, 1 + len(s1)):
#        for y in range(1, 1 + len(s2)):
#            if s1[x - 1] == s2[y - 1]:
#                m[x][y] = m[x - 1][y - 1] + 1
#                if m[x][y] > longest:
#                    longest = m[x][y]
#                    x_longest = x
#            else:
#                m[x][y] = 0
#    return s1[x_longest - longest: x_longest]
#
#
# def edit_distance(s1, s2):
#     return 2. * len(longest_common_substring(s1, s2)) / (len(s1) + len(s2)) * 100
def lcs(s1, s2):
    prev = [0] * len(s1)
    for i, r in enumerate(s1):
        global current
        current = []
        for j, c in enumerate(s2):
            if r == c:
                e = prev[j - 1] + 1 if i * j > 0 else 1
            else:
                e = max(prev[j] if i > 0 else 0, current[-1] if j > 0 else 0)
            current.append(e)
        prev = current

    return current[-1]


def similarity(s1, s2):
    a = float(len(s1))
    b = float(len(s2))
    c = float(lcs(s1, s2))

    return 2. * c / (a + b) * 100

