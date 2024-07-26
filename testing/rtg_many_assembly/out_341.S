.text

#Immediate number create to check action of them 

Main:
		addi    x6 , x0 , 0	#i
		addi    x5 , x0 , 1	#Result
		addi    x10 , x0 , 2	#x
		addi    x23 , x0 , 11	#n
Loop:
		bge     x6 , x23 , Result 
		slli    x5 , x5 , 3 
		addi    x6 , x6 , 1 
		jal     x0 , Loop 
Result:
		addi    x5 , x5 , -1 
		addi    x18 , x0 , 2047 
		bne     x5 , x18 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
