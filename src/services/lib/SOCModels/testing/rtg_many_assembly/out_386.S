.text

#Immediate number create to check action of them 

Main:
		addi    x9 , x0 , 0	#i
		addi    x29 , x0 , 1	#Result
		addi    x10 , x0 , 2	#x
		addi    x19 , x0 , 11	#n
Loop:
		bge     x9 , x19 , Result 
		slli    x29 , x29 , 3 
		addi    x9 , x9 , 1 
		jal     x0 , Loop 
Result:
		addi    x29 , x29 , -1 
		addi    x4 , x0 , 2047 
		bne     x29 , x4 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
