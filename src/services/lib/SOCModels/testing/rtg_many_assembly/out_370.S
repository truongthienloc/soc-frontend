.text

#Immediate number create to check action of them 

Main:
		addi    x31 , x0 , 0	#i
		addi    x7 , x0 , 1	#Result
		addi    x17 , x0 , 2	#x
		addi    x25 , x0 , 11	#n
Loop:
		bge     x31 , x25 , Result 
		slli    x7 , x7 , 3 
		addi    x31 , x31 , 1 
		jal     x0 , Loop 
Result:
		addi    x7 , x7 , -1 
		addi    x28 , x0 , 2047 
		bne     x7 , x28 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
