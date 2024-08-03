.text

#Immediate number create to check action of them 

Main:
		addi    x7 , x0 , 0	#i
		addi    x1 , x0 , 1	#Result
		addi    x3 , x0 , 2	#x
		addi    x19 , x0 , 11	#n
Loop:
		bge     x7 , x19 , Result 
		slli    x1 , x1 , 3 
		addi    x7 , x7 , 1 
		jal     x0 , Loop 
Result:
		addi    x1 , x1 , -1 
		addi    x9 , x0 , 2047 
		bne     x1 , x9 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
