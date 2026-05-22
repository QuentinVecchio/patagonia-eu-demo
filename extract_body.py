import sys
content = open(sys.argv[1]).read()
start = content.find('<body')
if start == -1:
    print(content)
else:
    end = content.rfind('</body>') + 7
    print(content[start:end])
