.text

#Immediate number create to check action of them 

Main:
		addi    x25 , x0 , 0	#i
		addi    x12 , x0 , 1	#Result
		addi    x22 , x0 , 2	#x
		addi    x8 , x0 , 11	#n
Loop:
		bge     x25 , x8 , Result 
		slli    x12 , x12 , 3 
		addi    x25 , x25 , 1 
		jal     x0 , Loop 
Result:
		addi    x12 , x12 , -1 
		addi    x31 , x0 , 2047 
		bne     x12 , x31 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
