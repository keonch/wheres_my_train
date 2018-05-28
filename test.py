def all_interleavings(a, b):
    if len(a) == 0:
        return [b]
    elif len(b) == 0:
        return [a]
    else:
        rest_a, rest_b = all_interleavings(a[1:],b), all_interleavings(a,b[1:])
        return [ [a[0]] + subleaving for subleaving in rest_a] + [ [b[0]] + subleaving for subleaving in rest_b]

def list_interleavings(lst):
    los = all_interleavings(lst[0],[])
    for string in lst[1:]:
        new_interleavings = []
        for s in los:
            new_interleavings += all_interleavings(string,s)
        los = new_interleavings
    return los
