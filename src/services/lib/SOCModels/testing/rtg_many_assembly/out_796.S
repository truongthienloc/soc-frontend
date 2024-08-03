.text

#Immediate number create to check action of them 

Main:
		addi    x20 , x0 , 0	#i
		addi    x9 , x0 , 1	#Result
		addi    x30 , x0 , 2	#x
		addi    x5 , x0 , 11	#n
Loop:
		bge     x20 , x5 , Result 
		slli    x9 , x9 , 3 
		addi    x20 , x20 , 1 
		jal     x0 , Loop 
Result:
		addi    x9 , x9 , -1 
		addi    x13 , x0 , 2047 
		bne     x9 , x13 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
