import os
 
def main():
    files = os.popen("git status | grep modified:").readlines()
    for item in files:
        file = item.split("modified:",1)[1].strip().replace(" ","").replace("\n","").replace("\r","").replace("\t","")
        print(file)
        os.system("git add "+file)
        print("git add "+file)
    os.system("git status")
 
if __name__ == '__main__':
    main()
