.text

#Immediate number create to check action of them 

Main:
		addi    x5 , x0 , 0	#i
		addi    x22 , x0 , 1	#Result
		addi    x10 , x0 , 2	#x
		addi    x17 , x0 , 11	#n
Loop:
		bge     x5 , x17 , Result 
		slli    x22 , x22 , 3 
		addi    x5 , x5 , 1 
		jal     x0 , Loop 
Result:
		addi    x22 , x22 , -1 
		addi    x13 , x0 , 2047 
		bne     x22 , x13 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
