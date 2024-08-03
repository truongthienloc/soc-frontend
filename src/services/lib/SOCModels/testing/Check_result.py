import sys

def compare(f1, f2) :
    global i
    print ('#################NO.'+str(i)+'#################')
    if len(f1) != len(f2) :
        print('=====>TWO FILES ARE NOT INDENTICAL<=====')
        print('LENGTH FILE1 AND FILE2 ARE NOI SAME!!!')
        sys.exit()
    for j in range (0, len(f1)) :
        if j == len(f1) - 1 :
            if f1[j][-1] == '\n' :
                f1[j] = f1[j][:-1]
            if f2[j][-1] == '\n' :
                f2[j] = f2[j][:-1]
        if f1[j] != f2[j] :
            print('=====>TWO FILES ARE NOT INDENTICAL<=====')
            print('ERROR IN :')
            print(f1[j])
            print(f2[j])
            i=10
            sys.exit()
    print('=====>TWO FILES ARE INDENTICAL<=====\n')

for i in range (0, 200) :
    if i == 124 or i == 139 or i ==152 or i== 154 or i==178 or i ==182 :
        continue
    f1 = open(r'C:\Users\LENOVO\Desktop\NCKH23\NCKH3rd\soc-frontend\src\services\lib\SOCModels\testing\output\out_'+ str(i) +'.txt', 'r').readlines()
    f2 = open(r'C:\Users\LENOVO\Desktop\NCKH23\NCKH3rd\soc-frontend\src\services\lib\SOCModels\testing\register_result\registers ('+ str(i) +').txt', 'r', encoding='utf-8-sig').readlines()
    compare(f1, f2)
#'C:\Users\LENOVO\Desktop\NCKH23\NCKH3rd\soc-frontend\src\services\lib\SOCModels\testing\output\out_'+str(i)+'.txt'
# C:\Users\LENOVO\Desktop\NCKH23\NCKH3rd\soc-frontend\src\services\lib\SOCModels\testing\register_result\registers ('+str(i)+').txt