.text

#Immediate number create to check action of them 

Main:
		addi    x16 , x0 , 0	#i
		addi    x1 , x0 , 1	#Result
		addi    x18 , x0 , 2	#x
		addi    x30 , x0 , 11	#n
Loop:
		bge     x16 , x30 , Result 
		slli    x1 , x1 , 3 
		addi    x16 , x16 , 1 
		jal     x0 , Loop 
Result:
		addi    x1 , x1 , -1 
		addi    x15 , x0 , 2047 
		bne     x1 , x15 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
