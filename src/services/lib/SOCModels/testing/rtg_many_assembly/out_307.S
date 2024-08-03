.text

#Immediate number create to check action of them 

Main:
		addi    x3 , x0 , 0	#i
		addi    x18 , x0 , 1	#Result
		addi    x16 , x0 , 2	#x
		addi    x2 , x0 , 11	#n
Loop:
		bge     x3 , x2 , Result 
		slli    x18 , x18 , 3 
		addi    x3 , x3 , 1 
		jal     x0 , Loop 
Result:
		addi    x18 , x18 , -1 
		addi    x22 , x0 , 2047 
		bne     x18 , x22 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
