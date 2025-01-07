.text

#Immediate number create to check action of them 

Main:
		addi    x28 , x0 , 0	#i
		addi    x9 , x0 , 1	#Result
		addi    x5 , x0 , 2	#x
		addi    x6 , x0 , 11	#n
Loop:
		bge     x28 , x6 , Result 
		slli    x9 , x9 , 3 
		addi    x28 , x28 , 1 
		jal     x0 , Loop 
Result:
		addi    x9 , x9 , -1 
		addi    x20 , x0 , 2047 
		bne     x9 , x20 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
