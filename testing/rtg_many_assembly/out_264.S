.text

#Immediate number create to check action of them 

Main:
		addi    x19 , x0 , 0	#i
		addi    x31 , x0 , 1	#Result
		addi    x13 , x0 , 2	#x
		addi    x5 , x0 , 11	#n
Loop:
		bge     x19 , x5 , Result 
		slli    x31 , x31 , 3 
		addi    x19 , x19 , 1 
		jal     x0 , Loop 
Result:
		addi    x31 , x31 , -1 
		addi    x21 , x0 , 2047 
		bne     x31 , x21 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
