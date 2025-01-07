.text

#Immediate number create to check action of them 

Main:
		addi    x14 , x0 , 0	#i
		addi    x15 , x0 , 1	#Result
		addi    x27 , x0 , 2	#x
		addi    x24 , x0 , 11	#n
Loop:
		bge     x14 , x24 , Result 
		slli    x15 , x15 , 3 
		addi    x14 , x14 , 1 
		jal     x0 , Loop 
Result:
		addi    x15 , x15 , -1 
		addi    x25 , x0 , 2047 
		bne     x15 , x25 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
